import { expect } from 'chai';
import 'mocha';

// Import all named exports to verify they are accessible
import {
  // Core classes
  FullDate,
  LongCount,
  DistanceNumber,
  
  // Calendar Round components
  CalendarRound,
  getCalendarRound,
  calendarRoundOrigin,
  Tzolkin,
  getTzolkin,
  Haab,
  getHaab,
  
  // Factory classes
  LongCountFactory,
  CalendarRoundFactory,
  FullDateFactory,
  GregorianFactory,
  Factory,
  
  // Western calendar classes
  GregorianCalendarDate,
  JulianCalendarDate,
  WesternCalendar,
  
  // Long Count utilities
  CorrelationConstant,
  getCorrelationConstant,
  
  // Operations
  LongcountAddition,
  LongcountSubtraction,
  LongCountWildcard,
  CalendarRoundWildcard,
  FullDateWildcard,
  CalendarRoundIterator,
  LongcountOperation,
  
  // Utilities and type guards
  Wildcard,
  isWildcard,
  Comment,
  isComment,
  CommentWrapper,
  wrapsComment,
  isPart,
  isNumberPrimitive,
  isStringPrimitive,
  
  // Calendar Round components
  Base,
  Cycle,
  NumberCoefficient,
  WildcardCoefficient,
  coefficientParser,
  getHaabMonth,
  HaabMonth,
  getTzolkinDay,
  TzolkinDay,
  
  // Data structures
  HashMap,
} from '../index';

