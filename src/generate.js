import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import tiged from 'tiged';
import Handlebars from 'handlebars';
import { execSync } from 'child_process';

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
      if (file.match(/\.(tsx|ts|json|md|html|css)$/)) {
        let content = fs.readFileSync(file, 'utf-8');
        if (content.includes('{{')) {
          const template = Handlebars.compile(content);
          const result = template(config);
          fs.writeFileSync(file, result);
        }
      }
    }
    console.log(chalk.green('✔ Template customization complete!'));

    // 4. Save the config blueprint
    const configFilePath = path.join(projectPath, 'opusify.config.json');
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    // 5. AUTOMATION PHASE: Install Dependencies and Git
    console.log(chalk.cyan('\n📦 Installing dependencies (this might take a minute)...'));
    try {
      execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
      console.log(chalk.green('✔ Dependencies installed successfully!'));

      // Check if the user selected 'Yes' for Git Initialization
      if (config.initGit) {
        console.log(chalk.cyan('\n🐙 Initializing Git repository...'));
        execSync('git init', { cwd: projectPath, stdio: 'ignore' });
        execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
        execSync('git commit -m "feat: initial commit from Opusify CLI 🚀"', { cwd: projectPath, stdio: 'ignore' });
        console.log(chalk.green('✔ Git initialized!'));
      } else {
        console.log(chalk.gray('\n⏭️ Skipping Git initialization.'));
      }

    } catch (automationError) {
      console.log(chalk.yellow('\n⚠️ Note: Could not complete npm install or git setup automatically. You may need to do it manually.'));
    }
    
    // 6. Final Success Message
    console.log(chalk.magenta(`\n🎉 Project ${projectName} is ready!`));
    console.log(chalk.white(`\nNext steps:`));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  npm run dev\n`));

  } catch (error) {
    console.log(chalk.red(`\n🚨 Generation failed.`));
    console.log(chalk.gray(error.message));
    if (fs.existsSync(projectPath)) fs.rmSync(projectPath, { recursive: true, force: true });
  }
}