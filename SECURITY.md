# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in Opusify CLI, please report it responsibly by emailing **security@ebytelab.com**. Do not open a public GitHub issue for security vulnerabilities.

We will acknowledge your report within 48 hours and provide a fix timeline.

---

## Supply Chain Security

Opusify CLI is designed to be lightweight (18KB published) with minimal dependencies. Below is our security posture regarding known alerts.

### Network Access

The CLI makes outbound network requests **only** to GitHub (via `giget`) to fetch project templates in production mode. No telemetry, analytics, or other network calls are made.

- **When:** Only when no local `templates/` folder exists (i.e., when installed via npm)
- **Where:** `https://github.com/Ebyte-Lab/opusify-templates`
- **Auth:** Optional GitHub token for private repos (never sent elsewhere)

In development mode (running from the cloned repo), no network requests are made — templates are copied from disk.

### Dynamic Code Execution (eval)

Socket.dev flags two packages for using dynamic code execution (`eval` or `new Function`). Both are **accepted risks** with documented justification:

| Package | Used By | Why It Uses eval | Risk Level | Justification |
|---------|---------|-----------------|------------|---------------|
| `uglify-js` | `handlebars` (optional dep) | JavaScript minification requires code parsing/generation | Low | Optional dependency; only used if templates are precompiled. Does not execute user input. |
| `ajv` | `eslint` (dev dependency) | JSON Schema validation compiles schemas to functions for performance | Low | Dev dependency only; not included in published package. Does not execute user input. |

**Neither package executes user-supplied input.** The `eval`/`new Function` usage is for internal compilation (template engine and schema validation), not for processing untrusted data.

### Deprecated Packages

Some transitive dependencies may be deprecated (e.g., old `glob` versions from `eslint@8`). These come from:
- `eslint@8` — Legacy version used as a dev dependency; upgrade to ESLint 9 flat config is planned

The previous `tiged` dependency (which pulled in most deprecated packages) has been replaced with `giget`.

### Dependency Audit

We run `npm audit` in CI on every pull request. High/critical vulnerabilities block merges.

To audit locally:
```bash
npm audit
```

---

## Security in Generated Projects

When users enable **Enterprise Security Hardening** (`enableSecurity: true`), generated projects include:

- **Zod environment validation** (`env.mjs`) — Validates all env vars at build time
- **CSP Headers** — Content-Security-Policy, X-Frame-Options, X-Content-Type-Options
- **`.gitignore`** — Prevents `.env` files from being committed
- **`.env.example`** — Documents required variables without exposing values

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x.x   | ✅ Active |
| < 1.0   | ❌ No     |
