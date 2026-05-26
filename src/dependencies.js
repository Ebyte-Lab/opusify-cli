import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export function resolveDependencies(projectPath, config) {
  console.log(chalk.cyan('\n🧩 Resolving dynamic dependencies...'));
  
  const pkgPath = path.join(projectPath, 'package.json');

  // Safety check: Ensure a package.json actually exists to modify
  if (!fs.existsSync(pkgPath)) {
    console.log(chalk.yellow('⚠️ No package.json found. Skipping dynamic dependencies.'));
    return;
  }

  // 1. Read and parse the existing package.json
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  // Ensure the dependencies objects exist in the file
  if (!pkg.dependencies) pkg.dependencies = {};
  if (!pkg.devDependencies) pkg.devDependencies = {};

  // 2. Inject specific packages based on the Design System choice
  if (config.design === 'Glassmorphism') {
    pkg.dependencies['framer-motion'] = '^11.2.0';
    pkg.dependencies['clsx'] = '^2.1.1';
    pkg.dependencies['tailwind-merge'] = '^2.3.0';
  } else if (config.design === 'Dark Terminal') {
    pkg.dependencies['lucide-react'] = '^0.378.0'; // For terminal icons
  } else if (config.design === 'Neon Cyberpunk') {
    pkg.dependencies['framer-motion'] = '^11.2.0'; // For glow/hover animations
  }

  // 3. Inject routing tools based on Sidebar choice
  if (config.includeSidebar && config.architecture.includes('vite')) {
    pkg.dependencies['react-router-dom'] = '^6.23.0';
  }

  // 4. Save the modified package.json back to the project folder
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  
  console.log(chalk.green('  ✔ package.json dynamically tailored to your configuration!'));
}