/**
 * Generates TypeScript locale files from maya_spellings_sources.json
 *
 * Creates three locale files based on different spelling conventions:
 * - modern_mayanist.ts - Modern Mayanist spellings (e.g., Pohp, Ik', Ak'bal)
 * - modern_variant.ts - Modern variant spellings (e.g., Pop, Ik', Ak'bal)
 * - older_16c.ts - Older 16th century spellings (e.g., Pop, Ik, Akbal)
 *
 * Usage: npm run generate:locales
 */

import * as fs from 'fs';
import * as path from 'path';
import { TZOLKIN_DAY_NAMES, HAAB_MONTH_NAMES } from '../src/i18n/locales/canonical-names';

// Types matching the JSON structure
interface Source {
  type: string;
  author: string | null;
  year: number | null;
  title: string;
  container: string;
  url: string;
  note: string;
}

interface SpellingInfo {
  tags: string[];
  sources: string[];
}

interface MonthEntry {
  month_index: number;
  key: string;
  spellings: Record<string, SpellingInfo>;
}

interface DayEntry {
  day_index: number;
  key: string;
  spellings: Record<string, SpellingInfo>;
}

interface MayaSpellingsData {
  filename: string;
  bibliography: Record<string, Source>;
  haab: MonthEntry[];
  tzolkin: DayEntry[];
}

// Tag names for the three locale types we want to generate
const LOCALE_TAGS = {
  modern_mayanist: 'modern_mayanist',
  modern_variant: 'modern_variant',
  older_16c: 'older_16c'
} as const;

type LocaleTag = keyof typeof LOCALE_TAGS;

// Locale metadata
const LOCALE_METADATA = {
  modern_mayanist: {
    identifier: 'modern-mayanist',
    name: 'Modern Mayanist Orthography',
    description: 'Modern Mayanist convention with glottalized consonants (Pohp, Ik\', Ak\'bal)'
  },
  modern_variant: {
    identifier: 'modern-variant',
    name: 'Modern Variant Orthography',
    description: 'Common modern variant spellings (Pop, Ik\', Ak\'bal)'
  },
  older_16c: {
    identifier: 'older-16c',
    name: 'Older 16th Century Orthography',
    description: 'Traditional Thompson/Landa spellings (Pop, Ik, Akbal)'
  }
};

/**
 * Find the canonical spelling for a given tag, falling back to alternatives
 */
function findSpellingForTag(
  spellings: Record<string, SpellingInfo>,
  targetTag: string,
  fallbackTags: string[]
): string | null {
  // First try to find a spelling with the target tag
  for (const [spelling, info] of Object.entries(spellings)) {
    if (info.tags.includes(targetTag)) {
      return spelling;
    }
  }

  // Fall back to other tags in priority order
  for (const fallbackTag of fallbackTags) {
    for (const [spelling, info] of Object.entries(spellings)) {
      if (info.tags.includes(fallbackTag)) {
        return spelling;
      }
    }
  }

  // Last resort: return the first available spelling
  return Object.keys(spellings)[0] || null;
}

/**
 * Collect all alternative spellings for a canonical form with their sources
 */
function collectAlternatives(
  spellings: Record<string, SpellingInfo>,
  canonical: string
): Array<{ spelling: string; sources: string[] }> {
  return Object.entries(spellings)
    .filter(([s]) => s !== canonical)
    .map(([spelling, info]) => ({ spelling, sources: info.sources }));
}

/**
 * Format a bibliography entry as a comment
 */
function formatBibliographyEntry(key: string, source: Source): string {
  const author = source.author || 'Unknown';
  const year = source.year || 'n.d.';
  return ` * ${key}: ${author} (${year}). "${source.title}". ${source.container}. ${source.url}`;
}

/**
 * Escape single quotes in a string for use in single-quoted JavaScript strings
 */
