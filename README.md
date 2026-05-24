# opusify-cli


# opusify-cli

<div align="center">

```
  ██████╗ ██████╗ ██╗   ██╗███████╗██╗███████╗██╗   ██╗
 ██╔═══██╗██╔══██╗██║   ██║██╔════╝██║██╔════╝╚██╗ ██╔╝
 ██║   ██║██████╔╝██║   ██║███████╗██║█████╗   ╚████╔╝
 ██║   ██║██╔═══╝ ██║   ██║╚════██║██║██╔══╝    ╚██╔╝
 ╚██████╔╝██║     ╚██████╔╝███████║██║██║        ██║
  ╚═════╝ ╚═╝      ╚═════╝ ╚══════╝╚═╝╚═╝        ╚═╝
```

**Full-Stack Scaffold Engine — Generate production-ready apps with one command.**

[![Node.js ≥ 18](https://img.shields.io/badge/node-%3E%3D18.0-brightgreen)](https://nodejs.org)
[![npm ≥ 9](https://img.shields.io/badge/npm-%3E%3D9.0-red)](https://npmjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](package.json)

</div>

---

## Table of Contents

- [What is Opusify?](#what-is-opusify)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Project Templates](#project-templates)
- [Design Systems](#design-systems)
- [Command Reference](#command-reference)
- [Generated Project Structure](#generated-project-structure)
- [Core Algorithms](#core-algorithms)
- [Security Hardening](#security-hardening)
- [Token Optimisation Strategy](#token-optimisation-strategy)
- [GitHub Integration](#github-integration)
- [Contributing (Ebyte Soft Lab Workflow)](#contributing-ebyte-soft-lab-workflow)
- [Development Roadmap](#development-roadmap)
- [License](#license)

---

## What is Opusify?

Opusify is a **Node.js CLI scaffold engine** that generates production-ready, fully-configured web applications from a single interactive terminal command.

It provides a guided wizard to configure:

- Project template (Portfolio, E-Commerce, School, SaaS, Blog)
- Variant style (5 variants per template)
- Architecture (Next.js 14 App Router, Vite + React 18 SPA, Turborepo Monorepo)
- Design system (8 themes including Glassmorphism, Dark Terminal, Neon Cyberpunk)
- Navigation count (3–9 links, each generating its own route and page)
- Sidebar layout, Git init, and enterprise security hardening

The engine copies a Handlebars-powered template, injects all configuration values, dynamically resolves dependencies, runs `npm install`, and optionally initialises a Git repository — **zero manual setup required**.

> **Design Goal:** Minimise daily AI token consumption in assisted development workflows by generating pre-structured, server-rendered codebases that reduce regeneration overhead.

---

## Prerequisites

Ensure the following are installed **before** running Opusify:

| Tool | Minimum Version | Install |
|------|----------------|---------|
| Node.js | `≥ 18.0` | https://nodejs.org |
| npm | `≥ 9.0` | Bundled with Node.js |
| Git | `≥ 2.30` | https://git-scm.com |
| GitHub CLI *(optional)* | `≥ 2.0` | https://cli.github.com |

Verify your environment:

```bash
node --version   # v18.0.0 or higher
npm --version    # 9.0.0 or higher
git --version    # 2.30.0 or higher
```

---

## Installation

### Option A — Global Install (recommended for repeated use)

```bash
npm install -g opusify

# Verify
opusify --version
# → opusify/1.0.0 linux-x64 node-v20.0.0

opusify --help
```

### Option B — npx (no global install required)

```bash
npx opusify create
```

### Option C — Local Development (contributing to this repo)

```bash
# Clone the repository
git clone https://github.com/Ebyte-Lab/opusify-cli.git
cd opusify-cli

# Install dependencies
npm install

# Link the CLI globally for local testing
npm link

# Run the wizard
node index.js
# or after npm link:
opusify create
```

---

## Quick Start

```bash
# Launch the interactive wizard
npx opusify create

# Or pass a project name upfront
npx opusify create my-portfolio
```

The wizard walks you through **8 steps**:

```
❯ npx opusify create

  ██████╗ ██████╗ ██╗   ██╗███████╗██╗███████╗██╗   ██╗
  Welcome to Opusify — The Full-Stack Scaffold Engine v1.0.0
  Generate production-ready apps with one command.

? What is your project name?           → my-portfolio
? Select a project template:           → Portfolio Website
? Choose a variant style:              → Developer Folio
? Choose architecture:                 → Next.js 14 — App Router (Recommended)
? Choose design system:                → Dark Terminal
? How many navigation links? (3–9)     → 5
? Include a sidebar layout?            → No
? Initialize a new Git repository?     → Yes
? Enable Enterprise Security Hardening? → Yes

✔ Configuration collected successfully!
⚙️  Starting the File Generation Engine...
📥 Fetching template...
🪄 Compiling template tags...
📦 Installing dependencies...
🐙 Initializing Git repository...
🎉 Project my-portfolio is ready!

Next steps:
  cd my-portfolio
  npm run dev
```

---

## Architecture Overview

Opusify supports three architectures. Choose based on your project requirements:

### 1. Next.js 14 — App Router *(Recommended)*

The default and recommended choice for most projects.

- **Server Components** eliminate client bundle bloat, cutting token cost by ~60% vs pure client-side SPA
- **SSR, SSG, and API Routes** share one repository with zero configuration
- **Co-located data fetching** — components fetch their own data, removing a separate API layer
- **Server Actions** replace REST endpoints for mutations, halving the file count per feature

```
Architecture:  nextjs-monolith
Token Cost:    Low
Dev Speed:     Fast
SEO:           Excellent
Complexity:    Medium
Stack:         Next.js 14, Tailwind CSS, Prisma ORM, NextAuth, Vercel
```

Directory layout:

```
app/              ← Server Components, layouts, routes
components/       ← Shared React components (Server + Client)
lib/              ← DB client, auth helpers, utilities
actions/          ← Server Actions for mutations
public/           ← Static assets
styles/           ← Global CSS, Tailwind config
```

### 2. Vite + React 18 — SPA

Best for dashboards and internal tools where SEO is not required.

```
Architecture:  vite-react
Token Cost:    Medium
Dev Speed:     Fastest (HMR)
SEO:           None
Complexity:    Low
Stack:         Vite, React 18, React Router v6, Tailwind, shadcn/ui
```

> ⚠️ **Note:** Vite SPA is **not recommended** for E-Commerce templates — the engine will warn you. E-commerce requires SSR for SEO and initial page load performance.

### 3. Turborepo — Monorepo *(Enterprise)*

For large projects with multiple sub-applications sharing a common design system.

```
Architecture:  nextjs-turborepo
Token Cost:    Low (shared across apps)
Dev Speed:     Moderate
SEO:           Excellent
Complexity:    High
Stack:         Turborepo, Next.js ×2, Shared UI package, Prisma, Playwright
```

```
apps/
  web/          ← Main Next.js app
  admin/        ← Admin Next.js app
packages/
  ui/           ← Shared component library
  config/       ← Shared ESLint, Tailwind, TS configs
  utils/        ← Shared utility functions
```

---

## Project Templates

### 1. Portfolio Website

Personal portfolio for developers, designers, and creatives. Optimised for page speed and SEO. Includes a projects showcase, skills section, and contact form.

| Variant | Description | Best For |
|---------|-------------|----------|
| Minimal Dark | Clean dark theme with monospace accents | Developers |
| Creative Agency | Bold colours, large typography, motion effects | Designers |
| Developer Folio | GitHub stats, code snippets, tech stack grid | Engineers |
| Photography | Full-screen image grid, lightbox gallery | Photographers |
| Resume Style | Print-friendly, ATS-optimised layout | Job seekers |

Navigation page pool: `Home`, `About`, `Projects`, `Skills`, `Contact`, `Blog`, `Testimonials`

### 2. E-Commerce Store

Fully-featured online store with Stripe payments and headless CMS for products.

| Variant | Description |
|---------|-------------|
| Fashion Store | Visual-first product catalogue with lookbook |
| Electronics Shop | Spec-heavy listings with comparison tables |
| Food & Grocery | Category-driven with cart persistence |
| Digital Products | Instant download with licence management |
| Multi-Vendor | Seller dashboards and commission tracking |

Includes: product catalogue with filter/sort/search, cart and wishlist with local persistence, Stripe Elements checkout, order history, admin panel.

Navigation page pool: `Home`, `Products`, `Cart`, `Checkout`, `Account`, `Wishlist`, `Orders`, `Search`

### 3. School Management System

Comprehensive portal with role-based access for admin, teacher, and student views.

| Variant | Description |
|---------|-------------|
| University Portal | Multi-faculty structure with programme management |
| K-12 System | Parent-teacher communication, attendance tracking |
| Online Academy | Course builder, video integration, progress tracking |
| Training Platform | Certification paths, assessments, leaderboards |
| LMS Dashboard | Analytics-heavy learning management view |

Navigation page pool: `Dashboard`, `Students`, `Courses`, `Grades`, `Attendance`, `Schedule`, `Payments`, `Reports`, `Staff`

### 4. SaaS Dashboard

Data-rich application dashboard with analytics charts, user management, billing, and settings.

| Variant | Description |
|---------|-------------|
| Analytics Tool | Chart-heavy data visualisation |
| CRM System | Contact management, pipeline, activity feed |
| Project Manager | Kanban, Gantt, task assignment |
| Finance Tracker | P&L, invoicing, expense reporting |
| HR Platform | Headcount, payroll, onboarding flows |

Navigation page pool: `Dashboard`, `Analytics`, `Users`, `Settings`, `Billing`, `Reports`, `Integrations`, `Team`

### 5. Blog / Magazine

Content-first publishing platform with MDX articles, categories, author profiles, and newsletter subscription. SEO metadata, sitemaps, and RSS feeds pre-configured.

| Variant | Description |
|---------|-------------|
| Tech Blog | Code-snippet-rich, syntax highlighted |
| Lifestyle Mag | Image-driven, editorial grid layout |
| News Portal | Breaking news, tag-based filtering |
| Personal Journal | Long-form, minimal distraction layout |
| Tutorial Site | Step-by-step format, progress indicator |

Navigation page pool: `Home`, `Articles`, `Categories`, `Authors`, `Newsletter`, `About`

---

## Design Systems

Eight production-ready design systems, each fully configured in `globals.css` and `tailwind.config.ts`:

| Design | Primary Use | Auto-injects |
|--------|-------------|--------------|
| Minimal Clean | General-purpose, clean SaaS | — |
| Dark Terminal | Developer tools, CLIs, dashboards | `lucide-react` |
| Glassmorphism | Modern SaaS, landing pages | `framer-motion`, `clsx`, `tailwind-merge` |
| Brutalist | Creative agencies, portfolios | — |
| Soft Pastel | Education, health, lifestyle apps | — |
| Corporate Blue | Finance, enterprise, legal | — |
| Neon Cyberpunk | Gaming, tech, entertainment | `framer-motion` |
| Earth Tones | Sustainability, food, travel | — |

> **Dynamic dependency injection:** The `resolveDependencies` engine reads your `design` and `includeSidebar` choices and automatically adds or omits packages from `package.json` before `npm install` runs. No bloat.

---

## Command Reference

### `create` — Scaffold a new project

```bash
opusify create [project-name] [options]
```

| Option | Values | Description |
|--------|--------|-------------|
| `--template`, `-t` | `portfolio \| ecommerce \| school \| saas \| blog` | Skip the template prompt |
| `--arch`, `-a` | `nextjs \| vite \| turborepo` | Skip the architecture prompt |
| `--design`, `-d` | e.g. `dark-terminal` | Skip the design prompt |
| `--nav` | `3–9` | Number of navigation links |
| `--sidebar` | flag | Include sidebar layout |
| `--no-git` | flag | Skip `git init` |
| `--no-install` | flag | Skip `npm install` |
| `--yes`, `-y` | flag | Accept all defaults (non-interactive) |
| `--verbose` | flag | Show detailed output |

**Examples:**

```bash
# Interactive wizard
npx opusify create

# Non-interactive with flags
npx opusify create my-app --template portfolio --arch nextjs --design dark-terminal --nav 5

# Skip git and install for CI environments
npx opusify create my-app --yes --no-git --no-install
```

### `list` — Show available templates

```bash
opusify list                          # All templates and architectures
opusify list --template portfolio     # Portfolio variants only
```

### `add` — Add a component to an existing project

```bash
opusify add auth          # NextAuth authentication
opusify add payments      # Stripe integration
opusify add cms           # Contentlayer CMS
opusify add analytics     # Plausible / Vercel Analytics
opusify add dark-mode     # Theme toggling
opusify add i18n          # Internationalisation (next-intl)
```

### `deploy` — Deploy to a hosting provider

```bash
opusify deploy vercel       # Recommended for Next.js
opusify deploy netlify
opusify deploy railway
opusify deploy cloudflare   # Cloudflare Pages
```

---

## Generated Project Structure

### Next.js App Router — E-Commerce Example

```
my-store/
├── app/
│   ├── layout.tsx                        # Root layout, fonts, providers
│   ├── page.tsx                          # Home page (Server Component)
│   ├── products/
│   │   ├── page.tsx                      # Product listing
│   │   └── [slug]/page.tsx               # Product detail (dynamic route)
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── account/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       └── webhooks/stripe/route.ts
├── components/
│   ├── ui/                               # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx                       # Only generated when sidebar: true
│   └── Footer.tsx
├── lib/
│   ├── auth.ts                           # NextAuth config
│   ├── db.ts                             # Prisma client singleton
│   ├── nav.ts                            # Typed nav config (generated from navCount)
│   └── utils.ts
├── actions/                              # Server Actions
│   ├── cart.ts
│   └── checkout.ts
├── prisma/schema.prisma                  # Database schema
├── .env.example                          # All required env vars documented
├── .github/workflows/ci.yml             # Lint, type-check, build on PR
├── .husky/pre-commit                     # Secret scan + lint-staged
├── next.config.ts                        # CSP headers, redirects
├── tailwind.config.ts
├── env.mjs                               # Zod env validation (security: true)
└── opusify.config.json                   # Your scaffold blueprint
```

### Vite + React SPA

```
my-app/
├── src/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── ...                           # One file per nav link
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Layout.tsx
│   ├── hooks/
│   ├── stores/
│   └── App.tsx                           # BrowserRouter + Routes
├── vite.config.ts
├── tailwind.config.ts
├── .env.example
└── opusify.config.json
```

### opusify.config.json Reference

Every generated project includes an `opusify.config.json` at its root — your scaffold blueprint:

```json
{
  "template": "ecommerce",
  "variant": "Fashion Store",
  "architecture": "nextjs-monolith",
  "design": "Minimal Clean",
  "projectName": "my-store",
  "navCount": 6,
  "includeSidebar": true,
  "initGit": true,
  "enableSecurity": true
}
```

Override any default by editing this file and re-running `opusify create` pointing at an existing config.

---

## Core Algorithms

### 1. Template Resolution

```
FUNCTION resolveTemplate(userInput):
  1. Parse CLI flags → extract { template, variant, arch, design, nav, sidebar }
  2. For each undefined field → launch interactive inquirer prompt
  3. Validate combination:
       IF template == 'ecommerce' AND arch == 'vite':
         WARN 'Vite SPA not recommended for e-commerce (no SSR)'
  4. Resolve template path:
       templatePath = templates/{template}/{architecture}/
  5. IF localTemplatePath exists → DEV MODE (copy local folder)
     ELSE                        → PROD MODE (tiged clone from GitHub)
  6. RETURN { templatePath, config, projectName }
```

### 2. File Generation (Two-Phase)

```
FUNCTION generateFiles(templatePath, config, outputPath):
  manifest = scanDirectory(templatePath)
  FOR file IN manifest:
    IF file.extension IN [.tsx, .ts, .json, .md, .html, .css]:
      IF file.content includes '{{':
        output = Handlebars.compile(file)(config)   ← inject projectName, design, etc.
      ELSE:
        output = readFile(file)                     ← static copy
    IF sha256(output) != existingHash(outputPath + file.path):
      writeFile(outputPath + file.path, output)     ← skip unchanged files on re-run
  runPostProcess(outputPath)                        ← eslint --fix + prettier --write
```

### 3. Navigation Generation

```
FUNCTION generateNavigation(template, navCount, sidebar):
  pagePool    = TEMPLATES[template].pages
  selectedPages = pagePool.slice(0, navCount)
  navConfig   = selectedPages.map(page → { label, href, icon })

  writeFile('lib/nav.ts', renderNavTypes(navConfig))

  FOR page IN selectedPages:
    writeFile('app/' + page.toLowerCase() + '/page.tsx', renderPage(page))

  IF sidebar AND TEMPLATES[template].sidebarOpts:
    writeFile('components/Sidebar.tsx', renderSidebar(navConfig))
```

### 4. Dependency Resolution

```
FUNCTION resolveDependencies(projectPath, config):
  pkg = readJSON(projectPath/package.json)

  # Base deps already in template
  # Inject conditionally based on user config:

  IF config.design == 'Glassmorphism':
    pkg.dependencies['framer-motion']   = '^11.2.0'
    pkg.dependencies['clsx']            = '^2.1.1'
    pkg.dependencies['tailwind-merge']  = '^2.3.0'

  ELIF config.design == 'Dark Terminal':
    pkg.dependencies['lucide-react']    = '^0.378.0'

  IF config.includeSidebar AND config.architecture.includes('vite'):
    pkg.dependencies['react-router-dom'] = '^6.23.0'

  writeJSON(projectPath/package.json, pkg)
```

### 5. Naming Collision Resolution

If the chosen project name already exists as a directory, the engine auto-appends a random 4-digit suffix and retries — preventing destructive overwrites:

```javascript
while (fs.existsSync(projectPath)) {
  const randomSuffix = Math.floor(Math.random() * 10000);
  projectName = `${config.projectName}-${randomSuffix}`;
  projectPath = path.join(process.cwd(), projectName);
}
```

---

## Security Hardening

When `enableSecurity: true` (default), every generated project receives a full security pass:

### Environment Variable Validation (Zod)

```javascript
// env.mjs — auto-generated by Opusify
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL:       z.string().url(),
  NEXTAUTH_SECRET:    z.string().min(32),
  NEXTAUTH_URL:       z.string().url(),
  STRIPE_SECRET_KEY:  z.string().startsWith('sk_').optional(),
})

export const env = envSchema.parse(process.env)
// Missing vars throw at build time — not silently at runtime.
```

### Vulnerability Surface Coverage

| Threat | Mitigation | Status |
|--------|-----------|--------|
| SQL Injection | Prisma ORM parameterised queries | Auto-applied |
| XSS | React DOM escaping + CSP headers | Auto-applied |
| CSRF | Next.js Server Actions CSRF protection | Auto-applied |
| Secret leak in Git | Husky pre-commit secret scanner | Auto-applied |
| Dependency CVE | `npm audit` in CI + Dependabot config | Auto-applied |
| Env var exposure | Zod validation + `.gitignore` for `.env` | Auto-applied |
| Rate limiting | Upstash Redis rate limiter on API routes | Optional add-on |

### CSP Headers (next.config.ts)

```typescript
// Auto-generated by Opusify when enableSecurity: true
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'nonce-{NONCE}';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
    `.replace(/\n/g, ''),
  },
]
```

### Pre-commit Hook

```bash
# .husky/pre-commit — installed automatically
npx lint-staged        # ESLint + Prettier on staged files
npx secret-scan .      # Pattern-match for API keys / tokens
```

---

## Token Optimisation Strategy

Opusify is designed to minimise daily AI token consumption in AI-assisted development workflows.

**Architecture level:**
- All pages are React Server Components by default. Client Components are opt-in, reducing client bundle size and regeneration surface area.
- Data fetches are co-located inside the component that needs them, eliminating a separate API layer.
- Server Actions handle form mutations — one file per feature instead of two (route + handler).

**Code generation level:**
- Navigation lives in a single `lib/nav.ts`. Updating nav requires touching **one file**, not every layout.
- The root `layout.tsx` handles fonts, providers, and metadata once. Individual pages are minimal stubs.
- `shadcn/ui` components are inlined into the project and modifiable without full regeneration.

**Per-session guidance:**
- When prompting an AI to modify a scaffolded project, provide only the file(s) that need changing — not the entire codebase.
- Use the `lib/nav.ts` pattern for all data referenced across multiple components.
- Prefer Server Actions over REST API endpoints: one file per operation vs two.

---

## GitHub Integration

### Automatic — GitHub CLI

```bash
cd my-project

# Authenticate (first time only)
gh auth login

# Public repo
gh repo create my-project --public --source=. --push

# Private repo
gh repo create my-project --private --source=. --push
```

### Manual — Standard Git

```bash
cd my-project
git init
git add .
git commit -m "feat: initial scaffold via Opusify"
git remote add origin https://github.com/YOUR_USERNAME/my-project.git
git branch -M main
git push -u origin main
```

### Generated CI/CD Workflow

Every project includes a GitHub Actions workflow at `.github/workflows/ci.yml`:

```yaml
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      - run: npm audit --audit-level=high
```

---

## Contributing (Ebyte Soft Lab Workflow)

All contributors must follow this workflow. Skipping any step risks merge conflicts and broken main.

### 1. Claim the Issue First

No developer may start coding without claiming the issue.

1. Open the GitHub issue you want to work on.
2. Comment: **"I am claiming this task."**
3. Wait for the maintainer to officially **Assign** the issue to you.

### 2. Branch Naming Convention

Never push directly to `main`. Always branch off the latest `main`.

```
Format:   <type>/issue-<number>-<short-description>

Examples:
  feat/issue-005-portfolio-template
  config/issue-003-eslint-setup
  fix/issue-004-sigint-handler
  chore/issue-002-contributing-docs
```

```bash
git checkout main
git pull origin main
git checkout -b feat/issue-005-portfolio-template
```

### 3. Development & Commits

- Write clean, self-documenting code.
- If touching Handlebars template files, **escape React inline styles**: `\{{ marginTop: 0 }}` (the backslash prevents Handlebars from parsing the style object).
- Follow **Conventional Commits** format:

```
feat:     Added loading spinner
fix:      Corrected tailwind config merge
chore:    Updated .gitignore
config:   Set up ESLint rules
docs:     Updated README installation steps
refactor: Simplified dependency resolver
```

### 4. Pull Request Checklist

Before opening a PR:

- [ ] Ran `node index.js` locally — wizard completes without errors
- [ ] Generated project compiles: `cd generated-project && npm run dev`
- [ ] ESLint passes: `npm run lint` (zero errors, zero warnings)
- [ ] Prettier passes: `npm run format`
- [ ] If adding Handlebars variables: verified compiled output in a generated project

PR requirements:
- Title must reference the issue: `feat: ISSUE-005 — Base Portfolio Template`
- Description must include the auto-close keyword: `Closes #5`
- Target branch: `main`

### 5. Code Review & Merge

- At least **one** other team member must approve the PR.
- GitHub Actions CI must show a **green checkmark** (lint + type-check + build pass).
- Project lead performs **Squash & Merge** into `main`.

---

## npm Script Reference

Run these from inside a **generated project directory**:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR → `http://localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint on all files |
| `npm run type-check` | Run `tsc --noEmit` |
| `npm run format` | Run Prettier on all files |
| `npm run test` | Run Vitest unit tests |
| `npm run e2e` | Run Playwright end-to-end tests |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

---

## Development Roadmap

| Issue | Task | Core Sub-Tasks | Requires | Phase |
|-------|------|---------------|----------|-------|
| 001 | Make CLI Executable | Add shebang, add `"bin"` to package.json, test `npm link` | — | CLI Config |
| 002 | Core Documentation | Write README.md, write CONTRIBUTING.md | — | CLI Config |
| 003 | CI/CD & Code Quality | ESLint + Prettier, Husky hooks, GitHub Actions workflow | ISSUE-001 | CLI Config |
| 004 | Enhance CLI UX | `ora` spinners, graceful `SIGINT` (Ctrl+C) handler | — | CLI Polish |
| 005 | Base Portfolio Template | Next.js 14 App Router, Handlebars injection, base UI components | — | Templates |
| 006 | Base E-Commerce Template | Next.js 14 App Router, `[slug]` routing, Handlebars sidebar logic | — | Templates |
| 007 | Dynamic Tailwind Themes | CSS variables in `globals.css`, `tailwind.config.ts`, Glassmorphism + Dark Terminal | ISSUE-005, 006 | Templates |
| 008 | Security & Dependencies | Zod `env.mjs` validation, conditional `framer-motion`/`lucide-react` injection | ISSUE-005, 006, 007 | Templates |
| 009 | Remaining Templates & Vite | School, SaaS, Blog structures; Vite + React SPA architecture | — (parallel) | Templates |

---

## End-to-End Workflow

```bash
# 1. Scaffold
npx opusify create my-app

# 2. Configure environment variables
cd my-app
cp .env.example .env.local
# Edit .env.local with your actual values

# 3. Set up database (Prisma projects only)
npx prisma db push
npx prisma generate

# 4. Start dev server
npm run dev
# → http://localhost:3000

# 5. Push to GitHub
gh repo create my-app --public --source=. --push

# 6. Deploy
opusify deploy vercel
```

---

## License

MIT © [Ebyte Soft Lab](https://github.com/Ebyte-Lab)

---



**opusify v1.0.0** · Built for developers, by developers · [github.com/Ebyte-Lab/opusify-cli](https://github.com/Ebyte-Lab/opusify-cli)





### 🗺️ Opusify Master Development Roadmap

| Issue | Task / Title               | Core Sub-Tasks                                                                                                                 | Required Before Starting   | Phase      |
| ----- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | ---------- |
| 001   | Make CLI Executable        | • Add `#!/usr/bin/env node` shebang.<br><br>• Add `"bin"` to `package.json`.<br><br>• Test global `npm link` execution.        | None                       | CLI Config |
| 002   | Core Documentation         | • Write `README.md` (installation, usage).<br><br>• Write `CONTRIBUTING.md` (Git rules).                                       | None                       | CLI Config |
| 003   | CI/CD & Code Quality       | • Configure ESLint & Prettier.<br><br>• Set up Husky pre-commit hooks.<br><br>• Create GitHub Actions `.yml` workflow.         | ISSUE-001                  | CLI Config |
| 004   | Enhance CLI UX             | • Implement `ora` terminal spinners.<br><br>• Catch `SIGINT` (Ctrl+C) gracefully.                                              | None                       | CLI Polish |
| 005   | Base Portfolio Template    | • Init Next.js 14 App Router.<br><br>• Inject `{{projectName}}` & `{{design}}`.<br><br>• Build base UI components.             | None                       | Templates  |
| 006   | Base E-Commerce Template   | • Init Next.js 14 App Router.<br><br>• Build dynamic `[slug]` routing.<br><br>• Configure Handlebars sidebar logic.            | None                       | Templates  |
| 007   | Dynamic Tailwind Themes    | • Map CSS variables in `globals.css`.<br><br>• Configure `tailwind.config.ts`.<br><br>• Wire up Glassmorphism & Dark Terminal. | ISSUE-005, 006             | Templates  |
| 008   | Security & Dependencies    | • Implement Zod `env.mjs` validation.<br><br>• Use Handlebars to conditionally import `framer-motion`/`lucide-react`.          | ISSUE-005, 006, 007        | Templates  |
| 009   | Remaining Templates & Vite | • Build School, SaaS, and Blog structures.<br><br>• Build Vite + React SPA architecture.                                       | None (Can run in parallel) | Templates  |


### 📜 Ebyte Soft Lab Contributor Rules & Workflow

To maintain code quality and prevent merge conflicts, every developer must follow this strict Git workflow when tackling the issues above.

**1. Claiming a Task**

* No developer may start coding without claiming the issue first.
* Comment on the GitHub issue: *"I am claiming this task."*
* The repository maintainer will officially **Assign** the issue to the developer.

**2. Branch Naming Convention**

* Never push directly to the `main` branch.
* Always branch off the latest `main`.
* Format: `<type>/issue-<number>-<short-description>`
* *Example:* `feat/issue-005-portfolio-template`
* *Example:* `config/issue-003-eslint-setup`

**3. Development & Commits**

* Write clean, self-documenting code.
* If touching Handlebars files, ensure React inline styles are properly escaped (e.g., `\{{ marginTop: 0 }}`).
* Commit messages must follow Conventional Commits format (e.g., `feat: added loading spinner`, `fix: corrected tailwind config`).

**4. Opening a Pull Request (PR)**

* Push the branch to GitHub and open a Pull Request against `main`.
* The PR title must reference the issue.
* The PR description must include the magic keyword to auto-close the issue. Example: `Closes #5`.
* **Checklist before requesting review:**
* Did I run the CLI locally to test the generation?
* Does the generated code compile without errors (`npm run dev`)?
* Did I pass the local ESLint and Prettier checks?



**5. Code Review & Merge**

* At least one other team member must review the PR.
* The GitHub Actions CI/CD pipeline (Issue 003) must pass with a green checkmark.
* Once approved, the project lead will Squash & Merge the code into `main`.

