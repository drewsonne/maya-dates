/**
 * Diagnostic test to investigate year boundary failures
 */

import 'mocha'
import {expect} from 'chai'
import * as moonbeams from "moonbeams";
import LongCountFactory from "../factory/long-count";
import { getCorrelationConstant } from "../lc/correlation-constant";

describe('Diagnostic: Year Boundary Investigation', () => {
  const corr = getCorrelationConstant("GMT");
  const lcFactory = new LongCountFactory();

  describe('THEORY 1: Leap Year Boundary Problem', () => {
    it('should identify leap year status for test years', () => {
      const checkLeapYear = (year: number) => year % 4 === 0;
      
      console.log('\n  Leap Year Status:');
      console.log('    642:', checkLeapYear(642) ? 'LEAP YEAR' : 'Not a leap year');
      console.log('    643:', checkLeapYear(643) ? 'LEAP YEAR' : 'Not a leap year');
      console.log('    721:', checkLeapYear(721) ? 'LEAP YEAR' : 'Not a leap year');
      console.log('    722:', checkLeapYear(722) ? 'LEAP YEAR' : 'Not a leap year');
      
      expect(checkLeapYear(642)).to.be.false;
      expect(checkLeapYear(643)).to.be.false;
    });
  });

  describe('THEORY 2: GMT Correlation & JDN Calculation', () => {
    it('should calculate correct JDN for 9.10.10.1.6', () => {
      const lc = lcFactory.parse("9.10.10.1.6").setCorrelationConstant(corr);
      const mayaDay = lc.getPosition();
      const jdn = lc.julianDay;
      
      console.log(`\n  Testing 9.10.10.1.6:`);
      console.log(`    Maya day position: ${mayaDay}`);
      console.log(`    Correlation constant: ${corr.value}`);
      console.log(`    Calculated JDN: ${jdn}`);
      console.log(`    Offset applied: ${lc.gregorian.offset}`);
      console.log(`    JDN + offset: ${jdn + lc.gregorian.offset}`);
      
      // Test moonbeams with different offsets
      console.log(`\n    Testing offsets around the boundary:`);
      for (let offset = 4; offset <= 7; offset++) {
        const date = moonbeams.jdToCalendar(jdn + offset);
        const year = date.year < 0 ? Math.abs(date.year - 1) : date.year;
        const era = date.year < 0 ? 'BCE' : 'CE';
        const dateStr = `${Math.floor(date.day)}/${date.month}/${year} ${era}`;
        console.log(`      offset +${offset}: ${dateStr}`);
      }
      
      console.log(`    Current result: ${lc.gregorian.toString()}`);
      console.log(`    Expected: 1/1/643 CE`);
      
      expect(jdn).to.be.a('number');
    });

    it('should calculate correct JDN for 9.14.10.4.2', () => {
      const lc = lcFactory.parse("9.14.10.4.2").setCorrelationConstant(corr);
      const jdn = lc.julianDay;
      
      console.log(`\n  Testing 9.14.10.4.2:`);
      console.log(`    JDN: ${jdn}`);
      console.log(`    Offset applied: ${lc.gregorian.offset}`);
      
      // Test moonbeams with different offsets
      console.log(`\n    Testing offsets:`);
      for (let offset = 4; offset <= 7; offset++) {
        const date = moonbeams.jdToCalendar(jdn + offset);
        const year = date.year < 0 ? Math.abs(date.year - 1) : date.year;
        const era = date.year < 0 ? 'BCE' : 'CE';
        const dateStr = `${Math.floor(date.day)}/${date.month}/${year} ${era}`;
        console.log(`      offset +${offset}: ${dateStr}`);
      }
      
      console.log(`    Current result: ${lc.gregorian.toString()}`);
      console.log(`    Expected: 30/12/721 CE`);
    });
  });

  describe('THEORY 3: Offset Table Analysis', () => {
    it('should show which offset range failing dates fall into', () => {
      const test1 = lcFactory.parse("9.10.10.1.6").setCorrelationConstant(corr);
      const test2 = lcFactory.parse("9.14.10.4.2").setCorrelationConstant(corr);
      
      console.log('\n  Offset table critical ranges:');
      console.log('    ≤ 1887864 → offset +1  (9.1.1.1.1 - 456 CE)');
      console.log('    ≤ 2031864 → offset +4  (10.1.1.1.1 - 850 CE)');
      console.log('    ≤ 2096664 → offset +6  (10.10.1.1.1 - 1028 CE)');
      
      console.log(`\n  9.10.10.1.6:`);
      console.log(`    JDN: ${test1.julianDay}`);
      console.log(`    Applied offset: ${test1.gregorian.offset}`);
      console.log(`    In range: ${test1.julianDay <= 2031864 ? '≤ 2031864 (+4)' : test1.julianDay <= 2096664 ? '≤ 2096664 (+6)' : '> 2096664'}`);
      
      console.log(`\n  9.14.10.4.2:`);
      console.log(`    JDN: ${test2.julianDay}`);
      console.log(`    Applied offset: ${test2.gregorian.offset}`);
      console.log(`    In range: ${test2.julianDay <= 2031864 ? '≤ 2031864 (+4)' : test2.julianDay <= 2096664 ? '≤ 2096664 (+6)' : '> 2096664'}`);
      
      // Test a passing case for comparison
      const passing = lcFactory.parse("9.8.9.13.0").setCorrelationConstant(corr);
      console.log(`\n  9.8.9.13.0 (passing case):`);
      console.log(`    JDN: ${passing.julianDay}`);
      console.log(`    Applied offset: ${passing.gregorian.offset}`);
      console.log(`    Result: ${passing.gregorian.toString()}`);
    });
  });
});
