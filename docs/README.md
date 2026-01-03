# Documentation Index

Welcome to the `@drewsonne/maya-dates` documentation!

## 📚 Published Documentation

The main documentation is available at **[https://drewsonne.github.io/maya-dates/](https://drewsonne.github.io/maya-dates/)** and includes:

- **Getting Started Guide** - Introduction and quick start
- **Usage Guide** - Common patterns and examples
- **Architecture Documentation** - System design and patterns
- **Domain Model** - Maya calendar system explained
- **API Reference** - Generated TypeDoc documentation
- **Module Documentation** - Overview of source code modules
- **Examples** - Runnable code examples

## 📁 Repository Documentation Structure

### Website (website/)
The primary documentation source. Built with Docusaurus and published to GitHub Pages.

- `website/docs/` - Hand-written documentation (architecture, usage, etc.)
- `website/docs/api/` - Auto-generated API reference from TypeDoc
- `website/docs/modules/` - Module-level documentation

### Development Documentation (docs/development/)
Documentation for contributors and maintainers:

- `workflow.md` - Development workflow and git practices
- `modernization-audit.md` - Codebase audit findings
- `modernization-summary.md` - Summary of modernization changes
- `cursor-bot-comments.md` - How to check Cursor bot PR comments
- `issues-backlog.md` - Potential future improvements
- `pr71-*.md` - Historical PR review responses

### GitHub Configuration (.github/)
- `copilot-instructions.md` - Guidelines for GitHub Copilot

### Source Code Documentation (src/)
Each source module has its own README explaining its purpose:
- `src/README.md` - Overall source structure
- `src/cr/README.md` - Calendar Round module
- `src/lc/README.md` - Long Count module
- `src/factory/README.md` - Factory pattern implementations
- `src/operations/README.md` - Date operations
- `src/structs/README.md` - Data structures

These are also included in the published website at `/docs/modules/`.

### Examples (examples/)
- `examples/README.md` - Guide to runnable examples

Also included in the published website at `/docs/examples`.

## 🔨 Building Documentation

```bash
# Start local development server
npm run docs:start

# Build static documentation site
npm run docs:build
```

## 📝 Contributing to Documentation

When adding or updating documentation:

1. **User-facing documentation**: Edit files in `website/docs/`
2. **API documentation**: Update JSDoc comments in source code
3. **Module documentation**: Update README.md files in `src/` subdirectories
4. **Development documentation**: Edit files in `docs/development/`

All user-facing documentation should be in `website/docs/` to ensure it's published to the documentation website.

## 🔗 External Resources

- [GitHub Repository](https://github.com/drewsonne/maya-dates)
- [npm Package](https://www.npmjs.com/package/@drewsonne/maya-dates)
- [Published Documentation](https://drewsonne.github.io/maya-dates/)
