#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateProject } from './src/generate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));

const TEMPLATES = {
  portfolio: {
    label: 'Portfolio Website',
    variants: ['Minimal Dark', 'Creative Agency', 'Developer Folio', 'Photography', 'Resume Style'],
    sidebarOpts: false,
  },
  ecommerce: {
    label: 'E-Commerce Store',
    variants: ['Fashion Store', 'Electronics Shop', 'Food & Grocery', 'Digital Products', 'Multi-Vendor'],
    sidebarOpts: true,
  },
  school: {
    label: 'School Management',
    variants: ['University Portal', 'K-12 System', 'Online Academy', 'Training Platform', 'LMS Dashboard'],
    sidebarOpts: true,
  },
  saas: {
    label: 'SaaS Dashboard',
    variants: ['Analytics Tool', 'CRM System', 'Project Manager', 'Finance Tracker', 'HR Platform'],
    sidebarOpts: true,
  },
  blog: {
    label: 'Blog / Magazine',
    variants: ['Tech Blog', 'Lifestyle Mag', 'News Portal', 'Personal Journal', 'Tutorial Site'],
    sidebarOpts: true,
  },
};

const VALID_TEMPLATES = Object.keys(TEMPLATES);
const VALID_ARCHS = ['nextjs-monolith', 'vite-react', 'nextjs-turborepo'];
const ARCH_ALIASES = { nextjs: 'nextjs-monolith', vite: 'vite-react', turborepo: 'nextjs-turborepo' };
const DESIGNS = [
  'Minimal Clean', 'Dark Terminal', 'Glassmorphism', 'Brutalist',
  'Soft Pastel', 'Corporate Blue', 'Neon Cyberpunk', 'Earth Tones',
];

function resolveArch(value) {
  if (!value) return undefined;
  const lower = value.toLowerCase();
  if (ARCH_ALIASES[lower]) return ARCH_ALIASES[lower];
  if (VALID_ARCHS.includes(lower)) return lower;
  return null;
}

function resolveDesign(value) {
  if (!value) return undefined;
  const lower = value.toLowerCase();
  const match = DESIGNS.find((d) => d.toLowerCase() === lower);
  return match || null;
}

function printBanner() {
  console.clear();
  console.log(chalk.green('❯ npx opusify create'));
  console.log(chalk.green('  ██████╗ ██████╗ ██╗   ██╗███████╗██╗███████╗██╗   ██╗'));
  console.log(chalk.blue(`  Welcome to ${chalk.magenta('Opusify')} — The Full-Stack Scaffold Engine v${pkg.version}`));
  console.log(chalk.gray('  Generate production-ready apps with one command.\n'));
}

