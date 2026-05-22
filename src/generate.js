import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function generateProject(config) {
  console.log(chalk.cyan('\n⚙️ Starting the File Generation Engine...'));

  // 1. Use the EXACT name the user typed!
  const projectName = config.projectName;
  const projectPath = path.join(process.cwd(), projectName);

  // Safety Check: Make sure the folder doesn't already exist
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`\n🚨 Error: A folder named "${projectName}" already exists in this directory.`));
    console.log(chalk.yellow('Please delete it or run the command again with a different name.'));
    process.exit(1);
  }

  // 2. Create the physical folder on your machine
  fs.mkdirSync(projectPath, { recursive: true });
  console.log(chalk.green(`✔ Created project directory: ./${projectName}`));

  // 3. Save the config blueprint inside
  const configFilePath = path.join(projectPath, 'opusify.config.json');
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  
  console.log(chalk.green(`✔ Saved configuration blueprint to the new folder.`));
  console.log(chalk.magenta('\nNext phase: Ready to fetch templates from GitHub!'));
}