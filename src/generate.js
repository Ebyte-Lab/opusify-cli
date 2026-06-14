import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto'; 
import chalk from 'chalk';
import ora from 'ora';
import { downloadTemplate } from 'giget'; 
import Handlebars from 'handlebars';
import { execSync } from 'child_process';
import { resolveDependencies } from './dependencies.js';
import { generateNavigation } from './navigation.js';
import { applySecurity } from './security.js';

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

// Utility function to generate a SHA-256 hash from file contents
function getFileHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
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

  // Inject token into environment for private repos
  if (config.token) {
    process.env.GITHUB_TOKEN = config.token;
  }

  let projectName = config.projectName;
  let projectPath = path.join(process.cwd(), projectName);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  // 2. Check for Local vs GitHub
  const localTemplatePath = path.join(
    __dirname,
    '..', 
    'templates',
    config.template,
    config.architecture,
  );

  // Create a temporary staging directory
  const stagingPath = path.join(process.cwd(), `.opusify-staging-${Date.now()}`);

  try {
    if (fs.existsSync(localTemplatePath)) {
      // 🟢 DEVELOPMENT MODE: Local folder found
      const spinner = ora({
        text: 'DEV MODE: Copying local template to staging...',
        spinner: 'dots',
        color: 'blue'
      }).start();
      const copyStart = Date.now();
      
      fs.cpSync(localTemplatePath, stagingPath, { recursive: true }); 
      
      spinner.succeed(`Template resolved for ./${projectName}`);
      if (verbose) {
        console.log(chalk.gray(`    [copy] Source: ${localTemplatePath}`));
        console.log(chalk.gray(`    [copy] Duration: ${Date.now() - copyStart}ms`));
      }
    } else {
      // 🔵 PRODUCTION MODE: Fetch from GitHub using GIGET
      const targetRepo = config.repo || 'Ebyte-Lab/opusify-templates';
      const repoInput = `github:${targetRepo}/${config.template}/${config.architecture}`;
      
      const spinner = ora({
        text: `Fetching template from GitHub (${repoInput})...`,
        spinner: 'dots',
        color: 'blue'
      }).start();

      try {
        await downloadTemplate(repoInput, {
          dir: stagingPath,
          force: true,
          auth: process.env.GITHUB_TOKEN 
        });
        spinner.succeed(`Template fetched for ./${projectName}`);
      } catch (fetchError) {
        spinner.fail(`Failed to fetch template from GitHub: ${repoInput}`);
        throw new Error('FETCH_FAILED', { cause: fetchError });
      }
    }

    // 3. TRANSFORM & DEDUPLICATE PHASE
    const compileSpinner = ora({
      text: 'Compiling templates and verifying file hashes...',
      spinner: 'dots',
      color: 'cyan'
    }).start();
    const compileStart = Date.now();
    
    const allFiles = getAllFiles(stagingPath);
    let compiledCount = 0;
    let skippedCount = 0; 

    for (const tempFile of allFiles) {
      const relativePath = path.relative(stagingPath, tempFile);
      const targetFile = path.join(projectPath, relativePath);

      const targetDir = path.dirname(targetFile);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      let finalContent;
      const isTextFile = tempFile.match(/\.(tsx|ts|json|md|html|css|mjs|js|jsx)$/);

      if (isTextFile) {
        let content = fs.readFileSync(tempFile, 'utf-8');

        const hasStructuralBlocks = /\{\{\s*(#if|#unless|else|\/if|\/unless)\b/.test(content);

        if (hasStructuralBlocks) {
          const safeRegex = /\{\{(\s*)(?!(?:#if|#unless|else|\/if|\/unless|eq|projectName|template|variant|architecture|design|navCount|includeSidebar|enableSecurity)(?:\s|\}))/g;
          content = content.replace(safeRegex, '\\{{$1');

          const template = Handlebars.compile(content);
          content = template(config);
        } else {
          const placeholders = ['projectName', 'template', 'variant', 'architecture', 'design', 'navCount', 'includeSidebar', 'enableSecurity'];
          for (const key of placeholders) {
            const token = `{{${key}}}`;
            if (content.includes(token)) {
              content = content.replaceAll(token, config[key] !== undefined ? config[key] : '');
            }
          }
        }

        if (content.includes('\\{{')) {
          content = content.replaceAll('\\{{', '{{');
        }
        
        finalContent = content; 
      } else {
        finalContent = fs.readFileSync(tempFile); 
      }

      const newHash = getFileHash(finalContent);
      let shouldWrite = true;

      if (fs.existsSync(targetFile)) {
        const existingContent = fs.readFileSync(targetFile);
        const existingHash = getFileHash(existingContent);
        
        if (newHash === existingHash) {
          shouldWrite = false;
        }
      }

      if (shouldWrite) {
        fs.writeFileSync(targetFile, finalContent);
        compiledCount++;
        if (verbose) {
          console.log(chalk.gray(`    [write] Updated — ${relativePath}`));
        }
      } else {
        skippedCount++;
        if (verbose) {
          console.log(chalk.gray(`    [skip] Unchanged (SHA-256 matched) — ${relativePath}`));
        }
      }
    }

    fs.rmSync(stagingPath, { recursive: true, force: true });

    compileSpinner.succeed('Template compilation & deduplication complete!');
    if (verbose) {
      console.log(chalk.gray(`    [audit] ${compiledCount} files written, ${skippedCount} files skipped (${Date.now() - compileStart}ms)`));
    }

    const configFilePath = path.join(projectPath, 'opusify.config.json');
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    generateNavigation(projectPath, config);
    resolveDependencies(projectPath, config);
    applySecurity(projectPath, config);

    if (config.noInstall) {
      console.log(chalk.gray('\n⏭️  Skipping npm install (--no-install).'));
    } else {
      const nodeModulesPath = path.join(projectPath, 'node_modules');
      if (fs.existsSync(nodeModulesPath)) {
        console.log(chalk.yellow('\n⚠️  WARNING: A node_modules directory already exists in the target directory.'));
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
      }  catch {
        gitSpinner.fail('Could not initialize Git.');
        console.log(chalk.gray('  Suggested fix: Ensure git is installed on your system or run "git init" manually.'));
      }
    } else {
      console.log(chalk.gray('\n⏭️  Skipping Git initialization.'));
    }

    console.log(chalk.magenta(`\n🎉 Project ${projectName} is ready!`));
    if (verbose) {
      console.log(chalk.gray(`    [total] Generation completed in ${((Date.now() - totalStart) / 1000).toFixed(1)}s`));
    }
    console.log(chalk.white('\nNext steps:'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  npm run dev\n'));
  } catch (error) {
    console.log(chalk.red('\n🚨 Generation failed.'));
    
    if (fs.existsSync(stagingPath)) {
      try {
        fs.rmSync(stagingPath, { recursive: true, force: true });
      } catch(e) { /* silent fail on cleanup */ }
    }

    if (error.code === 'ENOSPC') {
      console.log(chalk.red('  ✖ Error: Not enough disk space.'));
    } else if (error.code === 'EACCES' || error.code === 'EPERM') {
      console.log(chalk.red('  ✖ Error: Permission denied.'));
    } else if (error.message !== 'FETCH_FAILED') {
      console.log(chalk.gray(`  Details: ${error.message}`));
    }
  }
}