async function createAction(projectName, options) {
  printBanner();

  // Validate flags early
  if (options.template && !VALID_TEMPLATES.includes(options.template)) {
    console.log(chalk.red(`\n✖ Invalid template: "${options.template}"`));
    console.log(chalk.gray(`  Valid options: ${VALID_TEMPLATES.join(', ')}`));
    process.exit(1);
  }

  if (options.arch) {
    const resolved = resolveArch(options.arch);
    if (resolved === null) {
      console.log(chalk.red(`\n✖ Invalid architecture: "${options.arch}"`));
      console.log(chalk.gray(`  Valid options: nextjs, vite, turborepo (or nextjs-monolith, vite-react, nextjs-turborepo)`));
      process.exit(1);
    }
    options.arch = resolved;
  }

  if (options.design) {
    const resolved = resolveDesign(options.design);
    if (resolved === null) {
      console.log(chalk.red(`\n✖ Invalid design: "${options.design}"`));
      console.log(chalk.gray(`  Valid options: ${DESIGNS.join(', ')}`));
      process.exit(1);
    }
    options.design = resolved;
  }

  if (options.nav !== undefined) {
    const nav = parseInt(options.nav, 10);
    if (isNaN(nav) || nav < 3 || nav > 9) {
      console.log(chalk.red('\n✖ Invalid nav count. Must be a number between 3 and 9.'));
      process.exit(1);
    }
    options.nav = nav;
  }

  // Build the list of prompts, skipping any that were provided via flags
  const prompts = [];
  const defaults = {
    projectName: projectName || 'my-opusify-app',
    template: 'portfolio',
    variant: null, // resolved after template is known
    architecture: 'nextjs-monolith',
    design: 'Minimal Clean',
    navCount: 5,
    includeSidebar: false,
    initGit: true,
    enableSecurity: true,
  };

  // If --yes, use all defaults + any provided flags
  if (options.yes) {
    const template = options.template || defaults.template;
    const config = {
      projectName: projectName || defaults.projectName,
      template,
      variant: options.variant || TEMPLATES[template].variants[0],
      architecture: options.arch || defaults.architecture,
      design: options.design || defaults.design,
      navCount: options.nav || defaults.navCount,
      includeSidebar: options.sidebar || defaults.includeSidebar,
      initGit: options.git !== false,
      enableSecurity: defaults.enableSecurity,
      noInstall: options.install === false,
    };

    console.log(chalk.green('✔ Using defaults (--yes mode)'));
    console.log(chalk.gray(`  Project: ${config.projectName}`));
    console.log(chalk.gray(`  Template: ${config.template} / ${config.variant}`));
    console.log(chalk.gray(`  Architecture: ${config.architecture}`));
    console.log(chalk.gray(`  Design: ${config.design}`));
    console.log('');

    await generateProject(config);
    return;
  }

  // Interactive prompts — skip those already provided via flags
  if (!projectName) {
    prompts.push({
      type: 'input',
      name: 'projectName',
      message: chalk.magenta.bold('What is your project name?'),
      default: defaults.projectName,
      validate: (input) => {
        if (!/^[a-z0-9-]+$/.test(input)) {
          return 'Please use only lowercase letters, numbers, and hyphens (e.g., my-awesome-app)';
        }
        return true;
      },
    });
  }

  if (!options.template) {
    prompts.push({
      type: 'rawlist',
      name: 'template',
      message: chalk.magenta.bold('Select a project template:'),
      choices: [
        { name: 'Portfolio Website', value: 'portfolio' },
        { name: 'E-Commerce Store', value: 'ecommerce' },
        { name: 'School Management', value: 'school' },
        { name: 'SaaS Dashboard', value: 'saas' },
        { name: 'Blog / Magazine', value: 'blog' },
      ],
    });
  }

  // Variant — skip if provided via flag
  if (!options.variant) {
    prompts.push({
      type: 'rawlist',
      name: 'variant',
      message: chalk.magenta.bold('Choose a variant style:'),
      choices: (answers) => {
        const tmpl = options.template || answers.template;
        if (!TEMPLATES[tmpl]) return ['Default'];
        return TEMPLATES[tmpl].variants;
      },
    });
  }

  if (!options.arch) {
    prompts.push({
      type: 'rawlist',
      name: 'architecture',
      message: chalk.magenta.bold('Choose architecture:'),
      choices: [
        { name: 'Next.js 14 — App Router (Recommended)', value: 'nextjs-monolith' },
        { name: 'Vite + React 18 — SPA', value: 'vite-react' },
        { name: 'Turborepo — Monorepo (Enterprise)', value: 'nextjs-turborepo' },
      ],
    });
  }

  if (!options.design) {
    prompts.push({
      type: 'rawlist',
      name: 'design',
      message: chalk.magenta.bold('Choose design system:'),
      choices: DESIGNS,
    });
  }

  if (options.nav === undefined) {
    prompts.push({
      type: 'number',
      name: 'navCount',
      message: chalk.cyan.bold('How many navigation links? (3-9)'),
      default: defaults.navCount,
      validate: (input) => (input >= 3 && input <= 9 ? true : 'Please enter a number between 3 and 9'),
    });
  }

  // Sidebar prompt — only if template supports it and flag not provided
  if (options.sidebar === undefined) {
    prompts.push({
      type: 'confirm',
      name: 'includeSidebar',
      message: chalk.cyan.bold('Include a sidebar layout?'),
      default: false,
      when: (answers) => {
        const tmpl = options.template || answers.template;
        if (!TEMPLATES[tmpl]) return false;
        return TEMPLATES[tmpl].sidebarOpts;
      },
    });
  }

  if (options.git !== false) {
    prompts.push({
      type: 'confirm',
      name: 'initGit',
      message: chalk.cyan.bold('Initialize a new Git repository?'),
      default: true,
    });
  }

  // Only ask security prompt in interactive mode (when not all flags provided)
  const allFlagsProvided = options.template && options.variant && options.arch && options.design && options.nav !== undefined;
  if (!allFlagsProvided) {
    prompts.push({
      type: 'confirm',
      name: 'enableSecurity',
      message: chalk.red.bold('Enable Enterprise Security Hardening (Zod env validation & CSP headers)?'),
      default: true,
    });
  }

  let answers;
  try {
    answers = await inquirer.prompt(prompts);
  } catch (error) {
    if (error.name === 'ExitPromptError' || error.message?.includes('User force closed')) {
      console.log(chalk.yellow('\nScaffold cancelled. Goodbye!'));
      process.exit(0);
    }
    throw error;
  }

  // Merge flags with interactive answers
  const config = {
    projectName: projectName || answers.projectName,
    template: options.template || answers.template,
    variant: options.variant || answers.variant,
    architecture: options.arch || answers.architecture,
    design: options.design || answers.design,
    navCount: options.nav || answers.navCount,
    includeSidebar: options.sidebar !== undefined ? options.sidebar : (answers.includeSidebar || false),
    initGit: options.git === false ? false : (answers.initGit !== undefined ? answers.initGit : true),
    enableSecurity: answers.enableSecurity !== undefined ? answers.enableSecurity : true,
    noInstall: options.install === false,
  };

  console.log('\n' + chalk.green('✔ Configuration collected successfully!'));
  await generateProject(config);
}

