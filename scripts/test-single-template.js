/**
 * Test a single template across all its architectures, designs, and sidebar options.
 * Used by the CI matrix strategy to parallelize template testing.
 *
 * Usage: node scripts/test-single-template.js <template>
 * Example: node scripts/test-single-template.js portfolio
 */

import { generateProject } from '../src/generate.js';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const template = process.argv[2];

if (!template) {
  console.error('Usage: node scripts/test-single-template.js <template>');
  process.exit(1);
}

const DESIGNS = ['Minimal Clean', 'Dark Terminal', 'Glassmorphism'];

const ARCHITECTURES = {
  portfolio: ['nextjs-monolith', 'vite-react'],
  ecommerce: ['nextjs-monolith', 'vite-react'],
  school: ['nextjs-monolith'],
  saas: ['nextjs-monolith', 'vite-react'],
  blog: ['nextjs-monolith'],
};

const VARIANTS = {
  portfolio: 'Developer Folio',
  ecommerce: 'Fashion Store',
  school: 'University Portal',
  saas: 'Analytics Tool',
  blog: 'Tech Blog',
};

const SIDEBAR_SUPPORT = {
  portfolio: false,
  ecommerce: true,
  school: true,
  saas: true,
  blog: true,
};

if (!ARCHITECTURES[template]) {
  console.error(`Unknown template: ${template}`);
  console.error(`Valid: ${Object.keys(ARCHITECTURES).join(', ')}`);
  process.exit(1);
}

// Build test cases for this template
const tests = [];

for (const architecture of ARCHITECTURES[template]) {
  for (const design of DESIGNS) {
    const sidebarOptions = SIDEBAR_SUPPORT[template] ? [true, false] : [false];
    for (const includeSidebar of sidebarOptions) {
      tests.push({
        projectName: `ci-${template}-${architecture.split('-')[0]}-${design.replace(/\s+/g, '').toLowerCase()}-${includeSidebar ? 's' : 'n'}`,
        template,
        variant: VARIANTS[template],
        architecture,
        design,
        navCount: 5,
        includeSidebar,
        initGit: false,
        enableSecurity: false,
        noInstall: false,
      });
    }
  }
}

console.log(`\nTesting ${template} template (${tests.length} combinations)...\n`);

const results = [];

for (let i = 0; i < tests.length; i++) {
  const test = tests[i];
  const projectPath = path.join(process.cwd(), test.projectName);

  if (fs.existsSync(projectPath)) fs.rmSync(projectPath, { recursive: true, force: true });

  const label = `${test.architecture} | ${test.design} | sidebar=${test.includeSidebar}`;
  process.stdout.write(`  [${i + 1}/${tests.length}] ${label}...`);

  try {
    await generateProject(test);

    const buildCmd = test.architecture === 'vite-react' ? 'npx vite build' : 'npm run build';
    execSync(buildCmd, { cwd: projectPath, stdio: 'pipe' });

    results.push({ label, status: 'pass' });
    process.stdout.write(' ✅\n');
  } catch (err) {
    const errorMsg = err.stderr?.toString().slice(0, 300) || err.message?.slice(0, 300) || 'Unknown error';
    results.push({ label, status: 'fail', error: errorMsg });
    process.stdout.write(' ❌\n');
    console.error(`    ${errorMsg.split('\n').slice(0, 3).join('\n    ')}\n`);
  } finally {
    if (fs.existsSync(projectPath)) fs.rmSync(projectPath, { recursive: true, force: true });
  }
}

const passed = results.filter((r) => r.status === 'pass').length;
const failed = results.filter((r) => r.status === 'fail').length;

console.log(`\n  ${template}: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
