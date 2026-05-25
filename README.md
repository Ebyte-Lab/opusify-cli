# Opusify CLI

```
  ██████╗ ██████╗ ██╗   ██╗███████╗██╗███████╗██╗   ██╗
 ██╔═══██╗██╔══██╗██║   ██║██╔════╝██║██╔════╝╚██╗ ██╔╝
 ██║   ██║██████╔╝██║   ██║███████╗██║█████╗   ╚████╔╝
 ██║   ██║██╔═══╝ ██║   ██║╚════██║██║██╔══╝    ╚██╔╝
 ╚██████╔╝██║     ╚██████╔╝███████║██║██║        ██║
  ╚═════╝ ╚═╝      ╚═════╝ ╚══════╝╚═╝╚═╝        ╚═╝
```

**The Full-Stack Scaffold Engine — Generate production-ready apps with one command.**

---

## What is Opusify?

Opusify is a Full-Stack Scaffold Engine that dynamically generates tailored Next.js and Vite applications using Handlebars templates. It provides an interactive terminal wizard that walks you through selecting a project template, architecture, design system, and configuration options — then generates a fully configured, ready-to-run project in seconds.

Instead of spending hours wiring up boilerplate, you answer a few prompts and get a production-ready codebase with dependencies installed, styling configured, and (optionally) a Git repository initialized.

---

## Features

- Interactive CLI wizard powered by Inquirer.js
- 5 project templates: Portfolio, E-Commerce, School Management, SaaS Dashboard, Blog/Magazine
- 5 variant styles per template
- 8 design systems (Minimal Clean, Dark Terminal, Glassmorphism, Brutalist, and more)
- Dynamic dependency injection based on your choices
- Handlebars-powered template compilation
- Automatic `npm install` and optional `git init`
- Naming collision resolution (no accidental overwrites)

---

## Available Architectures

| Architecture | Value | Description |
|---|---|---|
| **Next.js 14 — App Router** | `nextjs-monolith` | Server Components, SSR/SSG, API routes. Recommended for most projects. |
| **Vite + React 18 — SPA** | `vite-react` | Fast HMR, client-side only. Best for dashboards and internal tools. |
| **Turborepo — Monorepo** | `nextjs-turborepo` | Multiple apps sharing a common design system. Enterprise-scale. |

---

## Prerequisites

- Node.js >= 18.0
- npm >= 9.0
- Git >= 2.30

---

## Local Development & Testing

Clone the repository and test the CLI locally:

```bash
# Clone the repo
git clone https://github.com/Ebyte-Lab/opusify-cli.git
cd opusify-cli

# Install dependencies
npm install

# Run the interactive wizard
node index.js
```

This launches the full wizard. Follow the prompts to generate a project in the current directory.

To link it globally for testing as a CLI command:

```bash
npm link
opusify create
```

---

## Quick Start (Published Package)

```bash
npx opusify create
```

---

## Project Structure

```
opusify-cli/
├── index.js              # CLI entry point (wizard prompts)
├── src/
│   ├── generate.js       # File generation engine
│   ├── dependencies.js   # Dynamic dependency resolver
│   └── security.js       # Security hardening (WIP)
├── templates/            # Handlebars-powered project templates
├── package.json
└── README.md
```

---

## How It Works

1. The wizard collects your configuration (template, architecture, design, nav count, etc.)
2. The engine resolves the template path (local in dev, GitHub via `tiged` in production)
3. Template files are copied and Handlebars tags (`{{projectName}}`, `{{design}}`, etc.) are compiled with your config
4. Dependencies are dynamically injected based on your design system and sidebar choices
5. `npm install` runs automatically
6. A Git repo is optionally initialized with an initial commit

---

## License

MIT © [Ebyte Soft Lab](https://github.com/Ebyte-Lab)
