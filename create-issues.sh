#!/bin/bash
# Script to create GitHub issues for repository evaluation
# Run with: GH_TOKEN=$GITHUB_TOKEN bash create-issues.sh

set -e

echo "Creating 13 GitHub issues for repository evaluation..."
echo ""

# Issue 1: [P0] Fix npm audit vulnerabilities
echo "Creating issue 1/13: [P0] Fix npm audit vulnerabilities"
gh issue create \
  --title "[P0] Fix npm audit vulnerabilities" \
  --label "security" \
  --body "## Problem Statement

The repository currently has 3 npm audit vulnerabilities (2 high severity, 1 low severity) in dev dependencies:
- \`minimatch <3.0.5\`: ReDoS vulnerability (GHSA-f8q6-p94x-37v3, CVSS 7.5)
- \`y18n 4.0.0\`: Prototype Pollution (GHSA-c4w7-xm78-47vh, CVSS 7.3)
- \`brace-expansion 1.0.0-1.1.11\`: ReDoS vulnerability (GHSA-v6h2-p8h4-qcjw, CVSS 3.1)

These are all transitive dev dependencies but pose security risks in development and CI environments.

## Evidence

\`\`\`bash
$ npm audit
3 vulnerabilities (1 low, 2 high)
To address all issues, run: npm audit fix
\`\`\`

## Proposed Solution

1. Run \`npm audit fix\` to update vulnerable dependencies
2. Add \`npm audit --production --audit-level=high\` to CI workflow to catch future issues
3. Consider adding Dependabot for automated security updates

## Semver Impact

**Patch** - only affects dev dependencies, no changes to production code or API

## Acceptance Criteria

- [ ] \`npm audit\` reports 0 vulnerabilities
- [ ] CI workflow includes \`npm audit --production --audit-level=high\`
- [ ] All tests pass after dependency updates
- [ ] Build completes successfully

## Notes

All three vulnerabilities are fixable via \`npm audit fix\`. This is a quick win for security posture."

echo ""

# Issue 2: [P0] Modernize GitHub Actions publish workflow
echo "Creating issue 2/13: [P0] Modernize GitHub Actions publish workflow"
gh issue create \
  --title "[P0] Modernize GitHub Actions publish workflow" \
  --label "security,ci-cd" \
  --body "## Problem Statement

The npm publish workflow (\`.github/workflows/npmpublish.yml\`) uses deprecated GitHub Actions and Node.js 12 (EOL since April 2022):
- \`actions/checkout@v1\` (4 years old, deprecated)
- \`actions/setup-node@v1\` (deprecated)
- Node.js 12 for build and publish

This creates supply chain risks and uses outdated APIs that may be removed by GitHub.

## Evidence

\`\`\`yaml
# .github/workflows/npmpublish.yml
- uses: actions/checkout@v1  # ❌ Deprecated
- uses: actions/setup-node@v1  # ❌ Deprecated
  with:
    node-version: 12  # ❌ EOL since April 2022
\`\`\`

Package.json specifies:
\`\`\`json
\"engines\": {
  \"node\": \">=20.0.0 <25.0.0\"
}
\`\`\`

But publish workflow uses Node 12, creating a version mismatch.

## Proposed Solution

Update \`.github/workflows/npmpublish.yml\`:

\`\`\`yaml
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
          NODE_AUTH_TOKEN: \${{secrets.npm_token}}
\`\`\`

## Semver Impact

**None** - workflow-only change, no code changes

## Acceptance Criteria

- [ ] Workflow uses \`actions/checkout@v4\`
- [ ] Workflow uses \`actions/setup-node@v4\`
- [ ] Build and publish use Node.js 20 (minimum from \`engines.node\`)
- [ ] \`permissions\` are explicitly set with minimal scope
- [ ] npm provenance is enabled (\`--provenance\` flag)
- [ ] Successful test publish to npm (dry-run or test release)

## Notes

Consider also:
- Remove \`publish-gpr\` job if not using GitHub Packages
- Add \`npm audit --production\` before publish
- Use \`npm pack\` + \`tar -tzf\` to verify package contents"

echo ""

# Issue 3: [P0] Add package.json exports field for better encapsulation
echo "Creating issue 3/13: [P0] Add package.json exports field"
gh issue create \
  --title "[P0] Add package.json exports field for better encapsulation" \
  --label "architecture,api" \
  --body "## Problem Statement

The package.json lacks an \`exports\` field, which means:
1. All internal files in \`/lib\` are accessible to consumers
2. No tree-shaking support (bundlers can't eliminate unused code)
3. No ESM support (only CJS output)
4. Users are forced to use deep imports like \`@drewsonne/maya-dates/lib/factory/long-count\`

Modern Node.js and bundlers require the \`exports\` field for proper encapsulation and ESM/CJS dual-format support.

## Evidence

Current \`package.json\`:
\`\`\`json
{
  \"main\": \"./lib/index.js\",
  \"types\": \"./lib/index.d.ts\"
  // ❌ No \"exports\" field
  // ❌ No \"module\" field for ESM
  // ❌ No \"sideEffects\" flag
}
\`\`\`

README examples force deep imports:
\`\`\`typescript
import LongCountFactory from \"@drewsonne/maya-dates/lib/factory/long-count\"
\`\`\`

## Proposed Solution

**Phase 1 (Backwards Compatible):**
Add \`exports\` field with subpath exports to maintain compatibility:

\`\`\`json
{
  \"type\": \"commonjs\",
  \"main\": \"./lib/index.js\",
  \"types\": \"./lib/index.d.ts\",
  \"exports\": {
    \".\": {
      \"require\": \"./lib/index.js\",
      \"types\": \"./lib/index.d.ts\"
    },
    \"./lib/*\": \"./lib/*\",
    \"./package.json\": \"./package.json\"
  },
  \"sideEffects\": false
}
\`\`\`

**Phase 2 (With ESM - see issue about ESM support):**
\`\`\`json
{
  \"exports\": {
    \".\": {
      \"import\": \"./lib/index.mjs\",
      \"require\": \"./lib/index.js\",
      \"types\": \"./lib/index.d.ts\"
    },
    \"./factory\": {
      \"import\": \"./lib/factory/index.mjs\",
      \"require\": \"./lib/factory/index.js\",
      \"types\": \"./lib/factory/index.d.ts\"
    }
  }
}
\`\`\`

## Semver Impact

**Major** (v2.0.0) - could break consumers relying on deep imports not listed in \`exports\`

**Mitigation:** Include \`\"./lib/*\": \"./lib/*\"\` subpath export for backwards compatibility, then deprecate in v2.1.0 and remove in v3.0.0

## Acceptance Criteria

- [ ] \`package.json\` has \`exports\` field
- [ ] \`sideEffects: false\` is set for tree-shaking
- [ ] Backwards compatibility with \`/lib/*\` imports (via subpath export)
- [ ] Can import from package root: \`import { LongCountFactory } from '@drewsonne/maya-dates'\`
- [ ] Works with Node.js 20, 22, 24
- [ ] Works with bundlers (webpack, rollup, esbuild, vite)
- [ ] Update README to use modern imports (deprecate \`/lib/\` examples)

## Notes

This is a prerequisite for ESM support.

Consider creating a migration guide in docs:
- v1.x: Deep imports work (\`/lib/factory/long-count\`)
- v2.x: Named exports preferred (\`import { LongCountFactory }\`)
- v3.x: Deep imports removed, must use root or subpath exports"

echo ""

# Issue 4: [P1] Add named exports to index.ts for idiomatic imports
echo "Creating issue 4/13: [P1] Add named exports to index.ts"
gh issue create \
  --title "[P1] Add named exports to index.ts for idiomatic imports" \
  --label "api" \
  --body "## Problem Statement

The main \`src/index.ts\` uses barrel exports (\`export * from ...\`) which:
1. Doesn't expose factory classes by name
2. Forces users to use deep imports like \`@drewsonne/maya-dates/lib/factory/long-count\`
3. Prevents tree-shaking (bundlers can't determine what's used)
4. Makes API discovery difficult (no autocomplete for imports)

This is non-idiomatic for modern TypeScript libraries.

## Evidence

Current \`src/index.ts\`:
\`\`\`typescript
export * from './comment';
export * from './comment-wrapper';
export * from './guards';
export * from './i-part';
export * from './wildcard';

export { default as FullDate } from './full-date';

export * from './cr';
export * from './lc';
export * from './factory';
export * from './operations';
export * from './structs';
\`\`\`

This exports all named exports from each module, but doesn't expose:
- \`LongCountFactory\`, \`CalendarRoundFactory\`, \`FullDateFactory\`
- \`LongCount\` class
- \`getCalendarRound\`, \`getTzolkin\`, \`getHaab\` factory functions

README workaround:
\`\`\`typescript
import LongCountFactory from \"@drewsonne/maya-dates/lib/factory/long-count\"
\`\`\`

## Proposed Solution

Update \`src/index.ts\` to explicitly export public API:

\`\`\`typescript
// Core classes
export { default as FullDate } from './full-date'
export { default as LongCount } from './lc/long-count'
export { default as DistanceNumber } from './lc/distance-number'

// Calendar Round
export { 
  CalendarRound, 
  getCalendarRound,
  origin as calendarRoundOrigin 
} from './cr/calendar-round'
export { Tzolkin, getTzolkin } from './cr/tzolkin'
export { Haab, getHaab } from './cr/haab'

// Factories
export { default as LongCountFactory } from './factory/long-count'
export { default as CalendarRoundFactory } from './factory/calendar-round'
export { default as FullDateFactory } from './factory/full-date'
export { default as GregorianFactory } from './factory/gregorian'

// Western calendars
export { default as GregorianCalendarDate } from './lc/western/gregorian'
export { default as JulianCalendarDate } from './lc/western/julian'

// Operations
export { default as LongcountAddition } from './operations/longcount-addition'
export { default as LongcountSubtraction } from './operations/longcount-subtraction'
export { default as LongCountWildcard } from './operations/longcount-wildcard'
export { default as CalendarRoundWildcard } from './operations/calendar-round-wildcard'
export { default as FullDateWildcard } from './operations/fulldate-wildcard'

// Utilities
export { Wildcard, isWildcard } from './wildcard'
export { Comment } from './comment'
export type { IPart } from './i-part'
export { isLongCount } from './guards'

// Components (keep barrel exports for these)
export * from './cr/component'
export { HashMap } from './structs'
\`\`\`

This allows:
\`\`\`typescript
import { 
  LongCountFactory, 
  CalendarRoundFactory,
  Wildcard, 
  isWildcard 
} from '@drewsonne/maya-dates'
\`\`\`

## Semver Impact

**Minor** - adds new named exports, backwards compatible with existing barrel exports

## Acceptance Criteria

- [ ] All factory classes are exported by name from root
- [ ] Core classes (\`LongCount\`, \`FullDate\`, \`CalendarRound\`) are exported
- [ ] Western calendar classes are exported
- [ ] Operation classes are exported
- [ ] Can import \`{ LongCountFactory }\` from package root
- [ ] Existing code using barrel exports still works
- [ ] TypeScript autocomplete shows all available exports
- [ ] Update README examples

## Notes

This is a prerequisite for the exports field and README updates.

Consider creating an API documentation page showing all available exports grouped by category."

echo ""

# Issue 5: [P1] Add comprehensive error handling tests
echo "Creating issue 5/13: [P1] Add comprehensive error handling tests"
gh issue create \
  --title "[P1] Add comprehensive error handling tests" \
  --label "tests,quality" \
  --body "## Problem Statement

The factory classes throw errors for invalid inputs, but there are no tests verifying:
1. Error messages are helpful
2. Edge cases are handled correctly
3. Invalid formats are rejected consistently
4. Out-of-range values are caught

This creates risk of unhandled errors in production and makes it unclear what inputs are valid.

## Evidence

Factory code throws errors but no tests exist:
- \`src/factory/long-count.ts\`: \"Could not match Long Count\"
- \`src/factory/calendar-round.ts\`: \"Calendar Round does not have enough components\"
- \`src/cr/calendar-round.ts\`: \"should have Haab coeff in...\"

No negative test cases exist in \`src/__tests__/\`.

## Proposed Solution

Add comprehensive error handling tests covering:
- Empty string, null, undefined inputs
- Invalid format strings
- Out-of-range values
- Invalid component names
- Calendar Round validation rules
- Special characters and injection attempts

## Semver Impact

**None** - test-only changes

## Acceptance Criteria

- [ ] At least 20 negative test cases across all factories
- [ ] Tests cover: empty input, null, undefined, malformed strings
- [ ] Tests verify error messages are helpful
- [ ] Tests cover out-of-range values
- [ ] Tests cover invalid component names (Tzolkin days, Haab months)
- [ ] Tests cover Calendar Round validation rules
- [ ] All new tests pass
- [ ] Code coverage increases by at least 5%

## Notes

Consider improving error messages to include examples of valid input."

echo ""

# Issue 6: [P1] Update README with modern import examples
echo "Creating issue 6/13: [P1] Update README with modern import examples"
gh issue create \
  --title "[P1] Update README with modern import examples" \
  --label "documentation" \
  --body "## Problem Statement

The README shows non-idiomatic deep import examples that:
1. Require knowledge of internal directory structure
2. Don't work with bundler tree-shaking
3. Are verbose and error-prone
4. Will break if package structure changes

Current examples:
\`\`\`typescript
import LongCountFactory from \"@drewsonne/maya-dates/lib/factory/long-count\";
import {Wildcard, isWildcard} from \"@drewsonne/maya-dates/lib/wildcard\"
\`\`\`

This is not standard practice for modern npm packages.

## Proposed Solution

Update README to show modern imports (after named exports are added):

**Before:**
\`\`\`typescript
import LongCountFactory from \"@drewsonne/maya-dates/lib/factory/long-count\";
\`\`\`

**After:**
\`\`\`typescript
import { LongCountFactory } from '@drewsonne/maya-dates'
\`\`\`

Also add:
- Table of contents
- \"Common Patterns\" section
- Gregorian → Long Count example (addresses issue #15)
- Migration guide section

## Semver Impact

**None** - documentation-only change

## Acceptance Criteria

- [ ] All README examples use root imports
- [ ] No examples show \`/lib/\` paths
- [ ] Add \"Migration\" section for users upgrading from v1.x
- [ ] Examples are verified to work
- [ ] Add example for Gregorian → Long Count conversion
- [ ] Add table of contents
- [ ] Add \"Common Patterns\" section

## Notes

Depends on the named exports issue being completed first.

Consider adding a dedicated \`/examples\` directory with runnable scripts."

echo ""

# Issue 7: [P1] Add ESM build support
echo "Creating issue 7/13: [P1] Add ESM build support"
gh issue create \
  --title "[P1] Add ESM build support" \
  --label "architecture,modernization" \
  --body "## Problem Statement

The library only outputs CommonJS (CJS), which:
1. Prevents tree-shaking in modern bundlers (webpack, rollup, vite)
2. Doesn't work with \`\"type\": \"module\"\` Node.js projects
3. Increases bundle size for web applications
4. Is not the recommended format for 2026+ libraries

Modern best practice is to ship dual CJS/ESM builds.

## Evidence

Current build setup:
\`\`\`json
// tsconfig.json
{
  \"compilerOptions\": {
    \"module\": \"commonjs\",  // ❌ CJS only
    \"target\": \"es5\"
  }
}
\`\`\`

Output files are \`.js\` (CJS) only.

## Proposed Solution

**Option A: Dual build with TSC + esbuild (Recommended)**

\`\`\`json
{
  \"scripts\": {
    \"build\": \"npm run build:cjs && npm run build:esm\",
    \"build:cjs\": \"tsc -p tsconfig.json\",
    \"build:esm\": \"esbuild src/index.ts --bundle --platform=node --format=esm --outfile=lib/index.mjs --external:moonbeams\"
  }
}
\`\`\`

**Option B: Use tsup (Simpler)**

\`\`\`json
{
  \"scripts\": {
    \"build\": \"tsup src/index.ts --format cjs,esm --dts --clean\"
  }
}
\`\`\`

## Semver Impact

**Minor** - adds new output format, backwards compatible

## Acceptance Criteria

- [ ] Build outputs both \`.js\` (CJS) and \`.mjs\` (ESM)
- [ ] \`.d.ts\` files work with both formats
- [ ] \`package.json\` has \`exports\` field with \`import\`/\`require\` conditions
- [ ] \`sideEffects: false\` is set
- [ ] Works in Node.js with \`\"type\": \"module\"\`
- [ ] Works in Node.js with default CJS
- [ ] Works with bundlers (webpack, rollup, vite, esbuild)
- [ ] All tests pass when importing ESM build
- [ ] Published package is tested

## Notes

Depends on the exports field issue.

Consider using \`publint\` and \`@arethetypeswrong/cli\` to validate package."

echo ""

# Issue 8: [P2] Add wildcard expansion safety guard
echo "Creating issue 8/13: [P2] Add wildcard expansion safety guard"
gh issue create \
  --title "[P2] Add wildcard expansion safety guard" \
  --label "performance,safety" \
  --body "## Problem Statement

The wildcard expansion operations can generate large arrays (up to 18,980 elements for a full CR wildcard), but there's no guard against runaway memory usage or accidental infinite loops.

While current implementation is bounded by calendar cycles, there's no explicit protection against accidentally creating massive result sets.

## Evidence

\`\`\`typescript
// src/operations/fulldate-wildcard.ts:28
run(): FullDate[] {
  // ... could be 18,980 elements, no size check
}
\`\`\`

## Proposed Solution

Add a configurable size limit with a reasonable default:

\`\`\`typescript
export const DEFAULT_MAX_WILDCARD_RESULTS = 20_000

export default class FullDateWildcard extends CommentWrapper implements IPart {
  private maxResults: number = DEFAULT_MAX_WILDCARD_RESULTS

  constructor(partialDate: FullDate, maxResults?: number) {
    super()
    this.fullDate = partialDate
    if (maxResults !== undefined) {
      this.maxResults = maxResults
    }
  }

  run(): FullDate[] {
    // ... existing logic ...
    
    if (results.length > this.maxResults) {
      throw new Error(
        \`Wildcard expansion would generate \${results.length} results, \` +
        \`which exceeds the maximum of \${this.maxResults}. \` +
        \`Provide a more specific pattern or increase maxResults.\`
      )
    }
    
    return results
  }
}
\`\`\`

## Semver Impact

**Patch** - improves error handling, doesn't change existing behavior for normal use cases

## Acceptance Criteria

- [ ] Wildcard operations have configurable \`maxResults\` parameter
- [ ] Default limit is 20,000
- [ ] Throws helpful error when limit exceeded
- [ ] Tests verify limit is enforced
- [ ] Tests verify limit can be increased
- [ ] Performance is not degraded
- [ ] Update documentation to mention limit

## Notes

Consider also adding an \`estimateResultCount()\` method."

echo ""

# Issue 9: [P2] Add benchmark suite
echo "Creating issue 9/13: [P2] Add benchmark suite"
gh issue create \
  --title "[P2] Add benchmark suite" \
  --label "performance,testing" \
  --body "## Problem Statement

The library has no performance benchmarks, making it impossible to:
1. Detect performance regressions in PRs
2. Optimize hot paths with confidence
3. Compare implementation approaches
4. Communicate performance characteristics to users

## Evidence

No benchmark files exist and no performance testing in CI.

Performance-sensitive code paths identified:
1. Factory parsing (regex + string splitting)
2. Wildcard expansion (can generate 18k+ results)
3. LC ↔ Gregorian conversion
4. Singleton lookup vs creation

## Proposed Solution

Use \`tinybench\` (lightweight, accurate):

\`\`\`typescript
// bench/factory-parsing.bench.ts
import { bench, run } from 'tinybench'
import LongCountFactory from '../src/factory/long-count'

const lcFactory = new LongCountFactory()

bench('Parse Long Count (simple)', () => {
  lcFactory.parse('9.17.0.0.0')
})

await run()
\`\`\`

## Semver Impact

**None** - testing infrastructure only

## Acceptance Criteria

- [ ] Benchmark suite covers: factory parsing, wildcard expansion, conversions, singleton lookup
- [ ] Benchmarks run locally with \`npm run bench\`
- [ ] Results show ops/sec and relative performance
- [ ] README links to benchmark results
- [ ] (Optional) CI runs benchmarks on releases

## Notes

Consider storing baseline results for regression detection."

echo ""

# Issue 10: [P2] Add property-based tests for invariants
echo "Creating issue 10/13: [P2] Add property-based tests for invariants"
gh issue create \
  --title "[P2] Add property-based tests for invariants" \
  --label "tests,quality" \
  --body "## Problem Statement

The test suite has good coverage (369 tests) but uses only example-based testing. This misses:
1. Edge cases not thought of by test authors
2. Invariants that should hold for ALL inputs
3. Roundtrip properties (LC → Gregorian → LC should be identity)
4. Mathematical properties (addition inverse, commutativity, etc.)

Property-based testing would catch bugs that example tests miss.

## Evidence

All tests use explicit examples. No use of property-based testing frameworks.

Critical invariants not tested:
1. Roundtrip: \`LC → Gregorian → LC === LC\`
2. Inverse: \`lc.add(dn).subtract(dn) === lc\`
3. Associativity: \`(a + b) + c === a + (b + c)\`
4. Calendar cycles: CR repeats every 18,980 days
5. Wildcard expansion: All results match original pattern

## Proposed Solution

Use \`fast-check\`:

\`\`\`typescript
import fc from 'fast-check'

it('LC → Gregorian → LC roundtrip', () => {
  fc.assert(fc.property(
    fc.integer({ min: 0, max: 2_000_000 }), // Maya Day Number
    (mdn) => {
      const lc1 = LongCount.fromPosition(mdn)
      const greg = lc1.gregorian
      const lc2 = LongCount.fromGregorian(greg)
      return lc1.equal(lc2)
    }
  ), { numRuns: 1000 })
})
\`\`\`

## Semver Impact

**None** - test-only changes

## Acceptance Criteria

- [ ] Property-based tests for: roundtrip conversions, arithmetic inverse, associativity, calendar cycles, wildcard expansion
- [ ] Tests run at least 100 iterations per property
- [ ] Tests integrated into main test suite
- [ ] CI runs property tests
- [ ] Add README section explaining property-based testing approach

## Notes

Property-based testing is particularly valuable for date arithmetic and calendar conversions."

echo ""

# Issue 11: [P2] Remove @ts-ignore comment in calendar-round.ts
echo "Creating issue 11/13: [P2] Remove @ts-ignore comment"
gh issue create \
  --title "[P2] Remove @ts-ignore comment in calendar-round.ts" \
  --label "code-quality,typescript" \
  --body "## Problem Statement

There is one \`@ts-ignore\` comment in the codebase at \`src/cr/calendar-round.ts:29\`. This:
1. Disables type checking, hiding potential bugs
2. Violates the \`strict: true\` TypeScript configuration
3. Makes the code less maintainable
4. Is a code smell indicating unclear types or incorrect usage

## Evidence

\`\`\`typescript
// src/cr/calendar-round.ts:29
// @ts-ignore
/**
 * A combination of 260-day cycles and the Haab cycle...
 */
export class CalendarRound extends CommentWrapper implements IPart {
\`\`\`

## Proposed Solution

Investigation needed to determine what the \`@ts-ignore\` is suppressing, then:

1. If it's a JSDoc warning: Fix the JSDoc format
2. If it's a \"class should not be instantiated\" warning: Make constructor private
3. If it's a type error: Fix the underlying type issue

## Semver Impact

**Patch** - code cleanup, no API changes

## Acceptance Criteria

- [ ] \`@ts-ignore\` comment is removed
- [ ] \`npm run build:check\` passes without warnings
- [ ] All tests pass
- [ ] No new type errors introduced
- [ ] Add linting rule to prevent future \`@ts-ignore\` usage

## Notes

After fixing, add a CI check to prevent \`@ts-ignore\` from being reintroduced."

echo ""

# Issue 12: [P2] Add Dependabot configuration
echo "Creating issue 12/13: [P2] Add Dependabot configuration"
gh issue create \
  --title "[P2] Add Dependabot configuration" \
  --label "security,ci-cd" \
  --body "## Problem Statement

The repository has no automated dependency update mechanism. This means:
1. Security vulnerabilities in dependencies are not automatically detected
2. Dependencies drift out of date, making updates riskier
3. Maintainer must manually check for updates
4. Miss out on bug fixes and performance improvements

## Evidence

No \`.github/dependabot.yml\` file exists.

Recent dependencies are outdated:
- \`@babel/preset-env@7.16.x\` (current: 7.26.x)
- \`typescript@5.9.x\` (current: 5.7.x)

## Proposed Solution

Create \`.github/dependabot.yml\`:

\`\`\`yaml
version: 2
updates:
  - package-ecosystem: \"npm\"
    directory: \"/\"
    schedule:
      interval: \"weekly\"
    open-pull-requests-limit: 5
    groups:
      dev-dependencies:
        patterns:
          - \"@types/*\"
          - \"@babel/*\"
          - \"typescript\"
        update-types:
          - \"minor\"
          - \"patch\"
    ignore:
      - dependency-name: \"*\"
        update-types: [\"version-update:semver-major\"]

  - package-ecosystem: \"github-actions\"
    directory: \"/\"
    schedule:
      interval: \"weekly\"
\`\`\`

## Semver Impact

**None** - CI/automation only

## Acceptance Criteria

- [ ] \`.github/dependabot.yml\` is created
- [ ] Dependabot monitors npm dependencies
- [ ] Dependabot monitors GitHub Actions
- [ ] PRs are grouped (dev deps together)
- [ ] Security updates are enabled
- [ ] Major version updates are ignored
- [ ] First Dependabot PR appears within 1 week

## Notes

Dependabot is free for public repos and catches security vulnerabilities within hours."

echo ""

# Issue 13: [P1] Document Gregorian to Long Count conversion API
echo "Creating issue 13/13: [P1] Document Gregorian to Long Count conversion"
gh issue create \
  --title "[P1] Document Gregorian to Long Count conversion API" \
  --label "documentation,enhancement" \
  --body "## Problem Statement

Issue #15 asks for Gregorian → Long Count conversion, but this functionality may already exist. If it exists, it's not documented in README. If it doesn't exist, it should be added.

Current README only shows:
- Long Count → Gregorian: ✅ Documented (\`lc.gregorian\`)
- Gregorian → Long Count: ❓ Not documented

## Evidence

README shows LC → Gregorian:
\`\`\`typescript
let lc = new LongCountFactory().parse('9.17.0.0.0');
console.log(lc.gregorian); // GregorianCalendarDate
\`\`\`

But no example of Gregorian → LC.

Issue #15 (from VitalyChe, Aug 2020):
> Is there any way to convert Gregorian to Maya LC?

## Proposed Solution

**Step 1: Investigate existing functionality**

Check if conversion exists in:
- \`src/factory/gregorian.ts\`
- \`src/lc/western/gregorian.ts\`
- \`src/lc/long-count.ts\`

**Step 2a: If functionality exists**

Add to README and create tests.

**Step 2b: If functionality doesn't exist**

Implement static factory methods:

\`\`\`typescript
// src/lc/long-count.ts
export default class LongCount extends DistanceNumber {
  static fromGregorian(
    gregorian: GregorianCalendarDate,
    correlation: CorrelationConstant = getCorrelationConstant(584283)
  ): LongCount {
    const julianDay = gregorian.toJulianDay()
    return LongCount.fromJulianDay(julianDay, correlation)
  }

  static fromJulianDay(
    julianDay: number,
    correlation: CorrelationConstant = getCorrelationConstant(584283)
  ): LongCount {
    const mayanDayNumber = julianDay - correlation.value
    return LongCount.fromPosition(mayanDayNumber)
  }

  static fromPosition(position: number): LongCount {
    // Convert position to [kin, winal, tun, katun, baktun]
    if (position < 0) {
      throw new Error('Maya Day Number must be non-negative')
    }

    const kin = position % 20
    const winal = Math.floor(position / 20) % 18
    const tun = Math.floor(position / (20 * 18)) % 20
    const katun = Math.floor(position / (20 * 18 * 20)) % 20
    const baktun = Math.floor(position / (20 * 18 * 20 * 20))

    return new LongCount(kin, winal, tun, katun, baktun)
  }
}
\`\`\`

## Semver Impact

- **None** if only documenting existing functionality
- **Minor** if adding new static factory methods (backwards compatible)

## Acceptance Criteria

- [ ] Functionality is verified or implemented
- [ ] README has \"Gregorian to Long Count\" section with example
- [ ] At least 3 test cases for conversion
- [ ] Roundtrip test (LC → Greg → LC === LC)
- [ ] TypeDoc comments explain parameters
- [ ] Error handling for invalid dates
- [ ] Close or reference issue #15

## Notes

This is a common use case for historical date analysis and astronomy. Consider also adding convenience methods for parsing Gregorian strings directly."

echo ""
echo "✅ All 13 issues created successfully!"
echo ""
echo "Issues created:"
echo "  P0: 1-3 (Security & Critical)"
echo "  P1: 4-7, 13 (API & Architecture)"
echo "  P2: 8-12 (Performance & Polish)"
