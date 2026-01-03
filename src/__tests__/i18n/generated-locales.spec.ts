import { expect } from 'chai';
import 'mocha';
import { I18nManager, getI18nManager, DEFAULT_LOCALE } from '../../i18n/i18n-manager';
import { modern_mayanistLocale } from '../../i18n/locales/modern_mayanist';
import { modern_variantLocale } from '../../i18n/locales/modern_variant';
import { older_16cLocale } from '../../i18n/locales/older_16c';
import { TZOLKIN_DAY_NAMES, HAAB_MONTH_NAMES } from '../../i18n/locales/canonical-names';
import CalendarRoundFactory from '../../factory/calendar-round';
import { getTzolkinDay, TzolkinDay } from '../../cr/component/tzolkinDay';
import { getHaabMonth, HaabMonth } from '../../cr/component/haabMonth';
import { isWildcard } from '../../wildcard';

describe('Generated Locales', () => {
  let i18n: I18nManager;

  beforeEach(() => {
    i18n = getI18nManager();
    i18n.reset();
  });

  describe('Locale Completeness - Tzolkin Days', () => {
    it('modern_mayanist should have all 20 Tzolkin day names', () => {
      const localeKeys = Object.keys(modern_mayanistLocale.tzolkinDays || {});
      expect(localeKeys).to.have.lengthOf(20);
      
      TZOLKIN_DAY_NAMES.forEach(dayName => {
        expect(modern_mayanistLocale.tzolkinDays).to.have.property(dayName);
      });
    });

    it('modern_variant should have all 20 Tzolkin day names', () => {
      const localeKeys = Object.keys(modern_variantLocale.tzolkinDays || {});
      expect(localeKeys).to.have.lengthOf(20);
      
      TZOLKIN_DAY_NAMES.forEach(dayName => {
        expect(modern_variantLocale.tzolkinDays).to.have.property(dayName);
      });
    });

    it('older_16c should have all 20 Tzolkin day names', () => {
      const localeKeys = Object.keys(older_16cLocale.tzolkinDays || {});
      expect(localeKeys).to.have.lengthOf(20);
      
      TZOLKIN_DAY_NAMES.forEach(dayName => {
        expect(older_16cLocale.tzolkinDays).to.have.property(dayName);
      });
    });
  });

  describe('Locale Completeness - Haab Months', () => {
    it('modern_mayanist should have all 19 Haab month names', () => {
      const localeKeys = Object.keys(modern_mayanistLocale.haabMonths || {});
      expect(localeKeys).to.have.lengthOf(19);
      
      HAAB_MONTH_NAMES.forEach(monthName => {
        expect(modern_mayanistLocale.haabMonths).to.have.property(monthName);
      });
    });

    it('modern_variant should have all 19 Haab month names', () => {
      const localeKeys = Object.keys(modern_variantLocale.haabMonths || {});
      expect(localeKeys).to.have.lengthOf(19);
      
      HAAB_MONTH_NAMES.forEach(monthName => {
        expect(modern_variantLocale.haabMonths).to.have.property(monthName);
      });
    });

    it('older_16c should have all 19 Haab month names', () => {
      const localeKeys = Object.keys(older_16cLocale.haabMonths || {});
      expect(localeKeys).to.have.lengthOf(19);
      
      HAAB_MONTH_NAMES.forEach(monthName => {
        expect(older_16cLocale.haabMonths).to.have.property(monthName);
      });
    });
  });

  describe('Cross-Locale Consistency', () => {
    it('all locales should use identical Tzolkin day keys', () => {
      const mayanistKeys = Object.keys(modern_mayanistLocale.tzolkinDays || {}).sort();
      const variantKeys = Object.keys(modern_variantLocale.tzolkinDays || {}).sort();
      const olderKeys = Object.keys(older_16cLocale.tzolkinDays || {}).sort();

      expect(mayanistKeys).to.deep.equal(variantKeys);
      expect(variantKeys).to.deep.equal(olderKeys);
      expect(mayanistKeys).to.deep.equal(TZOLKIN_DAY_NAMES.slice().sort());
    });

    it('all locales should use identical Haab month keys', () => {
      const mayanistKeys = Object.keys(modern_mayanistLocale.haabMonths || {}).sort();
      const variantKeys = Object.keys(modern_variantLocale.haabMonths || {}).sort();
      const olderKeys = Object.keys(older_16cLocale.haabMonths || {}).sort();

      expect(mayanistKeys).to.deep.equal(variantKeys);
      expect(variantKeys).to.deep.equal(olderKeys);
      expect(mayanistKeys).to.deep.equal(HAAB_MONTH_NAMES.slice().sort());
    });
  });

  describe('Quote Escaping and Syntax', () => {
    const quotedNames = ['Ik\'', 'Ak\'bal', 'K\'an', 'Manik\'', 'Etz\'nab'];
    const quotedMonths = ['Sotz\'', 'Yaxk\'in', 'Ch\'en', 'K\'ank\'in', 'K\'ayab', 'Kumk\'u'];

    quotedNames.forEach(name => {
      it(`should handle Tzolkin day name with apostrophe: ${name}`, () => {
        expect(modern_mayanistLocale.tzolkinDays).to.have.property(name);
        expect(modern_variantLocale.tzolkinDays).to.have.property(name);
        expect(older_16cLocale.tzolkinDays).to.have.property(name);
        
        const dayResult = getTzolkinDay(name);
        expect(isWildcard(dayResult)).to.equal(false);
      });
    });

    quotedMonths.forEach(name => {
      it(`should handle Haab month name with apostrophe: ${name}`, () => {
        expect(modern_mayanistLocale.haabMonths).to.have.property(name);
        expect(modern_variantLocale.haabMonths).to.have.property(name);
        expect(older_16cLocale.haabMonths).to.have.property(name);
        
        const monthResult = getHaabMonth(name);
        expect(isWildcard(monthResult)).to.equal(false);
      });
    });
  });

  describe('Default Locale', () => {
    it('DEFAULT_LOCALE should be modern-mayanist', () => {
      expect(DEFAULT_LOCALE).to.equal('modern-mayanist');
    });

    it('i18n manager should start with modern_mayanist active', () => {
      expect(i18n.getActiveLocale()).to.equal('modern-mayanist');
    });

    it('should render with modern_mayanist spellings by default', () => {
      // Pop renders as Pohp in modern_mayanist
      expect(i18n.renderHaabMonth('Pop')).to.equal('Pohp');
      
      // Check some key modern_mayanist spellings
      expect(i18n.renderTzolkinDay('Ik\'')).to.equal('Ik\'');
      expect(i18n.renderTzolkinDay('Ak\'bal')).to.equal('Ak\'bal');
    });
  });

  describe('Locale Switching and Rendering', () => {
    beforeEach(() => {
      i18n.registerLocale(modern_variantLocale);
      i18n.registerLocale(older_16cLocale);
    });

    it('should render Ajaw differently in each locale', () => {
      expect(i18n.renderTzolkinDay('Ajaw', 'modern-mayanist')).to.equal('Ajaw');
      expect(i18n.renderTzolkinDay('Ajaw', 'modern-variant')).to.equal('Ahaw');
      expect(i18n.renderTzolkinDay('Ajaw', 'older-16c')).to.equal('Ahau');
    });

    it('should render Pop differently in each locale', () => {
      expect(i18n.renderHaabMonth('Pop', 'modern-mayanist')).to.equal('Pohp');
      expect(i18n.renderHaabMonth('Pop', 'modern-variant')).to.equal('Pop');
      expect(i18n.renderHaabMonth('Pop', 'older-16c')).to.equal('Pop');
    });

    it('should render Sek/Tzek differently in each locale', () => {
      expect(i18n.renderHaabMonth('Sek', 'modern-mayanist')).to.equal('Tsek');
      expect(i18n.renderHaabMonth('Sek', 'modern-variant')).to.equal('Tzek');
      expect(i18n.renderHaabMonth('Sek', 'older-16c')).to.equal('Zec');
    });

    it('should render full Calendar Round in each locale', () => {
      const factory = new CalendarRoundFactory();
      const cr = factory.parse('4 Ajaw 8 Kumk\'u');
      
      const tzolkin = cr.tzolkin;
      const haab = cr.haab;
      
      // modern_mayanist
      const day1 = (tzolkin.day as TzolkinDay).toLocaleString('modern-mayanist');
      const month1 = (haab.month as HaabMonth).toLocaleString('modern-mayanist');
      expect(`${tzolkin.coeff} ${day1} ${haab.coeff} ${month1}`).to.equal('4 Ajaw 8 Kumk\'u');
      
      // modern_variant
      const day2 = (tzolkin.day as TzolkinDay).toLocaleString('modern-variant');
      const month2 = (haab.month as HaabMonth).toLocaleString('modern-variant');
      expect(`${tzolkin.coeff} ${day2} ${haab.coeff} ${month2}`).to.equal('4 Ahaw 8 Kumk\'u');
      
      // older_16c
      const day3 = (tzolkin.day as TzolkinDay).toLocaleString('older-16c');
      const month3 = (haab.month as HaabMonth).toLocaleString('older-16c');
      expect(`${tzolkin.coeff} ${day3} ${haab.coeff} ${month3}`).to.equal('4 Ahau 8 Cumku');
    });
  });

  describe('Alternative Spelling Normalization', () => {
    beforeEach(() => {
      i18n.registerLocale(modern_variantLocale);
      i18n.registerLocale(older_16cLocale);
    });

    it('should normalize Ajaw alternatives to canonical key', () => {
      expect(i18n.normalizeTzolkinDay('Ahau')).to.equal('Ajaw');
      expect(i18n.normalizeTzolkinDay('Ahaw')).to.equal('Ajaw');
      expect(i18n.normalizeTzolkinDay('Ajaw')).to.equal('Ajaw');
    });

    it('should normalize Sek alternatives to canonical key', () => {
      expect(i18n.normalizeHaabMonth('Tzek')).to.equal('Sek');
      expect(i18n.normalizeHaabMonth('Tsek')).to.equal('Sek');
      expect(i18n.normalizeHaabMonth('Zec')).to.equal('Sek');
      expect(i18n.normalizeHaabMonth('Sek')).to.equal('Sek');
    });

    it('should normalize Pop/Pohp alternatives to canonical key', () => {
      expect(i18n.normalizeHaabMonth('Pop')).to.equal('Pop');
      expect(i18n.normalizeHaabMonth('Pohp')).to.equal('Pop');
    });

    it('should normalize Etz\'nab/Edznab alternatives to canonical key', () => {
      expect(i18n.normalizeTzolkinDay('Etz\'nab')).to.equal('Etz\'nab');
      expect(i18n.normalizeTzolkinDay('Edznab')).to.equal('Etz\'nab');
    });
  });

  describe('Round-Trip Parsing and Rendering', () => {
    beforeEach(() => {
      i18n.registerLocale(modern_variantLocale);
      i18n.registerLocale(older_16cLocale);
    });

    it('should parse alternative, normalize, and render correctly', () => {
      const factory = new CalendarRoundFactory();
      
      // Parse with older spelling 'Ahau'
      const cr = factory.parse('4 Ahau 8 Kumk\'u');
      
      // Verify normalized to canonical
      expect(cr.toString()).to.equal('4 Ajaw 8 Kumk\'u');
      
      // Verify renders in modern_variant as 'Ahaw'
      const day = (cr.tzolkin.day as TzolkinDay).toLocaleString('modern-variant');
      expect(day).to.equal('Ahaw');
    });

    it('should maintain singleton identity across alternative spellings', () => {
      const day1 = getTzolkinDay('Ahau');
      const day2 = getTzolkinDay('Ahaw');
      const day3 = getTzolkinDay('Ajaw');
      
      expect(day1).to.equal(day2);
      expect(day2).to.equal(day3);
    });
  });

  describe('Wildcard Handling with Locales', () => {
    beforeEach(() => {
      i18n.registerLocale(modern_variantLocale);
    });

    it('should render Calendar Round with wildcard coefficient in locale', () => {
      const factory = new CalendarRoundFactory();
      const cr = factory.parse('* Ajaw 8 Kumk\'u');
      
      const day = cr.tzolkin.day;
      if (!isWildcard(day)) {
        const rendered = (day as TzolkinDay).toLocaleString('modern-variant');
        expect(rendered).to.equal('Ahaw');
      }
    });

    it('should render Calendar Round with wildcard day in locale', () => {
      const factory = new CalendarRoundFactory();
      const cr = factory.parse('4 * 8 Kumk\'u');
      
      const month = cr.haab.month;
      if (!isWildcard(month)) {
        const rendered = (month as HaabMonth).toLocaleString('modern-variant');
        expect(rendered).to.equal('Kumk\'u');
      }
    });
  });

  describe('Locale Registration Completeness', () => {
    it('should successfully register all three locales', () => {
      i18n.registerLocale(modern_variantLocale);
      i18n.registerLocale(older_16cLocale);
      
      const locales = i18n.getRegisteredLocales();
      expect(locales).to.include('modern-mayanist');
      expect(locales).to.include('modern-variant');
      expect(locales).to.include('older-16c');
    });

    it('should successfully activate each locale', () => {
      i18n.registerLocale(modern_variantLocale);
      i18n.registerLocale(older_16cLocale);
      
      i18n.setActiveLocale('modern-variant');
      expect(i18n.getActiveLocale()).to.equal('modern-variant');
      
      i18n.setActiveLocale('older-16c');
      expect(i18n.getActiveLocale()).to.equal('older-16c');
      
      i18n.setActiveLocale('modern-mayanist');
      expect(i18n.getActiveLocale()).to.equal('modern-mayanist');
    });
  });

  describe('Performance with Large-Scale Normalization', () => {
    beforeEach(() => {
      i18n.registerLocale(modern_variantLocale);
      i18n.registerLocale(older_16cLocale);
    });

    it('should normalize 1000+ dates in under 100ms', () => {
      const alternatives = [
        ['Ahau', 'Ahaw', 'Ajaw'],
        ['Kumku', 'Cumku', 'Kumk\'u'],
        ['Tzek', 'Tsek', 'Sek', 'Zec'],
        ['Pop', 'Pohp']
      ];
      
      const startTime = Date.now();
      
      for (let i = 0; i < 1000; i++) {
        i18n.normalizeTzolkinDay(alternatives[0][i % 3]);
        i18n.normalizeHaabMonth(alternatives[1][i % 3]);
        i18n.normalizeHaabMonth(alternatives[2][i % 4]);
        i18n.normalizeHaabMonth(alternatives[3][i % 2]);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(duration).to.be.lessThan(100);
    });
  });

  describe('Specific Locale Spelling Differences', () => {
    beforeEach(() => {
      i18n.registerLocale(modern_variantLocale);
      i18n.registerLocale(older_16cLocale);
    });

    const testCases = [
      { canonical: 'Pop', mayanist: 'Pohp', variant: 'Pop', older: 'Pop' },
      { canonical: 'Wo', mayanist: 'Wo', variant: 'Wo', older: 'Uo' },
      { canonical: 'Sip', mayanist: 'Sip', variant: 'Sip', older: 'Zip' },
      { canonical: 'Sotz\'', mayanist: 'Sots\'', variant: 'Sotz\'', older: 'Zotz\'' },
      { canonical: 'Sek', mayanist: 'Tsek', variant: 'Tzek', older: 'Zec' },
      { canonical: 'Ajaw', mayanist: 'Ajaw', variant: 'Ahaw', older: 'Ahau' },
      { canonical: 'Ik\'', mayanist: 'Ik\'', variant: 'Ik\'', older: 'Ik' },
      { canonical: 'Ak\'bal', mayanist: 'Ak\'bal', variant: 'Ak\'bal', older: 'Akbal' },
      { canonical: 'Etz\'nab', mayanist: 'Etz\'nab', variant: 'Edznab', older: 'Etz\'nab' }
    ];

    testCases.forEach(({ canonical, mayanist, variant, older }) => {
      it(`should render ${canonical} correctly in all locales`, () => {
        const isMonth = HAAB_MONTH_NAMES.includes(canonical as any);
        
        if (isMonth) {
          expect(i18n.renderHaabMonth(canonical, 'modern-mayanist')).to.equal(mayanist);
          expect(i18n.renderHaabMonth(canonical, 'modern-variant')).to.equal(variant);
          expect(i18n.renderHaabMonth(canonical, 'older-16c')).to.equal(older);
        } else {
          expect(i18n.renderTzolkinDay(canonical, 'modern-mayanist')).to.equal(mayanist);
          expect(i18n.renderTzolkinDay(canonical, 'modern-variant')).to.equal(variant);
          expect(i18n.renderTzolkinDay(canonical, 'older-16c')).to.equal(older);
        }
      });
    });
  });
});
