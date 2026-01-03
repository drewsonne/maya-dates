import {expect} from 'chai';
import 'mocha';
import {I18nManager, getI18nManager, DEFAULT_LOCALE} from '../../i18n/i18n-manager';
import {LocaleDefinition} from '../../i18n/types';
import CalendarRoundFactory from '../../factory/calendar-round';
import {getTzolkinDay, TzolkinDay} from '../../cr/component/tzolkinDay';
import {getHaabMonth, HaabMonth} from '../../cr/component/haabMonth';
import {Wildcard, isWildcard} from '../../wildcard';

describe('I18n Manager', () => {
  let i18n: I18nManager;

  beforeEach(() => {
    i18n = getI18nManager();
    i18n.reset(); // Reset to default state before each test
  });

  describe('Singleton pattern', () => {
    it('should return the same instance', () => {
      const instance1 = I18nManager.getInstance();
      const instance2 = I18nManager.getInstance();
      expect(instance1).to.equal(instance2);
    });
  });

  describe('Locale registration', () => {
    it('should register a new locale', () => {
      const localeDef: LocaleDefinition = {
        locale: 'test',
        name: 'Test Locale',
        tzolkinDays: {
          'Imix': { canonical: 'Imix', alternatives: ['Imix\'', 'Imix'] }
        }
      };
      
      i18n.registerLocale(localeDef);
      const locales = i18n.getRegisteredLocales();
      expect(locales).to.include('test');
    });

    it('should have default locale registered', () => {
      const locales = i18n.getRegisteredLocales();
      expect(locales).to.include(DEFAULT_LOCALE);
    });
  });

  describe('Active locale', () => {
    it('should start with default locale', () => {
      expect(i18n.getActiveLocale()).to.equal(DEFAULT_LOCALE);
    });

    it('should set active locale', () => {
      const localeDef: LocaleDefinition = {
        locale: 'test',
        name: 'Test Locale'
      };
      
      i18n.registerLocale(localeDef);
      i18n.setActiveLocale('test');
      expect(i18n.getActiveLocale()).to.equal('test');
    });

    it('should throw error for unregistered locale', () => {
      expect(() => i18n.setActiveLocale('nonexistent')).to.throw(
        "Locale 'nonexistent' is not registered"
      );
    });
  });

  describe('Tzolkin day normalization', () => {
    beforeEach(() => {
      const localeDef: LocaleDefinition = {
        locale: 'alt',
        name: 'Alternative Spellings',
        tzolkinDays: {
          'Imix': { canonical: 'Imix', alternatives: ['Imix\'', 'Imish'] },
          'Ak\'bal': { canonical: 'Ak\'bal', alternatives: ['Akbal', 'Ak-bal'] }
        }
      };
      i18n.registerLocale(localeDef);
    });

    it('should normalize alternative spelling to canonical', () => {
      expect(i18n.normalizeTzolkinDay('Imix\'')).to.equal('Imix');
      expect(i18n.normalizeTzolkinDay('Imish')).to.equal('Imix');
    });

    it('should return canonical as-is', () => {
      expect(i18n.normalizeTzolkinDay('Imix')).to.equal('Imix');
    });

    it('should return unknown name as-is', () => {
      expect(i18n.normalizeTzolkinDay('Unknown')).to.equal('Unknown');
    });

    it('should normalize with apostrophes', () => {
      expect(i18n.normalizeTzolkinDay('Akbal')).to.equal('Ak\'bal');
      expect(i18n.normalizeTzolkinDay('Ak-bal')).to.equal('Ak\'bal');
    });
  });

  describe('Haab month normalization', () => {
    beforeEach(() => {
      const localeDef: LocaleDefinition = {
        locale: 'alt',
        name: 'Alternative Spellings',
        haabMonths: {
          'Pop': { canonical: 'Pop', alternatives: ['Pop\'', 'Pohp'] },
          'K\'ayab': { canonical: 'K\'ayab', alternatives: ['Kayab', 'K-ayab'] }
        }
      };
      i18n.registerLocale(localeDef);
    });

    it('should normalize alternative spelling to canonical', () => {
      expect(i18n.normalizeHaabMonth('Pop\'')).to.equal('Pop');
      expect(i18n.normalizeHaabMonth('Pohp')).to.equal('Pop');
    });

    it('should return canonical as-is', () => {
      expect(i18n.normalizeHaabMonth('Pop')).to.equal('Pop');
    });

    it('should return unknown name as-is', () => {
      expect(i18n.normalizeHaabMonth('Unknown')).to.equal('Unknown');
    });

    it('should normalize with apostrophes', () => {
      expect(i18n.normalizeHaabMonth('Kayab')).to.equal('K\'ayab');
      expect(i18n.normalizeHaabMonth('K-ayab')).to.equal('K\'ayab');
    });
  });

  describe('Rendering with locale', () => {
    beforeEach(() => {
      const localeDef: LocaleDefinition = {
        locale: 'simplified',
        name: 'Simplified Spelling',
        tzolkinDays: {
          'Imix': { canonical: 'Imish', alternatives: [] },
          'Ik\'': { canonical: 'Ik', alternatives: [] }
        },
        haabMonths: {
          'Pop': { canonical: 'Pohp', alternatives: [] },
          'K\'ayab': { canonical: 'Kayab', alternatives: [] }
        }
      };
      i18n.registerLocale(localeDef);
    });

    it('should render Tzolkin day in specified locale', () => {
      expect(i18n.renderTzolkinDay('Imix', 'simplified')).to.equal('Imish');
      expect(i18n.renderTzolkinDay('Ik\'', 'simplified')).to.equal('Ik');
    });

    it('should render Haab month in specified locale', () => {
      expect(i18n.renderHaabMonth('Pop', 'simplified')).to.equal('Pohp');
      expect(i18n.renderHaabMonth('K\'ayab', 'simplified')).to.equal('Kayab');
    });

    it('should use active locale when not specified', () => {
      i18n.setActiveLocale('simplified');
      expect(i18n.renderTzolkinDay('Imix')).to.equal('Imish');
      expect(i18n.renderHaabMonth('Pop')).to.equal('Pohp');
    });

    it('should return canonical if not in locale', () => {
      expect(i18n.renderTzolkinDay('Ajaw', 'simplified')).to.equal('Ajaw');
      expect(i18n.renderHaabMonth('Wayeb', 'simplified')).to.equal('Wayeb');
    });
  });
});

