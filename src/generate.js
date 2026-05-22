import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function generateProject(config) {
  console.log(chalk.cyan('\n⚙️ Starting the File Generation Engine...'));

  let projectName = config.projectName;
  let projectPath = path.join(process.cwd(), projectName);

  // SAFETY FIX: If the folder exists, append a random number until it is unique
  while (fs.existsSync(projectPath)) {
    console.log(chalk.yellow(`⚠️ Folder "${projectName}" already exists. Generating a unique name...`));
    const randomSuffix = Math.floor(Math.random() * 10000);
    projectName = `${config.projectName}-${randomSuffix}`;
    projectPath = path.join(process.cwd(), projectName);
  }

  // Update the config object so the rest of the engine uses the new unique name!
  config.projectName = projectName;

  // 2. Create the physical folder on your machine
  fs.mkdirSync(projectPath, { recursive: true });
  console.log(chalk.green(`✔ Created project directory: ./${projectName}`));

  // 3. Save the config blueprint inside
  const configFilePath = path.join(projectPath, 'opusify.config.json');
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  
  console.log(chalk.green(`✔ Saved configuration blueprint to the new folder.`));
  console.log(chalk.magenta('\nNext phase: Ready to fetch templates from GitHub!'));
}