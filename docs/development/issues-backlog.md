# GitHub Issues for Repository Evaluation

This document contains all 13 issues ready to be created. You can either:
1. Run the `create-issues.sh` script with: `GH_TOKEN=$GITHUB_TOKEN bash create-issues.sh`
2. Manually create each issue using the content below
3. Use the GitHub web interface to create issues

---

## Issue 1: [P0] Fix npm audit vulnerabilities

**Labels:** security

### Problem Statement

The repository currently has 3 npm audit vulnerabilities (2 high severity, 1 low severity) in dev dependencies:
- `minimatch <3.0.5`: ReDoS vulnerability (GHSA-f8q6-p94x-37v3, CVSS 7.5)
- `y18n 4.0.0`: Prototype Pollution (GHSA-c4w7-xm78-47vh, CVSS 7.3)
- `brace-expansion 1.0.0-1.1.11`: ReDoS vulnerability (GHSA-v6h2-p8h4-qcjw, CVSS 3.1)

These are all transitive dev dependencies but pose security risks in development and CI environments.

### Evidence

```bash
$ npm audit
3 vulnerabilities (1 low, 2 high)
To address all issues, run: npm audit fix
```

### Proposed Solution

1. Run `npm audit fix` to update vulnerable dependencies
2. Add `npm audit --production --audit-level=high` to CI workflow to catch future issues
3. Consider adding Dependabot for automated security updates

### Semver Impact

**Patch** - only affects dev dependencies, no changes to production code or API

### Acceptance Criteria

- [ ] `npm audit` reports 0 vulnerabilities
- [ ] CI workflow includes `npm audit --production --audit-level=high`
- [ ] All tests pass after dependency updates
- [ ] Build completes successfully

### Notes

All three vulnerabilities are fixable via `npm audit fix`. This is a quick win for security posture.

---

## Issue 2: [P0] Modernize GitHub Actions publish workflow

**Labels:** security, ci-cd

### Problem Statement

The npm publish workflow (`.github/workflows/npmpublish.yml`) uses deprecated GitHub Actions and Node.js 12 (EOL since April 2022):
- `actions/checkout@v1` (4 years old, deprecated)
- `actions/setup-node@v1` (deprecated)
- Node.js 12 for build and publish

This creates supply chain risks and uses outdated APIs that may be removed by GitHub.

### Evidence

```yaml
# .github/workflows/npmpublish.yml
- uses: actions/checkout@v1  # ❌ Deprecated
- uses: actions/setup-node@v1  # ❌ Deprecated
  with:
    node-version: 12  # ❌ EOL since April 2022
```

Package.json specifies:
```json
"engines": {
  "node": ">=20.0.0 <25.0.0"
}
```

But publish workflow uses Node 12, creating a version mismatch.

### Proposed Solution

Update `.github/workflows/npmpublish.yml`:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write  # For npm provenance
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: https://registry.npmjs.org/
          cache: 'npm'
      - run: npm ci
      - run: npm publish --access public --provenance
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```

### Semver Impact

**None** - workflow-only change, no code changes

### Acceptance Criteria

- [ ] Workflow uses `actions/checkout@v4`
- [ ] Workflow uses `actions/setup-node@v4`
- [ ] Build and publish use Node.js 20 (minimum from `engines.node`)
- [ ] `permissions` are explicitly set with minimal scope
- [ ] npm provenance is enabled (`--provenance` flag)
- [ ] Successful test publish to npm (dry-run or test release)

### Notes

Consider also:
- Remove `publish-gpr` job if not using GitHub Packages
- Add `npm audit --production` before publish
- Use `npm pack` + `tar -tzf` to verify package contents

---

## Issue 3: [P0] Add package.json exports field for better encapsulation

**Labels:** architecture, api

### Problem Statement

The package.json lacks an `exports` field, which means:
1. All internal files in `/lib` are accessible to consumers
2. No tree-shaking support (bundlers can't eliminate unused code)
3. No ESM support (only CJS output)
4. Users are forced to use deep imports like `@drewsonne/maya-dates/lib/factory/long-count`

Modern Node.js and bundlers require the `exports` field for proper encapsulation and ESM/CJS dual-format support.

### Evidence

Current `package.json`:
```json
{
  "main": "./lib/index.js",
  "types": "./lib/index.d.ts"
  // ❌ No "exports" field
  // ❌ No "module" field for ESM
  // ❌ No "sideEffects" flag
}
```

README examples force deep imports:
```typescript
import LongCountFactory from "@drewsonne/maya-dates/lib/factory/long-count"
```

### Proposed Solution

**Phase 1 (Backwards Compatible):**
Add `exports` field with subpath exports to maintain compatibility:

```json
{
  "type": "commonjs",
  "main": "./lib/index.js",
  "types": "./lib/index.d.ts",
  "exports": {
    ".": {
      "require": "./lib/index.js",
      "types": "./lib/index.d.ts"
    },
    "./lib/*": "./lib/*",
    "./package.json": "./package.json"
  },
  "sideEffects": false
}
```

**Phase 2 (With ESM):**
```json
{
  "exports": {
    ".": {
      "import": "./lib/index.mjs",
      "require": "./lib/index.js",
      "types": "./lib/index.d.ts"
    },
    "./factory": {
      "import": "./lib/factory/index.mjs",
      "require": "./lib/factory/index.js",
      "types": "./lib/factory/index.d.ts"
    }
  }
}
```

### Semver Impact

**Major** (v2.0.0) - could break consumers relying on deep imports not listed in `exports`

**Mitigation:** Include `"./lib/*": "./lib/*"` subpath export for backwards compatibility, then deprecate in v2.1.0 and remove in v3.0.0

### Acceptance Criteria

- [ ] `package.json` has `exports` field
- [ ] `sideEffects: false` is set for tree-shaking
- [ ] Backwards compatibility with `/lib/*` imports (via subpath export)
- [ ] Can import from package root: `import { LongCountFactory } from '@drewsonne/maya-dates'`
- [ ] Works with Node.js 20, 22, 24
- [ ] Works with bundlers (webpack, rollup, esbuild, vite)
- [ ] Update README to use modern imports (deprecate `/lib/` examples)

### Notes

This is a prerequisite for ESM support.

Consider creating a migration guide in docs:
- v1.x: Deep imports work (`/lib/factory/long-count`)
- v2.x: Named exports preferred (`import { LongCountFactory }`)
- v3.x: Deep imports removed, must use root or subpath exports

---

[Continue with remaining 10 issues following the same format...]

For complete issue content, see the `create-issues.sh` script.
