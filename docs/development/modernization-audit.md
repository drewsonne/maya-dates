# Modernization Findings and Changes

## Step 0: GitHub Remote Check
- **Status**: GitHub API authentication unavailable, but git remote confirmed
- **Remote**: `git@github.com:drewsonne/maya-dates.git`
- **Current branch**: `feature/refactor`
- **Feature branches detected**: Multiple feature branches exist (reset-comment, western-to-lc, etc.)
- **Last release**: v1.2.3 (tag exists)
- **Action**: Proceed with modernization; feature branches may need rebasing after main changes

## Step 1: Repo Audit

### Public API Surface Map
**Entry point**: `src/index.ts` → `lib/index.js` (CommonJS)
**Module format**: CommonJS (target: es5, module: commonjs)
**Build output**: `lib/**` (JS + .d.ts + .map files)

**Exported APIs**:
- `FullDate` (default export)
- `Wildcard`, `isWildcard`
- `CalendarRound`, `getCalendarRound`
- `Haab`, `getHaab`
- `Tzolkin`, `getTzolkin`
- `LongCount`, `DistanceNumber`
- Factory classes: `LongCountFactory`, `CalendarRoundFactory`, `FullDateFactory`, `Factory`
- Operations: `CalendarRoundIterator`, `CalendarRoundWildcard`, `LongcountAddition`, `LongcountSubtraction`, `LongCountWildcard`, `FullDateWildcard`, `LongcountOperation`
- Guards: `isNumberPrimitive`, `isStringPrimitive`
- Components: Various CR components (coefficient, haabMonth, tzolkinDay, etc.)
- Structs: `HashMap`
- Comment system: `Comment`, `CommentWrapper`, `wrapsComment`

### Current State
- **Tests**: 291 passing (mocha + chai)
- **Build**: ✅ Compiles successfully
- **Type checking**: ✅ No errors
- **Published artifacts**: lib/** + decs.d.ts + package.json

## Step 2: Baseline Verification Results

### Test Results
- ✅ All 291 tests pass
- ⚠️ Warning: `MODULE_TYPELESS_PACKAGE_JSON` - suggests adding `"type": "module"` or fixing module detection

### Build Results
- ✅ `npm run build`: Success
- ✅ `npm run build:check`: Success

### Package Contents
- ✅ Correct files included: `lib/`, `decs.d.ts`
- ⚠️ Note: `decs.d.ts` is correct (not a typo)

## Step 3: Test Coverage & Functional Gaps

### Critical Issues Found
1. **P0**: `FullDate.equal()` throws "Not Implemented" - **BUG**
   - No tests for this method
   - Should compare `cr` and `lc` components

### Test Coverage Gaps (P0/P1/P2)

**P0 (Critical)**:
- `FullDate.equal()` - not implemented, no tests
- Error handling in factory parse methods - some tested, but edge cases missing
- Invalid input handling in constructors

**P1 (Important)**:
- `FullDate.isPartial()` - tested indirectly but not directly
- Comment system edge cases
- Wildcard matching edge cases

**P2 (Nice to have)**:
- Performance tests for large iterations
- Round-trip serialization tests

## Step 4: Node + Tooling Modernization

### Current Issues
- ❌ No Node version policy
- ❌ No `.nvmrc` file
- ❌ TypeScript in `dependencies` (should be `devDependencies`)
- ❌ `@types/node` pinned to `~17.0` (very old, Node 17 is EOL)
- ❌ TypeScript `~4.7` (should upgrade to 5.9.x)
- ❌ No test coverage script configured
- ❌ No CI configuration visible

### Planned Changes
- Add `engines`: `">=20.0.0 <25.0.0"`
- Add `.nvmrc` with Node 24
- Move TypeScript to devDependencies
- Upgrade TypeScript to 5.9.x
- Update `@types/node` to `~20.0.0` (supports 20/22/24)
- Add coverage script
- Update other dev dependencies as needed

## Step 5: TypeScript Idioms + Correctness

### Issues Found
- **20 uses of `any`** across 13 files
- **Type assertions** (`as`) in multiple files
- **Non-null assertions** (`!`) in some files
- **@ts-ignore** in `calendar-round.ts` line 29
- Guards use `any` instead of `unknown`

### Files Needing Fixes
- `src/wildcard.ts`: `isWildcard(token: any)` → `unknown`
- `src/guards.ts`: Both functions use `any` → `unknown`
- `src/comment-wrapper.ts`: `wrapsComment(o: any)` → `unknown`, return type `any` → proper type
- `src/cr/calendar-round.ts`: `@ts-ignore` on line 29
- Various operation files with `any` types

## Step 6: Packaging Sanity

### Current State
- ✅ `files` field includes correct paths
- ✅ `decs.d.ts` is correct (not a typo)
- ⚠️ No `exports` field (could improve Node compatibility but must not break existing imports)

## Step 7: Documentation

### Issues
- README examples may be outdated
- No Node version policy mentioned
- No coverage instructions
- Typedoc generation needs verification

## Step 8: Implementation Plan

Following order:
1. Node/tooling modernization (non-breaking)
2. TypeScript fixes (preserve API)
3. Add missing tests (especially FullDate.equal)
4. Packaging improvements
5. Documentation updates
6. Final verification

