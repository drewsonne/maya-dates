/**
 * Calculate exact offset boundaries needed for failing test cases
 */

import 'mocha'
import {expect} from 'chai'
import * as moonbeams from "moonbeams";
import LongCountFactory from "../factory/long-count";
import { getCorrelationConstant } from "../lc/correlation-constant";

describe('Calculate Exact Offset Boundaries', () => {
  const corr = getCorrelationConstant("GMT");
  const lcFactory = new LongCountFactory();

  it('should find the exact offset needed for 9.10.10.1.6', () => {
    const lc = lcFactory.parse("9.10.10.1.6").setCorrelationConstant(corr);
    const jdn = lc.julianDay;
    
    console.log(`\n  Testing 9.10.10.1.6 (JDN ${jdn}):`);
    console.log(`  Expected: 1/1/643 CE (or 0643-01-01)`);
    
    // Test all offsets from 0 to 10
    for (let offset = 0; offset <= 10; offset++) {
      const date = moonbeams.jdToCalendar(jdn + offset);
      const year = date.year < 0 ? Math.abs(date.year - 1) : date.year;
      const era = date.year < 0 ? 'BCE' : 'CE';
      const dateStr = `${Math.floor(date.day)}/${date.month}/${year} ${era}`;
      const isoStr = `${String(year).padStart(4, '0')}-${String(date.month).padStart(2, '0')}-${String(Math.floor(date.day)).padStart(2, '0')}`;
      
      if (isoStr === '0643-01-01') {
        console.log(`  ✓ Offset ${offset}: ${dateStr} (${isoStr}) CORRECT!`);
      } else {
        console.log(`    Offset ${offset}: ${dateStr} (${isoStr})`);
      }
    }
  });

  it('should find the exact offset needed for 9.14.10.4.2', () => {
    const lc = lcFactory.parse("9.14.10.4.2").setCorrelationConstant(corr);
    const jdn = lc.julianDay;
    
    console.log(`\n  Testing 9.14.10.4.2 (JDN ${jdn}):`);
    console.log(`  Expected: 30/12/721 CE (or 0721-12-30)`);
    
    // Test all offsets from 0 to 10
    for (let offset = 0; offset <= 10; offset++) {
      const date = moonbeams.jdToCalendar(jdn + offset);
      const year = date.year < 0 ? Math.abs(date.year - 1) : date.year;
      const era = date.year < 0 ? 'BCE' : 'CE';
      const dateStr = `${Math.floor(date.day)}/${date.month}/${year} ${era}`;
      const isoStr = `${String(year).padStart(4, '0')}-${String(date.month).padStart(2, '0')}-${String(Math.floor(date.day)).padStart(2, '0')}`;
      
      if (isoStr === '0721-12-30') {
        console.log(`  ✓ Offset ${offset}: ${dateStr} (${isoStr}) CORRECT!`);
      } else {
        console.log(`    Offset ${offset}: ${dateStr} (${isoStr})`);
      }
    }
  });

  it('should determine offset boundary ranges', () => {
    console.log(`\n  Recommended offset table updates:`);
    console.log(`  Based on failing cases:`);
    console.log(`    JDN 1955909 (9.10.10.1.6 → 643 CE) needs offset +5`);
    console.log(`    JDN 1984765 (9.14.10.4.2 → 721 CE) needs offset +2 or +3`);
    console.log();
    console.log(`  Current table has:`);
    console.log(`    ≤ 1887864 → offset +1`);
    console.log(`    ≤ 2031864 → offset +4  ← This range is too wide!`);
    console.log(`    ≤ 2096664 → offset +6`);
    console.log();
    console.log(`  Suggested refinement:`);
    console.log(`    ≤ 1887864 → offset +1`);
    console.log(`    ≤ 1955000 → offset +4  (up to ~642 CE)`);
    console.log(`    ≤ 1985000 → offset +5  (643-721 CE)`);
    console.log(`    ≤ 2031864 → offset +3  (722-850 CE) ???`);
    console.log();
    console.log(`  Note: Offsets going DOWN doesn't make sense!`);
    console.log(`  Need to investigate the moonbeams library behavior...`);
  });

  it('should test nearby passing dates for comparison', () => {
    const testCases = [
      { lc: "9.8.9.13.0", expectedYear: "603" },   // Known passing
      { lc: "9.10.2.6.6", expectedYear: "635" },   // Known passing
      { lc: "9.10.10.1.6", expectedYear: "643" },  // Failing
      { lc: "9.10.11.17.0", expectedYear: "644" }, // Known passing
      { lc: "9.14.8.14.15", expectedYear: "720" }, // Known passing
      { lc: "9.14.10.4.2", expectedYear: "721" },  // Failing
    ];
    
    console.log(`\n  Testing offset behavior across the range:`);
    testCases.forEach(tc => {
      const lc = lcFactory.parse(tc.lc).setCorrelationConstant(corr);
      const jdn = lc.julianDay;
      const result = lc.gregorian.toString();
      const offset = lc.gregorian.offset;
      const hasExpectedYear = result.includes(tc.expectedYear);
      
      console.log(`    ${tc.lc}: JDN ${jdn}, offset ${offset} → ${result} ${hasExpectedYear ? '✓' : '✗'}`);
    });
  });
});
