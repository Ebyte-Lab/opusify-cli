import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import tiged from 'tiged';
import Handlebars from 'handlebars';

// Helper function to recursively find all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

export async function generateProject(config) {
  console.log(chalk.cyan('\n⚙️ Starting the File Generation Engine...'));

  let projectName = config.projectName;
  let projectPath = path.join(process.cwd(), projectName);

  // 1. Resolve naming collisions
  while (fs.existsSync(projectPath)) {
    const randomSuffix = Math.floor(Math.random() * 10000);
    projectName = `${config.projectName}-${randomSuffix}`;
    projectPath = path.join(process.cwd(), projectName);
  }
  config.projectName = projectName; // Update config with final name

  // 2. Check for Local vs GitHub
  const localTemplatePath = path.join(process.cwd(), 'templates', config.template, config.architecture);
  
  try {
    if (fs.existsSync(localTemplatePath)) {
      // 🟢 DEVELOPMENT MODE: Local folder found
      console.log(chalk.blue(`📥 DEV MODE: Using local template from ${localTemplatePath}`));
      fs.cpSync(localTemplatePath, projectPath, { recursive: true });
    } else {
      // 🔵 PRODUCTION MODE: Fetch from GitHub
      const repoURI = `Ebyte-Lab/opusify-templates/${config.template}/${config.architecture}`;
      console.log(chalk.blue(`📥 PROD MODE: Fetching from GitHub (${repoURI})...`));
      
      const emitter = tiged(repoURI, { disableCache: true, force: true });
      await emitter.clone(projectPath);
    }
    console.log(chalk.green(`✔ Files copied to ./${projectName}`));

    // 3. TRANSFORM PHASE: Process Handlebars Tags
    console.log(chalk.cyan('🪄 Compiling template tags...'));
    const allFiles = getAllFiles(projectPath);

    for (const file of allFiles) {
      // Only process text/code files (skip images, etc.)
      if (file.match(/\.(tsx|ts|json|md|html|css)$/)) {
        let content = fs.readFileSync(file, 'utf-8');
        
        // If the file contains a Handlebars tag like {{projectName}}
        if (content.includes('{{')) {
          const template = Handlebars.compile(content);
          const result = template(config); // Inject our config object!
          fs.writeFileSync(file, result);
        }
      }
    }
    console.log(chalk.green('✔ Template customization complete!'));

    // 4. Save the config blueprint
    const configFilePath = path.join(projectPath, 'opusify.config.json');
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
    
    console.log(chalk.magenta(`\n🎉 Project ${projectName} is ready!`));

  } catch (error) {
    console.log(chalk.red(`\n🚨 Generation failed.`));
    console.log(chalk.gray(error.message));
    if (fs.existsSync(projectPath)) fs.rmSync(projectPath, { recursive: true, force: true });
  }
}