# Scripts

This directory contains build and code generation scripts for the maya-dates project.

## generate-locales.ts

Generates TypeScript locale files from `src/i18n/data/maya_spellings_sources.json`.

### Generated Locales

Creates three locale files based on different Maya calendar spelling conventions:

1. **modern_mayanist.ts** - Modern Mayanist orthography
   - Uses glottalized consonants (e.g., Pohp, Ik', Ak'bal)
   - Based on modern epigraphic conventions
   - Tag: `modern_mayanist`

2. **modern_variant.ts** - Modern variant orthography
   - Common modern variant spellings (e.g., Pop, Ik', Ak'bal)
   - Mix of modern conventions
   - Tag: `modern_variant`

3. **older_16c.ts** - Older 16th century orthography
   - Traditional Thompson/Landa spellings (e.g., Pop, Ik, Akbal)
   - Based on historical conventions
   - Tag: `older_16c`

### Usage

```bash
npm run generate:locales
```

### Build Integration

The script is automatically run before the build process via the `prebuild` script in package.json:

```json
{
  "scripts": {
    "prebuild": "npm run generate:locales",
    "build": "rm -rf lib && tsc -p tsconfig.json"
  }
}
```

This ensures that locale files are always up-to-date before compilation.

### Output

Generated files are written to `src/i18n/locales/`:
- `src/i18n/locales/modern_mayanist.ts`
- `src/i18n/locales/modern_variant.ts`
- `src/i18n/locales/older_16c.ts`

**Note:** These files are auto-generated and should not be edited manually. Any changes should be made to the source JSON file instead.

## Other Scripts

### clean-build.sh

Cleans the build directory and performs a fresh build.

### check-cursor-bot-comments.sh

Checks for cursor bot comments in the codebase.