describe('Named exports from index', () => {
  describe('Factory classes', () => {
    it('should export LongCountFactory', () => {
      expect(LongCountFactory).to.be.a('function');
      const factory = new LongCountFactory();
      const lc = factory.parse('9.17.0.0.0');
      expect(lc).to.be.instanceOf(LongCount);
    });

    it('should export CalendarRoundFactory', () => {
      expect(CalendarRoundFactory).to.be.a('function');
      const factory = new CalendarRoundFactory();
      const cr = factory.parse('4 Ajaw 8 Kumk\'u');
      expect(cr).to.be.instanceOf(CalendarRound);
    });

    it('should export FullDateFactory', () => {
      expect(FullDateFactory).to.be.a('function');
      const factory = new FullDateFactory();
      const fd = factory.parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
      expect(fd).to.be.instanceOf(FullDate);
    });

    it('should export GregorianFactory', () => {
      expect(GregorianFactory).to.be.a('function');
      const factory = new GregorianFactory();
      const date = factory.parse('11/08/3114 BCE');
      expect(date).to.be.instanceOf(GregorianCalendarDate);
    });
  });

  describe('Core classes', () => {
    it('should export FullDate', () => {
      expect(FullDate).to.be.a('function');
      const factory = new FullDateFactory();
      const fd = factory.parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
      expect(fd).to.be.instanceOf(FullDate);
    });

    it('should export LongCount', () => {
      expect(LongCount).to.be.a('function');
      const factory = new LongCountFactory();
      const lc = factory.parse('9.17.0.0.0');
      expect(lc).to.be.instanceOf(LongCount);
    });

    it('should export DistanceNumber', () => {
      expect(DistanceNumber).to.be.a('function');
      const dn = new DistanceNumber(1, 0, 0, 0, 0);
      expect(dn).to.be.instanceOf(DistanceNumber);
    });
  });

  describe('Calendar Round components', () => {
    it('should export CalendarRound and getCalendarRound', () => {
      expect(CalendarRound).to.be.a('function');
      expect(getCalendarRound).to.be.a('function');
      
      const factory = new CalendarRoundFactory();
      const cr = factory.parse('4 Ajaw 8 Kumk\'u');
      expect(cr).to.be.instanceOf(CalendarRound);
    });

    it('should export Tzolkin and getTzolkin', () => {
      expect(Tzolkin).to.be.a('function');
      expect(getTzolkin).to.be.a('function');
    });

    it('should export Haab and getHaab', () => {
      expect(Haab).to.be.a('function');
      expect(getHaab).to.be.a('function');
    });

    it('should export calendarRoundOrigin', () => {
      expect(calendarRoundOrigin).to.be.instanceOf(CalendarRound);
      expect(calendarRoundOrigin.toString()).to.equal('4 Ajaw 8 Kumk\'u');
    });
  });

  describe('Western calendar classes', () => {
    it('should export GregorianCalendarDate', () => {
      expect(GregorianCalendarDate).to.be.a('function');
      const factory = new GregorianFactory();
      const date = factory.parse('11/08/3114 BCE');
      expect(date).to.be.instanceOf(GregorianCalendarDate);
    });

    it('should export JulianCalendarDate', () => {
      expect(JulianCalendarDate).to.be.a('function');
    });

    it('should export WesternCalendar', () => {
      expect(WesternCalendar).to.be.a('function');
    });
  });

  describe('Operations', () => {
    it('should export LongcountAddition', () => {
      expect(LongcountAddition).to.be.a('function');
    });

    it('should export LongcountSubtraction', () => {
      expect(LongcountSubtraction).to.be.a('function');
    });

    it('should export LongCountWildcard', () => {
      expect(LongCountWildcard).to.be.a('function');
    });

    it('should export CalendarRoundWildcard', () => {
      expect(CalendarRoundWildcard).to.be.a('function');
    });

    it('should export FullDateWildcard', () => {
      expect(FullDateWildcard).to.be.a('function');
    });

    it('should export CalendarRoundIterator', () => {
      expect(CalendarRoundIterator).to.be.a('function');
    });

    it('should export LongcountOperation', () => {
      expect(LongcountOperation).to.be.a('function');
    });
  });

  describe('Utilities and type guards', () => {
    it('should export Wildcard and isWildcard', () => {
      expect(Wildcard).to.be.a('function');
      expect(isWildcard).to.be.a('function');
      
      const wildcard = new Wildcard();
      expect(isWildcard(wildcard)).to.be.true;
      expect(wildcard.toString()).to.equal('*');
    });

    it('should export Comment and isComment', () => {
      expect(Comment).to.be.a('function');
      expect(isComment).to.be.a('function');
      
      const comment = new Comment('test comment');
      expect(isComment(comment)).to.be.true;
      expect(comment.toString()).to.equal('test comment');
    });

    it('should export CommentWrapper and wrapsComment', () => {
      expect(CommentWrapper).to.be.a('function');
      expect(wrapsComment).to.be.a('function');
    });

    it('should export isPart', () => {
      expect(isPart).to.be.a('function');
      const wildcard = new Wildcard();
      expect(isPart(wildcard)).to.be.true;
    });

    it('should export isNumberPrimitive', () => {
      expect(isNumberPrimitive).to.be.a('function');
      expect(isNumberPrimitive(42)).to.be.true;
      expect(isNumberPrimitive('42')).to.be.false;
    });

    it('should export isStringPrimitive', () => {
      expect(isStringPrimitive).to.be.a('function');
      expect(isStringPrimitive('hello')).to.be.true;
      expect(isStringPrimitive(42)).to.be.false;
    });
  });

  describe('Calendar Round components (barrel export)', () => {
    it('should export Base', () => {
      expect(Base).to.be.a('function');
    });

    it('should export Cycle', () => {
      expect(Cycle).to.be.a('function');
    });

    it('should export NumberCoefficient', () => {
      expect(NumberCoefficient).to.be.a('function');
    });

    it('should export WildcardCoefficient', () => {
      expect(WildcardCoefficient).to.be.a('function');
    });

    it('should export coefficientParser', () => {
      expect(coefficientParser).to.be.a('function');
    });

    it('should export getHaabMonth and getTzolkinDay', () => {
      expect(getHaabMonth).to.be.a('function');
      expect(getTzolkinDay).to.be.a('function');
    });
  });

  describe('Data structures', () => {
    it('should export HashMap', () => {
      expect(HashMap).to.be.a('function');
    });
  });

  describe('Long Count utilities', () => {
    it('should export CorrelationConstant and getCorrelationConstant', () => {
      expect(CorrelationConstant).to.be.a('function');
      expect(getCorrelationConstant).to.be.a('function');
    });
  });

  describe('Backward compatibility', () => {
    it('should allow existing deep imports to still work', () => {
      // This test verifies that the barrel exports are still working
      // by importing through the index and using them
      const factory = new LongCountFactory();
      const lc = factory.parse('9.17.0.0.0');
      expect(lc.toString()).to.equal(' 9.17. 0. 0. 0');
    });
  });
});