function escapeQuotes(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

/**
 * Generate locale file for a specific tag
 */
function generateLocale(
  data: MayaSpellingsData,
  localeTag: LocaleTag
): string {
  const metadata = LOCALE_METADATA[localeTag];

  // Define fallback priority based on locale type
  const fallbackTags = localeTag === 'older_16c'
    ? ['modern_variant', 'modern_mayanist']
    : ['modern_mayanist', 'modern_variant', 'older_16c'];

  // Generate Tzolkin day translations
  const tzolkinEntries: string[] = [];
  const sortedTzolkin = [...data.tzolkin].sort((a, b) => a.day_index - b.day_index);

  for (let i = 0; i < sortedTzolkin.length; i++) {
    const day = sortedTzolkin[i];
    const canonicalKey = TZOLKIN_DAY_NAMES[i]; // Use canonical name as key
    const localeSpelling = findSpellingForTag(day.spellings, LOCALE_TAGS[localeTag], fallbackTags);

    if (!localeSpelling) {
      console.warn(`No spelling found for Tzolkin day ${day.key} with tag ${localeTag}`);
      continue;
    }

    const localeInfo = day.spellings[localeSpelling];
    const alternatives = collectAlternatives(day.spellings, localeSpelling);

    // Build comment with sources
    const sourceRefs = localeInfo.sources.join(', ');
    let comment = `    // Day ${day.day_index}: ${day.key}\n`;
    comment += `    // Locale spelling: ${localeSpelling} (sources: ${sourceRefs})\n`;
    if (alternatives.length > 0) {
      comment += `    // Alternatives:\n`;
      for (const alt of alternatives) {
        comment += `    //   - ${alt.spelling} (sources: ${alt.sources.join(', ')})\n`;
      }
    }

    const alternativesStr = alternatives.length > 0
      ? `[${alternatives.map(a => `'${escapeQuotes(a.spelling)}'`).join(', ')}]`
      : '[]';

    tzolkinEntries.push(
      `${comment}    '${escapeQuotes(canonicalKey)}': {\n      canonical: '${escapeQuotes(localeSpelling)}',\n      alternatives: ${alternativesStr}\n    }`
    );
  }

  // Generate Haab month translations
  const haabEntries: string[] = [];
  const sortedHaab = [...data.haab].sort((a, b) => a.month_index - b.month_index);

  for (let i = 0; i < sortedHaab.length; i++) {
    const month = sortedHaab[i];
    const canonicalKey = HAAB_MONTH_NAMES[i]; // Use canonical name as key
    const localeSpelling = findSpellingForTag(month.spellings, LOCALE_TAGS[localeTag], fallbackTags);

    if (!localeSpelling) {
      console.warn(`No spelling found for Haab month ${month.key} with tag ${localeTag}`);
      continue;
    }

    const localeInfo = month.spellings[localeSpelling];
    const alternatives = collectAlternatives(month.spellings, localeSpelling);

    // Build comment with sources
    const sourceRefs = localeInfo.sources.join(', ');
    let comment = `    // Month ${month.month_index}: ${month.key}\n`;
    comment += `    // Locale spelling: ${localeSpelling} (sources: ${sourceRefs})\n`;
    if (alternatives.length > 0) {
      comment += `    // Alternatives:\n`;
      for (const alt of alternatives) {
        comment += `    //   - ${alt.spelling} (sources: ${alt.sources.join(', ')})\n`;
      }
    }

    const alternativesStr = alternatives.length > 0
      ? `[${alternatives.map(a => `'${escapeQuotes(a.spelling)}'`).join(', ')}]`
      : '[]';

    haabEntries.push(
      `${comment}    '${escapeQuotes(canonicalKey)}': {\n      canonical: '${escapeQuotes(localeSpelling)}',\n      alternatives: ${alternativesStr}\n    }`
    );
  }

  // Generate bibliography section
  const bibliographyEntries: string[] = [];
  for (const [key, source] of Object.entries(data.bibliography)) {
    bibliographyEntries.push(formatBibliographyEntry(key, source));
  }

  // Generate the TypeScript file content
  return `import { LocaleDefinition } from '../types';

/**
 * ${metadata.name}
 *
 * ${metadata.description}
 *
 * This file is auto-generated from maya_spellings_sources.json
 * DO NOT EDIT MANUALLY - run 'npm run generate:locales' to regenerate
 *
 * BIBLIOGRAPHY:
${bibliographyEntries.join('\n')}
 */
export const ${localeTag}Locale: LocaleDefinition = {
  locale: '${metadata.identifier}',
  name: '${metadata.name}',
  tzolkinDays: {
${tzolkinEntries.join(',\n')}
  },
  haabMonths: {
${haabEntries.join(',\n')}
  }
};
`;
}

/**
 * Generate spelling variations documentation for website
 */
function generateSpellingDocs(data: MayaSpellingsData): string {
  const lines: string[] = [];

  lines.push('# Domain Model: Spelling Variation');
  lines.push('');
  lines.push('Maya calendar names have been spelled in many different ways by different scholars and in different time periods. This library supports multiple orthographic conventions and can normalize alternative spellings to canonical forms.');
  lines.push('');
  lines.push('## Orthographic Conventions');
  lines.push('');
  lines.push('This library supports three main orthographic conventions:');
  lines.push('');
  lines.push('1. **Modern Mayanist** - Contemporary epigraphic convention with glottalized consonants');
  lines.push('2. **Modern Variant** - Common modern variant spellings found in recent literature');
  lines.push('3. **Older 16th Century** - Traditional Thompson/Landa conventions from colonial sources');
  lines.push('');

  // Build global source-to-footnote mapping
  const allSources = new Set<string>();
  [...data.tzolkin, ...data.haab].forEach(entry => {
    Object.values(entry.spellings).forEach(info => {
      info.sources.forEach(s => allSources.add(s));
    });
  });

  const sourceToFootnote = new Map<string, number>();
  let footnoteNum = 1;
  Array.from(allSources).sort().forEach(source => {
    sourceToFootnote.set(source, footnoteNum++);
  });

  // Tzolkin section
  lines.push('## Tzolkin Day Names');
  lines.push('');
  lines.push('The 20 day names of the Tzolkin calendar have the following attested spellings:');
  lines.push('');
  lines.push('| # | Canonical | Modern Mayanist | Modern Variant | Older 16th C | Alternative Forms |');
  lines.push('|---|-----------|-----------------|----------------|--------------|-------------------|');

  const sortedTzolkin = [...data.tzolkin].sort((a, b) => a.day_index - b.day_index);

  for (let i = 0; i < sortedTzolkin.length; i++) {
    const day = sortedTzolkin[i];
    const canonical = TZOLKIN_DAY_NAMES[i];

    // Find spellings for each locale
    const mayanist = findSpellingForTag(day.spellings, 'modern_mayanist', ['modern_variant', 'older_16c']) || canonical;
    const variant = findSpellingForTag(day.spellings, 'modern_variant', ['modern_mayanist', 'older_16c']) || canonical;
    const older = findSpellingForTag(day.spellings, 'older_16c', ['modern_variant', 'modern_mayanist']) || canonical;

    // Add footnotes to each spelling based on its specific sources
    const mayanistWithRefs = mayanist + (day.spellings[mayanist]?.sources || [])
      .sort()
      .map(s => `[^${sourceToFootnote.get(s)}]`)
      .join('');

    const variantWithRefs = variant + (day.spellings[variant]?.sources || [])
      .sort()
      .map(s => `[^${sourceToFootnote.get(s)}]`)
      .join('');

    const olderWithRefs = older + (day.spellings[older]?.sources || [])
      .sort()
      .map(s => `[^${sourceToFootnote.get(s)}]`)
      .join('');

    // Collect all alternative spellings
    const allSpellings = new Set<string>();
    for (const [spelling, info] of Object.entries(day.spellings)) {
      if (spelling !== mayanist && spelling !== variant && spelling !== older) {
        allSpellings.add(spelling);
      }
    }
    const alternatives = allSpellings.size > 0 ? Array.from(allSpellings).join(', ') : '—';

    lines.push(`| ${day.day_index} | ${canonical} | ${mayanistWithRefs} | ${variantWithRefs} | ${olderWithRefs} | ${alternatives} |`);
  }

  lines.push('');

  // Haab section
  lines.push('## Haab Month Names');
  lines.push('');
  lines.push('The 19 month names (18 regular months + Wayeb) have the following attested spellings:');
  lines.push('');
  lines.push('| # | Canonical | Modern Mayanist | Modern Variant | Older 16th C | Alternative Forms |');
  lines.push('|---|-----------|-----------------|----------------|--------------|-------------------|');

  const sortedHaab = [...data.haab].sort((a, b) => a.month_index - b.month_index);

  for (let i = 0; i < sortedHaab.length; i++) {
    const month = sortedHaab[i];
    const canonical = HAAB_MONTH_NAMES[i];

    // Find spellings for each locale
    const mayanist = findSpellingForTag(month.spellings, 'modern_mayanist', ['modern_variant', 'older_16c']) || canonical;
    const variant = findSpellingForTag(month.spellings, 'modern_variant', ['modern_mayanist', 'older_16c']) || canonical;
    const older = findSpellingForTag(month.spellings, 'older_16c', ['modern_variant', 'modern_mayanist']) || canonical;

    // Add footnotes to each spelling based on its specific sources
    const mayanistWithRefs = mayanist + (month.spellings[mayanist]?.sources || [])
      .sort()
      .map(s => `[^${sourceToFootnote.get(s)}]`)
      .join('');

    const variantWithRefs = variant + (month.spellings[variant]?.sources || [])
      .sort()
      .map(s => `[^${sourceToFootnote.get(s)}]`)
      .join('');

    const olderWithRefs = older + (month.spellings[older]?.sources || [])
      .sort()
      .map(s => `[^${sourceToFootnote.get(s)}]`)
      .join('');

    // Collect all alternative spellings
    const allSpellings = new Set<string>();
    for (const [spelling, info] of Object.entries(month.spellings)) {
      if (spelling !== mayanist && spelling !== variant && spelling !== older) {
        allSpellings.add(spelling);
      }
    }
    const alternatives = allSpellings.size > 0 ? Array.from(allSpellings).join(', ') : '—';

    lines.push(`| ${month.month_index} | ${canonical} | ${mayanistWithRefs} | ${variantWithRefs} | ${olderWithRefs} | ${alternatives} |`);
  }

  lines.push('');
  lines.push('## References');
  lines.push('');

  // Generate footnotes - one per source
  const footnotes: string[] = [];
  Array.from(sourceToFootnote.entries())
    .sort((a, b) => a[1] - b[1])
    .forEach(([sourceKey, num]) => {
      const source = data.bibliography[sourceKey];
      if (source) {
        const author = source.author || 'Unknown';
        const year = source.year || 'n.d.';
        footnotes.push(`[^${num}]: ${author} (${year}). "${source.title}". *${source.container}*. [${source.url}](${source.url})`);
      } else {
        footnotes.push(`[^${num}]: ${sourceKey}`);
      }
    });

  lines.push(...footnotes);
  lines.push('');

  return lines.join('\n');
}

/**
 * Main execution
 */
function main(): void {
  const dataPath = path.join(__dirname, '../src/i18n/data/maya_spellings_sources.json');
  const outputDir = path.join(__dirname, '../src/i18n/locales');
  const docsOutputPath = path.join(__dirname, '../website/docs/spelling-variations.md');

  // Read the source data
  console.log(`Reading data from ${dataPath}...`);
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const data: MayaSpellingsData = JSON.parse(rawData);

  console.log(`Found ${data.tzolkin.length} Tzolkin days and ${data.haab.length} Haab months`);

  // Generate each locale file
  for (const localeTag of Object.keys(LOCALE_TAGS) as LocaleTag[]) {
    const content = generateLocale(data, localeTag);
    const outputPath = path.join(outputDir, `${localeTag}.ts`);

    console.log(`Generating ${outputPath}...`);
    fs.writeFileSync(outputPath, content, 'utf-8');
  }

  // Generate spelling variations documentation
  console.log(`Generating ${docsOutputPath}...`);
  const docsContent = generateSpellingDocs(data);
  fs.writeFileSync(docsOutputPath, docsContent, 'utf-8');

  console.log('\n✓ Successfully generated locale files:');
  console.log(`  - ${LOCALE_METADATA.modern_mayanist.identifier}.ts`);
  console.log(`  - ${LOCALE_METADATA.modern_variant.identifier}.ts`);
  console.log(`  - ${LOCALE_METADATA.older_16c.identifier}.ts`);
  console.log('\n✓ Successfully generated documentation:');
  console.log(`  - spelling-variations.md`);
}

// Run the script
main();
