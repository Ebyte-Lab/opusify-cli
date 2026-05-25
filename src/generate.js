import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import tiged from 'tiged';
import Handlebars from 'handlebars';
import { execSync } from 'child_process';
import { resolveDependencies } from './dependencies.js';

// Setup __dirname for ES Modules to fix the local template path bug
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register custom Handlebars helpers
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

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
  console.log(chalk.cyan('\n⚙️  Starting the File Generation Engine...'));

  // Inject token into environment for tiged to access private repos
  if (config.token) {
    process.env.GITHUB_TOKEN = config.token;
  }

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
  // FIX: Look in the CLI's installation directory, not the user's cwd
  const localTemplatePath = path.join(
    __dirname,
    '..', // Go up one level from 'src' to reach the root where 'templates' is
    'templates',
    config.template,
    config.architecture,
  );

  try {
    if (fs.existsSync(localTemplatePath)) {
      // 🟢 DEVELOPMENT MODE: Local folder found
      const spinner = ora({
        text: 'DEV MODE: Copying local template...',
        spinner: 'squareCorners',
        color: 'blue'
      }).start();
      fs.cpSync(localTemplatePath, projectPath, { recursive: true });
      spinner.succeed(`Files copied to ./${projectName}`);
    } else {
      // 🔵 PRODUCTION MODE: Fetch from GitHub
      const targetRepo = config.repo || 'Ebyte-Lab/opusify-templates';
      const repoURI = `${targetRepo}/${config.template}/${config.architecture}`;
      
      const spinner = ora({
        text: `Fetching template from GitHub (${repoURI})...`,
        spinner: 'squareCorners',
        color: 'blue'
      }).start();

      try {
        const emitter = tiged(repoURI, { disableCache: true, force: true });
        await emitter.clone(projectPath);
        spinner.succeed(`Files copied to ./${projectName}`);
      } catch (fetchError) {
        spinner.fail(`Failed to fetch template from GitHub: ${repoURI}`);
        if (!config.token) {
          console.log(chalk.yellow('\n⚠️  Hint: If this repository is private, you must provide a GitHub token using --token or set the OPUSIFY_GITHUB_TOKEN environment variable.'));
        }
        throw fetchError;
      }
    }

    // 3. TRANSFORM PHASE: Process Handlebars Tags
    const compileSpinner = ora({
      text: 'Compiling template tags...',
      spinner: 'squareCorners',
      color: 'cyan'
    }).start();
    const allFiles = getAllFiles(projectPath);

    for (const file of allFiles) {
      if (file.match(/\.(tsx|ts|json|md|html|css|mjs)$/)) {
        let content = fs.readFileSync(file, 'utf-8');
        if (content.includes('{{')) {
          const template = Handlebars.compile(content);
          const result = template(config);
          fs.writeFileSync(file, result);
        }
      }
    }
    compileSpinner.succeed('Template customization complete!');

    // 4. Save the config blueprint
    const configFilePath = path.join(projectPath, 'opusify.config.json');
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    // 5. Resolve dynamic dependencies based on user choices
    resolveDependencies(projectPath, config);

    // 6. AUTOMATION PHASE: Install Dependencies
    if (config.noInstall) {
      console.log(chalk.gray('\n⏭️  Skipping npm install (--no-install).'));
    } else {
      const installSpinner = ora({
        text: 'Installing dependencies (this might take a minute)...',
        spinner: 'squareCorners',
        color: 'yellow'
      }).start();
      try {
        execSync('npm install', { cwd: projectPath, stdio: 'pipe' });
        installSpinner.succeed('Dependencies installed successfully!');
      } catch (installError) {
        installSpinner.fail('Could not install dependencies. You may need to run npm install manually.');
      }
    }

    // 7. Git Initialization
    if (config.initGit) {
      const gitSpinner = ora({
        text: 'Initializing Git repository...',
        spinner: 'squareCorners',
        color: 'magenta'
      }).start();
      try {
        execSync('git init', { cwd: projectPath, stdio: 'ignore' });
        execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
        execSync('git commit -m "feat: initial commit from Opusify CLI 🚀"', {
          cwd: projectPath,
          stdio: 'ignore',
        });
        gitSpinner.succeed('Git initialized!');
      } catch (gitError) {
        gitSpinner.fail('Could not initialize Git. You may need to do it manually.');
      }
    } else {
      console.log(chalk.gray('\n⏭️  Skipping Git initialization.'));
    }

    // 8. Final Success Message
    console.log(chalk.magenta(`\n🎉 Project ${projectName} is ready!`));
    console.log(chalk.white('\nNext steps:'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  npm run dev\n'));
  } catch (error) {
    console.log(chalk.red('\n🚨 Generation failed.'));
    console.log(chalk.gray(error.message));
    if (fs.existsSync(projectPath)) fs.rmSync(projectPath, { recursive: true, force: true });
  }
}