// Architecture availability map
const ARCHITECTURES = {
  'nextjs-monolith': { label: 'Next.js 14 — App Router', available: ['portfolio', 'ecommerce', 'school', 'saas', 'blog'] },
  'vite-react': { label: 'Vite + React 18 — SPA', available: ['saas'] },
  'nextjs-turborepo': { label: 'Turborepo — Monorepo', available: [] },
};

function listAction(options) {
  console.log('');
  console.log(chalk.blue.bold('  Opusify — Available Templates'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────────'));
  console.log('');

  if (options.template && !TEMPLATES[options.template]) {
    console.log(chalk.red(`  ✖ Unknown template: "${options.template}"`));
    console.log(chalk.gray(`    Valid options: ${VALID_TEMPLATES.join(', ')}`));
    process.exit(1);
  }

  const templatesToShow = options.template
    ? { [options.template]: TEMPLATES[options.template] }
    : TEMPLATES;

  for (const [key, tmpl] of Object.entries(templatesToShow)) {
    console.log(chalk.white.bold(`  ${tmpl.label}`) + chalk.gray(` (${key})`));
    console.log('');

    // Variants
    console.log(chalk.cyan('    Variants:'));
    for (const variant of tmpl.variants) {
      console.log(chalk.white(`      • ${variant}`));
    }
    console.log('');

    // Architectures
    console.log(chalk.cyan('    Architectures:'));
    for (const [archKey, arch] of Object.entries(ARCHITECTURES)) {
      const isAvailable = arch.available.includes(key);
      if (isAvailable) {
        console.log(chalk.green(`      ✔ ${arch.label}`) + chalk.gray(` (${archKey})`));
      } else {
        console.log(chalk.gray(`      ○ ${arch.label} — coming soon`));
      }
    }
    console.log('');

    // Sidebar support
    console.log(chalk.cyan('    Sidebar:') + (tmpl.sidebarOpts ? chalk.green(' supported') : chalk.gray(' not applicable')));
    console.log('');
    console.log(chalk.gray('  ─────────────────────────────────────────────────────────────'));
    console.log('');
  }

  // Design systems (show once at the bottom)
  if (!options.template) {
    console.log(chalk.blue.bold('  Design Systems'));
    console.log('');
    for (const design of DESIGNS) {
      console.log(chalk.white(`    • ${design}`));
    }
    console.log('');
  }
}

// CLI setup
const program = new Command();

program
  .name('opusify')
  .description('The Full-Stack Scaffold Engine — Generate production-ready apps with one command.')
  .version(pkg.version);

program
  .command('create')
  .description('Scaffold a new project')
  .argument('[project-name]', 'Name of the project to create')
  .option('-t, --template <template>', `Project template (${VALID_TEMPLATES.join(', ')})`)
  .option('-a, --arch <architecture>', 'Architecture (nextjs, vite, turborepo)')
  .option('-d, --design <design>', `Design system (e.g., "Dark Terminal", "Glassmorphism")`)
  .option('-v, --variant <variant>', 'Variant style (e.g., "Developer Folio", "Fashion Store")')
  .option('-n, --nav <count>', 'Number of navigation links (3-9)')
  .option('--sidebar', 'Include a sidebar layout')
  .option('--no-git', 'Skip Git initialization')
  .option('--no-install', 'Skip npm install')
  .option('-y, --yes', 'Accept all defaults (non-interactive)')
  .action(createAction);

program
  .command('list')
  .description('Show available templates, variants, and architectures')
  .option('-t, --template <template>', 'Show details for a specific template')
  .action(listAction);

program.parse();
