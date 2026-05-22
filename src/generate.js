import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function generateProject(config) {
  console.log(chalk.cyan('\n⚙️ Starting the File Generation Engine...'));

  let projectName = config.projectName;
  let projectPath = path.join(process.cwd(), projectName);

  // Fallback for duplicate names
  while (fs.existsSync(projectPath)) {
    const randomSuffix = Math.floor(Math.random() * 10000);
    projectName = `${config.projectName}-${randomSuffix}`;
    projectPath = path.join(process.cwd(), projectName);
  }
  config.projectName = projectName;

  // 1. Create the target project directory
  fs.mkdirSync(projectPath, { recursive: true });
  console.log(chalk.green(`✔ Created project directory: ./${projectName}`));

  // 2. Locate the Local Template Repository path
  // This matches exactly how we structured our folders!
  const localTemplatePath = path.join(process.cwd(), 'templates', config.template, config.architecture);

  // 3. Copy the files if that template exists locally
  if (fs.existsSync(localTemplatePath)) {
    console.log(chalk.blue(`📥 Fetching files from local repository: ${localTemplatePath}`));
    
    // recursive: true ensures it copies all sub-folders and files inside the template
    fs.cpSync(localTemplatePath, projectPath, { recursive: true });
    
    console.log(chalk.green('✔ Template files copied successfully!'));
  } else {
    console.log(chalk.yellow(`⚠️ Local template not found at ${localTemplatePath}. Skipping file copy.`));
  }

  // 4. Save the config blueprint inside
  const configFilePath = path.join(projectPath, 'opusify.config.json');
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  
  console.log(chalk.magenta('\nGeneration phase complete!'));
}