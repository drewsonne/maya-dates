/**
 * Diagnostic test to investigate year boundary failures
 * Testing theories about why 9.10.10.1.6 and 9.14.10.4.2 fail at year boundaries
 */

import * as moonbeams from "moonbeams";
import LongCountFactory from "./src/factory/long-count";
import { getCorrelationConstant } from "./src/lc/correlation-constant";

console.log("=== DIAGNOSTIC TEST FOR YEAR BOUNDARY FAILURES ===\n");

// Test data
const failingCases = [
  {
    lc: "9.10.10.1.6",
    expected_gregorian: "0643-01-01",
    expected_julian: "0642-12-29",
    actual_result: "31/12/642 CE"
  },
  {
    lc: "9.14.10.4.2",
    expected_gregorian: "0721-12-30",
    expected_julian: "0721-12-27",
    actual_result: "1/1/722 CE"
  }
];

const corr = getCorrelationConstant("GMT");
const lcFactory = new LongCountFactory();

console.log("THEORY 1: Leap Year Boundary Problem");
console.log("=" .repeat(60));

// Check if the years are leap years
const checkLeapYear = (year: number) => {
  // Julian calendar: divisible by 4
  return year % 4 === 0;
};

console.log("Leap Year Status:");
console.log("  642:", checkLeapYear(642) ? "LEAP YEAR" : "Not a leap year");
console.log("  643:", checkLeapYear(643) ? "LEAP YEAR" : "Not a leap year");
console.log("  721:", checkLeapYear(721) ? "LEAP YEAR" : "Not a leap year");
console.log("  722:", checkLeapYear(722) ? "LEAP YEAR" : "Not a leap year");
console.log();

console.log("THEORY 2: GMT Correlation & JDN Calculation");
console.log("=".repeat(60));

failingCases.forEach((testCase) => {
  console.log(`\nTesting ${testCase.lc}:`);
  
  // Parse the long count
  const lc = lcFactory.parse(testCase.lc).setCorrelationConstant(corr);
  
  // Get the Maya day position
  const mayaDay = lc.getPosition();
  console.log(`  Maya day position: ${mayaDay}`);
  
  // Calculate JDN
  const jdn = corr.value + mayaDay;
  console.log(`  Correlation constant: ${corr.value}`);
  console.log(`  Calculated JDN: ${jdn}`);
  
  // Get the offset for this JDN
  const gregorian = lc.gregorian;
  console.log(`  Offset applied: ${gregorian.offset}`);
  console.log(`  JDN + offset: ${jdn + gregorian.offset}`);
  
  // Test moonbeams directly with different offsets
  console.log(`\n  Testing moonbeams.jdToCalendar with various offsets:`);
  for (let offset = -10; offset <= 10; offset++) {
    const date = moonbeams.jdToCalendar(jdn + offset);
    const year = date.year < 0 ? Math.abs(date.year - 1) : date.year;
    const era = date.year < 0 ? 'BCE' : 'CE';
    const dateStr = `${Math.floor(date.day)}/${date.month}/${year} ${era}`;
    
    // Check if this matches expected
    const matchesExpected = dateStr.includes(testCase.expected_gregorian.split('-')[0]);
    console.log(`    offset ${offset > 0 ? '+' + offset : offset}: ${dateStr} ${matchesExpected ? '✓ MATCH' : ''}`);
  }
  
  console.log(`  Current result: ${gregorian.toString()}`);
  console.log(`  Expected: ${testCase.expected_gregorian}`);
});

console.log("\n" + "=".repeat(60));
console.log("THEORY 3: Proleptic Gregorian Offset Table");
console.log("=".repeat(60));

// Display the offset table from gregorian.ts
console.log("\nOffset table boundaries:");
const offsetRanges = [
  { jdn: "≤ 1448283", offset: -8, description: "6.0.0.0.0 (748 BCE)" },
  { jdn: "≤ 1455864", offset: -8, description: "6.1.1.1.1 (728 BCE)" },
  { jdn: "≤ 1599864", offset: -5, description: "7.1.1.1.1 (333 BCE)" },
  { jdn: "≤ 1743864", offset: -2, description: "8.1.1.1.1 (62 CE)" },
  { jdn: "≤ 1887864", offset: 1, description: "9.1.1.1.1 (456 CE)" },
  { jdn: "≤ 2031864", offset: 4, description: "10.1.1.1.1 (850 CE)" },
  { jdn: "≤ 2096664", offset: 6, description: "10.10.1.1.1 (1028 CE)" },
  { jdn: "≤ 2175864", offset: 7, description: "11.1.1.1.1 (1245 CE)" },
  { jdn: "≤ 2240664", offset: 9, description: "11.10.1.1.1 (1422 CE)" },
  { jdn: "≤ 2299160", offset: 10, description: "11.18.3.9.17 (1582 CE)" },
  { jdn: "= 2299160", offset: 0, description: "Threshold" },
];

offsetRanges.forEach(range => {
  console.log(`  ${range.jdn.padEnd(15)} → offset ${String(range.offset).padStart(3)} | ${range.description}`);
});

console.log("\nChecking JDN positions for our failing cases:");
failingCases.forEach((testCase) => {
  const lc = lcFactory.parse(testCase.lc).setCorrelationConstant(corr);
  const jdn = lc.julianDay;
  
  console.log(`\n  ${testCase.lc}:`);
  console.log(`    JDN: ${jdn}`);
  
  // Find which range it falls into
  if (jdn <= 1887864) {
    console.log(`    Falls in: ≤ 1887864 (offset +1)`);
  } else if (jdn <= 2031864) {
    console.log(`    Falls in: ≤ 2031864 (offset +4)`);
  } else if (jdn <= 2096664) {
    console.log(`    Falls in: ≤ 2096664 (offset +6)`);
  } else {
    console.log(`    Falls in: > 2096664`);
  }
  
  console.log(`    Applied offset: ${lc.gregorian.offset}`);
});

console.log("\n" + "=".repeat(60));
console.log("CROSS-VALIDATION: Testing nearby successful dates");
console.log("=".repeat(60));

// Test a date that passes to see what offset it uses
const passingCase = "9.8.9.13.0"; // This one passes in the tests
console.log(`\nTesting ${passingCase} (known passing case):`);
const passingLc = lcFactory.parse(passingCase).setCorrelationConstant(corr);
console.log(`  JDN: ${passingLc.julianDay}`);
console.log(`  Offset: ${passingLc.gregorian.offset}`);
console.log(`  Result: ${passingLc.gregorian.toString()}`);

console.log("\n=== END DIAGNOSTIC TEST ===");