describe('I18n with Calendar Round parsing', () => {
  let i18n: I18nManager;

  beforeEach(() => {
    i18n = getI18nManager();
    i18n.reset();
  });

  it('should parse Calendar Round with alternative spellings', () => {
    const localeDef: LocaleDefinition = {
      locale: 'alt',
      name: 'Alternative Spellings',
      tzolkinDays: {
        'Ajaw': { canonical: 'Ajaw', alternatives: ['Ahau', 'Ajau'] }
      },
      haabMonths: {
        'Kumk\'u': { canonical: 'Kumk\'u', alternatives: ['Kumku', 'Cumku'] }
      }
    };
    i18n.registerLocale(localeDef);

    const factory = new CalendarRoundFactory();
    
    // Parse with alternative spellings
    const cr1 = factory.parse('4 Ahau 8 Kumku');
    const cr2 = factory.parse('4 Ajaw 8 Kumk\'u');
    
    // Both should produce the same canonical result
    expect(cr1.toString()).to.equal('4 Ajaw 8 Kumk\'u');
    expect(cr2.toString()).to.equal('4 Ajaw 8 Kumk\'u');
    expect(cr1.equal(cr2)).to.equal(true);
  });

  it('should maintain singleton identity with alternative spellings', () => {
    const localeDef: LocaleDefinition = {
      locale: 'alt',
      name: 'Alternative Spellings',
      tzolkinDays: {
        'Ajaw': { canonical: 'Ajaw', alternatives: ['Ahau', 'Ajau'] }
      },
      haabMonths: {
        'Kumk\'u': { canonical: 'Kumk\'u', alternatives: ['Kumku', 'Cumku'] }
      }
    };
    i18n.registerLocale(localeDef);

    // Verify singleton pattern: different spellings resolve to same instance
    const day1 = getTzolkinDay('Ahau');
    const day2 = getTzolkinDay('Ajaw');
    const day3 = getTzolkinDay('Ajau');
    
    expect(day1).to.equal(day2);
    expect(day2).to.equal(day3);
    expect(day1).to.equal(day3);

    const month1 = getHaabMonth('Kumku');
    const month2 = getHaabMonth('Kumk\'u');
    const month3 = getHaabMonth('Cumku');
    
    expect(month1).to.equal(month2);
    expect(month2).to.equal(month3);
    expect(month1).to.equal(month3);
  });

  it('should parse with multiple alternative forms', () => {
    const localeDef: LocaleDefinition = {
      locale: 'variants',
      name: 'Multiple Variants',
      tzolkinDays: {
        'Ajaw': { canonical: 'Ajaw', alternatives: ['Ahau', 'Ajau'] }
      },
      haabMonths: {
        'Kumk\'u': { canonical: 'Kumk\'u', alternatives: ['Kumku', 'Cumku'] }
      }
    };
    i18n.registerLocale(localeDef);

    const factory = new CalendarRoundFactory();
    
    const cr1 = factory.parse('4 Ahau 8 Kumku');
    const cr2 = factory.parse('4 Ajau 8 Cumku');
    const cr3 = factory.parse('4 Ajaw 8 Kumk\'u');
    
    expect(cr1.toString()).to.equal('4 Ajaw 8 Kumk\'u');
    expect(cr2.toString()).to.equal('4 Ajaw 8 Kumk\'u');
    expect(cr3.toString()).to.equal('4 Ajaw 8 Kumk\'u');
    expect(cr1.equal(cr2)).to.equal(true);
    expect(cr2.equal(cr3)).to.equal(true);
  });
});

describe('I18n with component rendering', () => {
  let i18n: I18nManager;

  beforeEach(() => {
    i18n = getI18nManager();
    i18n.reset();
  });

  it('should render TzolkinDay with toLocaleString', () => {
    const localeDef: LocaleDefinition = {
      locale: 'simplified',
      name: 'Simplified',
      tzolkinDays: {
        'Imix': { canonical: 'Imish', alternatives: [] },
        'Ik\'': { canonical: 'Ik', alternatives: [] }
      }
    };
    i18n.registerLocale(localeDef);

    const dayResult = getTzolkinDay('Imix');
    expect(isWildcard(dayResult)).to.equal(false);
    
    const day = dayResult as TzolkinDay;
    expect(day.toString()).to.equal('Imix');
    expect(day.toLocaleString('simplified')).to.equal('Imish');
  });

  it('should render HaabMonth with toLocaleString', () => {
    const localeDef: LocaleDefinition = {
      locale: 'simplified',
      name: 'Simplified',
      haabMonths: {
        'Pop': { canonical: 'Pohp', alternatives: [] },
        'K\'ayab': { canonical: 'Kayab', alternatives: [] }
      }
    };
    i18n.registerLocale(localeDef);

    const monthResult = getHaabMonth('Pop');
    expect(isWildcard(monthResult)).to.equal(false);
    
    const month = monthResult as HaabMonth;
    expect(month.toString()).to.equal('Pop');
    expect(month.toLocaleString('simplified')).to.equal('Pohp');
  });
});
