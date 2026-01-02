# Development Workflow

This repository uses a simplified Git workflow where feature branches are merged directly into `main`.

## Branch Strategy

- **`main`**: The primary branch containing production-ready code
- **Feature branches**: Created from `main` for new features, bug fixes, or improvements

## Workflow

### 1. Create a Feature Branch

```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write code
- Add tests
- Update documentation
- Ensure all tests pass: `npm test`
- Ensure build succeeds: `npm run build`

### 3. Commit Changes

```bash
git add .
git commit -m "feat: description of your changes"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `chore:` for maintenance tasks
- `refactor:` for code refactoring

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub targeting `main`.

### 5. Review and Merge

- Wait for CI checks to pass
- Address any review comments
- Once approved, merge the PR into `main`
- Delete the feature branch after merging

## CI/CD

All PRs are automatically tested on:
- Node.js 20.x
- Node.js 22.x
- Node.js 24.x

The CI runs:
- Type checking (`npm run build:check`)
- Build (`npm run build`)
- Tests (`npm test`)

## Release Process

Releases are created from `main` using tags:

```bash
# Update version in package.json
# Update CHANGELOG.md
git add package.json CHANGELOG.md
git commit -m "chore: prepare for release vX.Y.Z"
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main
git push origin vX.Y.Z
npm publish --access public
```

## Notes

- **No `develop` branch**: We merge feature branches directly into `main`
- **Always test locally**: Run `npm test` and `npm run build` before pushing
- **Keep PRs focused**: One feature or fix per PR
- **Update docs**: If you change functionality, update the relevant documentation

