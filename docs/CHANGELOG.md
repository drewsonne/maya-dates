# Changelog

## [Unreleased] - Modernization Update

### Added
- **Node.js support policy**: Added `engines` field specifying Node 20/22/24 support
- **`.nvmrc` file**: Added for Node 24 development environment
- **Test coverage script**: Added `npm run test:coverage` command
- **FullDate equality tests**: Added comprehensive tests for `FullDate.equal()` method
- **FullDate.isPartial() tests**: Added direct tests for partial date detection

### Fixed
- **Critical bug**: Implemented `FullDate.equal()` method (was throwing "Not Implemented")
  - Now properly compares both Calendar Round and Long Count components
  - Handles wildcard dates correctly
- **TypeScript type safety**: Replaced `any` with `unknown` in type guards and interfaces
  - `isWildcard()`, `isComment()`, `isPart()`, `wrapsComment()` now use `unknown`
  - `IPart.equal()` signature updated to accept `unknown`
  - Improved type safety in `CommentWrapper` methods
- **Type errors**: Fixed TypeScript compilation errors in `cycle.ts` and `haabMonth.ts`
  - Added proper undefined checks in Cycle constructor
  - Added type narrowing in HaabMonth validation

### Changed
- **TypeScript upgrade**: Moved from `~4.7` to `~5.9.0` (devDependency)
- **@types/node upgrade**: Updated from `~17.0` to `~20.0.0` for Node 20/22/24 support
- **tsconfig.json**: Updated lib to ES2020 (from es5/es6/es2015)
- **package.json**: Moved TypeScript from `dependencies` to `devDependencies`
- **README**: Added Node.js support policy and development instructions

### Improved
- **Type safety**: Reduced use of `any` types across codebase
- **Type guards**: Improved type guard implementations with proper narrowing
- **Documentation**: Updated README with Node support policy and dev commands

### Technical Details
- All 297 tests passing (added 6 new tests)
- No breaking API changes
- Backwards compatible with existing code
- TypeScript strict mode compliance maintained

