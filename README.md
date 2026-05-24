# opusify-cli




### 🗺️ Opusify Master Development Roadmap

| Issue | Task / Title | Core Sub-Tasks | Required Before Starting | Phase |
| --- | --- | --- | --- | --- |
| **001** | **Make CLI Executable** | • Add `#!/usr/bin/env node` shebang.<br>

<br>• Add `"bin"` to `package.json`.<br>

<br>• Test global `npm link` execution. | *None* | CLI Config |
| **002** | **Core Documentation** | • Write `README.md` (installation, usage).<br>

<br>• Write `CONTRIBUTING.md` (Git rules). | *None* | CLI Config |
| **003** | **CI/CD & Code Quality** | • Configure ESLint & Prettier.<br>

<br>• Set up Husky pre-commit hooks.<br>

<br>• Create GitHub Actions `.yml` workflow. | **ISSUE-001** | CLI Config |
| **004** | **Enhance CLI UX** | • Implement `ora` terminal spinners.<br>

<br>• Catch `SIGINT` (Ctrl+C) gracefully. | *None* | CLI Polish |
| **005** | **Base Portfolio Template** | • Init Next.js 14 App Router.<br>

<br>• Inject `{{projectName}}` & `{{design}}`.<br>

<br>• Build base UI components. | *None* | Templates |
| **006** | **Base E-Commerce Template** | • Init Next.js 14 App Router.<br>

<br>• Build dynamic `[slug]` routing.<br>

<br>• Configure Handlebars sidebar logic. | *None* | Templates |
| **007** | **Dynamic Tailwind Themes** | • Map CSS variables in `globals.css`.<br>

<br>• Configure `tailwind.config.ts`.<br>

<br>• Wire up Glassmorphism & Dark Terminal. | **ISSUE-005, 006** | Templates |
| **008** | **Security & Dependencies** | • Implement Zod `env.mjs` validation.<br>

<br>• Use Handlebars to conditionally import `framer-motion`/`lucide-react`. | **ISSUE-005, 006, 007** | Templates |
| **009** | **Remaining Templates & Vite** | • Build School, SaaS, and Blog structures.<br>

<br>• Build Vite + React SPA architecture. | *None* (Can run in parallel) | Templates |

---

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

