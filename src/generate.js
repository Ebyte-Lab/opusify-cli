import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import tiged from 'tiged';
import Handlebars from 'handlebars';
import { execSync } from 'child_process';
import { resolveDependencies } from './dependencies.js';
import { generateNavigation } from './navigation.js';

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
  const verbose = config.verbose || false;
  const totalStart = Date.now();

  console.log(chalk.cyan('\n⚙️  Starting the File Generation Engine...'));
  if (verbose) {
    console.log(chalk.gray(`    [config] Template: ${config.template}/${config.architecture}`));
    console.log(chalk.gray(`    [config] Design: ${config.design}`));
    console.log(chalk.gray(`    [config] Variant: ${config.variant}`));
    console.log(chalk.gray(`    [config] Nav: ${config.navCount}, Sidebar: ${config.includeSidebar}`));
  }

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
        spinner: 'dots',
        color: 'blue'
      }).start();
      const copyStart = Date.now();
      fs.cpSync(localTemplatePath, projectPath, { recursive: true });
      spinner.succeed(`Files copied to ./${projectName}`);
      if (verbose) {
        console.log(chalk.gray(`    [copy] Source: ${localTemplatePath}`));
        console.log(chalk.gray(`    [copy] Duration: ${Date.now() - copyStart}ms`));
      }
    } else {
      // 🔵 PRODUCTION MODE: Fetch from GitHub
      const targetRepo = config.repo || 'Ebyte-Lab/opusify-templates';
      const repoURI = `${targetRepo}/${config.template}/${config.architecture}`;
      
      const spinner = ora({
        text: `Fetching template from GitHub (${repoURI})...`,
        spinner: 'dots',
        color: 'blue'
      }).start();

      try {
        const emitter = tiged(repoURI, { disableCache: true, force: true });
        await emitter.clone(projectPath);
        spinner.succeed(`Files copied to ./${projectName}`);
      } catch (fetchError) {
        spinner.fail(`Failed to fetch template from GitHub: ${repoURI}`);
        
        // SPECIFIC NETWORK & GITHUB ERROR HANDLING
        const errStr = fetchError.toString().toLowerCase();
        if (errStr.includes('could not resolve') || errStr.includes('econnrefused') || errStr.includes('offline') || errStr.includes('network')) {
          console.log(chalk.red('  ✖ Error: Could not reach GitHub. Check your internet connection.'));
          console.log(chalk.gray('  Suggested fix: Ensure you are connected to the internet and try again.'));
        } else if (errStr.includes('could not find commit hash') || errStr.includes('404')) {
          console.log(chalk.red('  ✖ Error: The specified template or repository does not exist.'));
          if (!config.token) {
            console.log(chalk.yellow('  ⚠️  Hint: If this repository is private, you must provide a GitHub token using --token or set the OPUSIFY_GITHUB_TOKEN environment variable.'));
          }
        } else {
          console.log(chalk.red(`  ✖ Error details: ${fetchError.message}`));
        }
        throw new Error('FETCH_FAILED');
      }
    }

    // 3. TRANSFORM PHASE: Process Handlebars Tags
    const compileSpinner = ora({
      text: 'Compiling template tags...',
      spinner: 'dots',
      color: 'cyan'
    }).start();
    const compileStart = Date.now();
    const allFiles = getAllFiles(projectPath);
    let compiledCount = 0;

    for (const file of allFiles) {
      if (file.match(/\.(tsx|ts|json|md|html|css|mjs)$/)) {
        let content = fs.readFileSync(file, 'utf-8');
        if (content.includes('{{')) {
          const template = Handlebars.compile(content);
          const result = template(config);
          fs.writeFileSync(file, result);
          compiledCount++;
          if (verbose) {
            const relPath = path.relative(projectPath, file);
            console.log(chalk.gray(`    [compile] Processed — ${relPath}`));
          }
        }
      }
    }
    compileSpinner.succeed('Template customization complete!');
    if (verbose) {
      console.log(chalk.gray(`    [compile] ${compiledCount} files compiled, ${allFiles.length} total scanned (${Date.now() - compileStart}ms)`));
    }

    // 4. Save the config blueprint
    const configFilePath = path.join(projectPath, 'opusify.config.json');
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    // 5. Generate dynamic navigation based on navCount
    generateNavigation(projectPath, config);

    // 6. Resolve dynamic dependencies based on user choices
    resolveDependencies(projectPath, config);

    // 6. AUTOMATION PHASE: Install Dependencies
    if (config.noInstall) {
      console.log(chalk.gray('\n⏭️  Skipping npm install (--no-install).'));
    } else {
      
      // CHECK FOR EXISTING NODE_MODULES
      const nodeModulesPath = path.join(projectPath, 'node_modules');
      if (fs.existsSync(nodeModulesPath)) {
        console.log(chalk.yellow('\n⚠️  WARNING: A node_modules directory already exists in the target directory.'));
        console.log(chalk.gray('    This can happen if you are testing locally and left it inside your template folder.'));
        console.log(chalk.gray('    Suggested fix: Delete node_modules from your template source to avoid copy bloat.'));
      }

      const installSpinner = ora({
        text: 'Installing dependencies (this might take a minute)...',
        spinner: 'dots',
        color: 'yellow'
      }).start();
      try {
        const installStart = Date.now();
        execSync('npm install', { cwd: projectPath, stdio: 'pipe' });
        installSpinner.succeed('Dependencies installed successfully!');
        if (verbose) {
          console.log(chalk.gray(`    [install] Duration: ${((Date.now() - installStart) / 1000).toFixed(1)}s`));
        }
      } catch (installError) {
        installSpinner.fail('Could not install dependencies.');
        console.log(chalk.red(`  ✖ NPM Error: ${installError.message}`));
        console.log(chalk.gray('  Suggested fix: Run "npm install" manually inside the project folder to see detailed errors.'));
      }
    }

    // 7. Git Initialization
    if (config.initGit) {
      const gitSpinner = ora({
        text: 'Initializing Git repository...',
        spinner: 'dots',
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
        gitSpinner.fail('Could not initialize Git.');
        console.log(chalk.gray('  Suggested fix: Ensure git is installed on your system or run "git init" manually.'));
      }
    } else {
      console.log(chalk.gray('\n⏭️  Skipping Git initialization.'));
    }

    // 8. Final Success Message
    console.log(chalk.magenta(`\n🎉 Project ${projectName} is ready!`));
    if (verbose) {
      console.log(chalk.gray(`    [total] Generation completed in ${((Date.now() - totalStart) / 1000).toFixed(1)}s`));
    }
    console.log(chalk.white('\nNext steps:'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  npm run dev\n'));
  } catch (error) {
    console.log(chalk.red('\n🚨 Generation failed.'));
    
    // Detailed System Error Classification
    if (error.code === 'ENOSPC') {
      console.log(chalk.red('  ✖ Error: Not enough disk space.'));
      console.log(chalk.gray('  Suggested fix: Free up some space on your hard drive and try again.'));
    } else if (error.code === 'EACCES' || error.code === 'EPERM') {
      console.log(chalk.red('  ✖ Error: Permission denied.'));
      console.log(chalk.gray('  Suggested fix: Check your folder permissions or run your terminal as an administrator/sudo.'));
    } else if (error.message !== 'FETCH_FAILED') {
      // Print generic errors if it's not one we already handled above
      console.log(chalk.gray(`  Details: ${error.message}`));
    }

    // AUTOMATED CLEANUP
    if (fs.existsSync(projectPath)) {
      console.log(chalk.yellow(`\n🧹 Cleaning up partial project directory: ./${projectName}...`));
      try {
        fs.rmSync(projectPath, { recursive: true, force: true });
        console.log(chalk.green('  ✔ Cleanup complete.'));
      } catch (cleanupError) {
        console.log(chalk.red(`  ✖ Failed to clean up directory. You may need to delete ./${projectName} manually.`));
      }
    }
  }
}