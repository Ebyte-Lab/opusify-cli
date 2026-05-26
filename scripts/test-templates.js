/**
 * Template Integration Test Script
 *
 * Generates and builds every template+architecture+design combination
 * to catch regressions before they reach users.
 *
 * Usage:
 *   node scripts/test-templates.js          # Run all tests
 *   node scripts/test-templates.js --quick  # Run a minimal subset (CI-friendly)
 */

import { generateProject } from '../src/generate.js';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TEMPLATES = ['portfolio', 'ecommerce', 'school', 'saas', 'blog'];
const DESIGNS = ['Minimal Clean', 'Dark Terminal', 'Glassmorphism'];

// Template → available architectures
const ARCHITECTURES = {
  portfolio: ['nextjs-monolith', 'vite-react'],
  ecommerce: ['nextjs-monolith', 'vite-react'],
  school: ['nextjs-monolith'],
  saas: ['nextjs-monolith', 'vite-react'],
  blog: ['nextjs-monolith'],
};

// Default variant per template (first one)
const VARIANTS = {
  portfolio: 'Developer Folio',
  ecommerce: 'Fashion Store',
  school: 'University Portal',
  saas: 'Analytics Tool',
  blog: 'Tech Blog',
};

const isQuick = process.argv.includes('--quick');

// Build the test matrix
const tests = [];

for (const template of TEMPLATES) {
  for (const architecture of ARCHITECTURES[template]) {
    for (const design of DESIGNS) {
      // Test both sidebar=true and sidebar=false for templates that support it
      const sidebarOptions = template === 'portfolio' ? [false] : [true, false];

      for (const includeSidebar of sidebarOptions) {
        tests.push({
          projectName: `test-${template}-${architecture.split('-')[0]}-${design.replace(/\s+/g, '').toLowerCase()}-${includeSidebar ? 'sidebar' : 'nosidebar'}`,
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
}

// In quick mode, only test one design per template+arch combo
const filteredTests = isQuick
  ? tests.filter((t) => t.design === 'Minimal Clean' && t.includeSidebar === false)
  : tests;

console.log(`\nRunning ${filteredTests.length} template tests${isQuick ? ' (quick mode)' : ''}...\n`);

const results = [];
const startTime = Date.now();

for (let i = 0; i < filteredTests.length; i++) {
  const test = filteredTests[i];
  const projectPath = path.join(process.cwd(), test.projectName);

  // Clean up if exists
  if (fs.existsSync(projectPath)) fs.rmSync(projectPath, { recursive: true, force: true });

  const label = `[${i + 1}/${filteredTests.length}] ${test.template}/${test.architecture} (${test.design}, sidebar=${test.includeSidebar})`;
  process.stdout.write(`  ${label}...`);

  try {
    // Generate
    await generateProject(test);

    // Build
    const buildCmd = test.architecture === 'vite-react' ? 'npx vite build' : 'npm run build';
    execSync(buildCmd, { cwd: projectPath, stdio: 'pipe' });

    results.push({ label, status: 'pass' });
    process.stdout.write(' ✅\n');
  } catch (err) {
    const errorMsg = err.stderr?.toString().slice(0, 200) || err.message?.slice(0, 200) || 'Unknown error';
    results.push({ label, status: 'fail', error: errorMsg });
    process.stdout.write(' ❌\n');
    console.error(`    Error: ${errorMsg.split('\n')[0]}\n`);
  } finally {
    // Clean up
    if (fs.existsSync(projectPath)) fs.rmSync(projectPath, { recursive: true, force: true });
  }
}

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
const passed = results.filter((r) => r.status === 'pass').length;
const failed = results.filter((r) => r.status === 'fail').length;

console.log('\n' + '═'.repeat(60));
console.log(`  Results: ${passed} passed, ${failed} failed (${elapsed}s)`);
console.log('═'.repeat(60));

if (failed > 0) {
  console.log('\n  Failed tests:');
  for (const r of results.filter((r) => r.status === 'fail')) {
    console.log(`    ❌ ${r.label}`);
    console.log(`       ${r.error.split('\n')[0]}`);
  }
  console.log('');
  process.exit(1);
}

console.log('');
process.exit(0);
