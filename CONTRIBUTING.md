# Contributing to Opusify CLI

Thanks for your interest in contributing to Opusify! Whether you're from Ebyte Soft Lab or the open-source community, this guide covers everything you need to get started.

---

## Workflow

We follow a standard Fork/Clone → Branch → Pull Request workflow.

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/opusify-cli.git
cd opusify-cli
npm install
```

### 2. Create a Branch

Always branch off the latest `main`. Never push directly to `main`.

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

### 3. Make Your Changes

- Write clean, self-documenting code
- Test your changes by running `node index.js` and verifying the wizard completes without errors
- If you generated a project, confirm it runs with `cd <project-name> && npm run dev`

### 4. Commit Your Work

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add portfolio dark theme variant"
```

### 5. Push and Open a Pull Request

```bash
git push origin feat/your-feature-name
```

Then open a Pull Request on GitHub targeting the `main` branch. In your PR description:

- Describe what you changed and why
- Reference any related issues (e.g. `Closes #5`)

---

## Branch Naming Conventions

Use the following prefixes based on the type of work:

| Prefix | Use When |
|---|---|
| `feat/` | Adding a new feature or template |
| `bug/` | Fixing a bug |
| `chore/` | Maintenance tasks (docs, config, refactoring) |

**Examples:**

```
feat/portfolio-template
bug/fix-naming-collision
chore/update-readme
```

---

## Code Guidelines

- This project uses ES Modules (`"type": "module"` in package.json)
- Use `import`/`export` syntax, not `require`
- If editing Handlebars template files, escape React inline styles with a backslash (`\{{ marginTop: 0 }}`) to prevent Handlebars from parsing them

---

## Testing Your Changes

Before submitting a PR, verify:

1. `node index.js` runs the wizard without errors
2. The generated project folder is created with the correct structure
3. `npm run dev` works inside the generated project

---

## Questions?

Open an issue on GitHub or reach out to the Ebyte Soft Lab team. We're happy to help!
