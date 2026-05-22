import inquirer from 'inquirer';
import chalk from 'chalk';

const TEMPLATES = {
  portfolio: {
    label: "Portfolio Website",
    variants: ["Minimal Dark", "Creative Agency", "Developer Folio", "Photography", "Resume Style"],
    sidebarOpts: false
  },
  ecommerce: {
    label: "E-Commerce Store",
    variants: ["Fashion Store", "Electronics Shop", "Food & Grocery", "Digital Products", "Multi-Vendor"],
    sidebarOpts: true
  },
  school: {
    label: "School Management",
    variants: ["University Portal", "K-12 System", "Online Academy", "Training Platform", "LMS Dashboard"],
    sidebarOpts: true
  },
  saas: {
    label: "SaaS Dashboard",
    variants: ["Analytics Tool", "CRM System", "Project Manager", "Finance Tracker", "HR Platform"],
    sidebarOpts: true
  },
  blog: {
    label: "Blog / Magazine",
    variants: ["Tech Blog", "Lifestyle Mag", "News Portal", "Personal Journal", "Tutorial Site"],
    sidebarOpts: true
  }
};

const DESIGNS = [
  "Minimal Clean", "Dark Terminal", "Glassmorphism", "Brutalist", 
  "Soft Pastel", "Corporate Blue", "Neon Cyberpunk", "Earth Tones"
];

async function runOpusifyWizard() {
  console.clear();
  console.log(chalk.green('❯ npx opusify create'));
  console.log(chalk.green('  ██████╗ ██████╗ ██╗   ██╗███████╗██╗███████╗██╗   ██╗'));
  console.log(chalk.blue(`  Welcome to ${chalk.magenta('Opusify')} — The Full-Stack Scaffold Engine v1.0.0`));
  console.log(chalk.gray('  Generate production-ready apps with one command.\n'));

  const config = await inquirer.prompt([
    // Changed to rawlist so it prints numbers
    {
      type: 'rawlist',
      name: 'template',
      message: chalk.magenta.bold('Select a project template:'),
      choices: [
        { name: 'Portfolio Website', value: 'portfolio' },
        { name: 'E-Commerce Store', value: 'ecommerce' },
        { name: 'School Management', value: 'school' },
        { name: 'SaaS Dashboard', value: 'saas' },
        { name: 'Blog / Magazine', value: 'blog' }
      ]
    },
    {
      type: 'rawlist',
      name: 'variant',
      message: chalk.magenta.bold('Choose a variant style:'),
      choices: (answers) => {
        if (!TEMPLATES[answers.template]) return ["Default"];
        return TEMPLATES[answers.template].variants;
      }
    },
    {
      type: 'rawlist',
      name: 'architecture',
      message: chalk.magenta.bold('Choose architecture:'),
      choices: [
        { name: 'Next.js 14 — App Router (Recommended)', value: 'nextjs-monolith' },
        { name: 'Vite + React 18 — SPA', value: 'vite-react' },
        { name: 'Turborepo — Monorepo (Enterprise)', value: 'nextjs-turborepo' }
      ]
    },
    {
      type: 'rawlist',
      name: 'design',
      message: chalk.magenta.bold('Choose design system:'),
      choices: DESIGNS
    },
    {
      type: 'number',
      name: 'navCount',
      message: chalk.cyan.bold('How many navigation links? (3-9)'),
      default: 5,
      validate: (input) => input >= 3 && input <= 9 ? true : 'Please enter a number between 3 and 9'
    },
    {
      type: 'confirm',
      name: 'includeSidebar',
      message: chalk.cyan.bold('Include a sidebar layout?'),
      default: false,
      when: (answers) => {
        if (!TEMPLATES[answers.template]) return false;
        return TEMPLATES[answers.template].sidebarOpts;
      }
    }
  ]);

  console.log('\n' + chalk.green('✔ Configuration collected successfully!'));
  console.log(chalk.gray('Final Config Object:'));
  console.log(config);
}

runOpusifyWizard();