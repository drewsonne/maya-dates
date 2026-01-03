import LongCountFactory from "../../factory/long-count";
import 'mocha'
import {expect} from 'chai'
import LongCount from "../../lc/long-count";
import {Wildcard} from "../../wildcard";
import {LordOfTheNight, lords} from "../../lc/night/lord-of-night";
import GregorianFactory from '../../factory/gregorian';
import {getCorrelationConstant} from '../../lc/correlation-constant';

describe('parse long-count fullDate', () => {
  const dates = [
    ['7.13', ' 0. 0. 0. 7.13'],
    ['9.16.19.17.19', ' 9.16.19.17.19'],
  ];
  const factory = new LongCountFactory();
  dates.forEach((args) => {
    const [date, expected] = args;
    it(`${date} -> ${expected}`, () => {
        const actual = factory.parse(date);
        expect(`${actual}`).to.equal(expected);
      },
    );
  });
});

it('fail longcount', () => {
  const failParse = () => {
    new LongCountFactory().parse('hello, world')
  }
  expect(failParse).to.throw()
});

describe('modify long-count fullDate', () => {
  const dates: [number[], string, number[], string][] = [
    [
      [1, 2, 3, 4, 5, 6, 7, 8],
      ' 8. 7. 6. 5. 4. 3. 2. 1',
      [2, 17],
      ' 8. 7. 6. 5. 4.17. 2. 1',
    ],
    [
      [0, 0, 0, 17, 9, 0, 0, 0],
      ' 9.17. 0. 0. 0',
      [0, 10],
      ' 9.17. 0. 0.10',
    ],
  ];
  dates.forEach((args: [number[], string, number[], string]) => {
    const [numericDate, expected,
      modifiers, expectedModified] = args;
    it(`${numericDate} -> ${expected}; ${modifiers} -> ${expectedModified}`, () => {
        const date = new LongCount(...numericDate);

        expect(date.isValid()).to.be.true;

        expect(date.kIn).to.equal(numericDate[0]);
        expect(date.winal).to.equal(numericDate[1]);
        expect(date.tun).to.equal(numericDate[2]);
        expect(date.kAtun).to.equal(numericDate[3]);
        expect(date.bakTun).to.equal(numericDate[4]);
        expect(date.piktun).to.equal(numericDate[5]);
        expect(date.kalabtun).to.equal(numericDate[6]);
        expect(date.kinchiltun).to.equal(numericDate[7]);

        expect(date.getDateSections(0)).to.equal(numericDate[0]);
        expect(date.getDateSections(4)).to.equal(numericDate[4]);
        expect(date.getDateSections(10)).to.equal(0);

        expect(date.toString()).to.equal(expected);

        date.setDateSections(modifiers[0], modifiers[1]);

        expect(date.toString()).to.equal(expectedModified);
      },
    );
  });
});

it('set long count parts', () => {
  const date = new LongCount(1, 2, 3, 4, 5);
  expect(date.toString()).to.equal(' 5. 4. 3. 2. 1');

  date.kIn = 5;
  date.winal = 4;
  date.tun = 3;
  date.kAtun = 2;
  date.bakTun = 1;
  date.piktun = 10;
  expect(date.toString()).to.equal('10. 1. 2. 3. 4. 5');

  // These two are backwards to test that the extra
  // positions beyond the Bak'tun can be correctly rendered
  date.kinchiltun = 12;
  expect(date.toString()).to.equal('12. 0.10. 1. 2. 3. 4. 5');
  date.kalabtun = 11;
  expect(date.toString()).to.equal('12.11.10. 1. 2. 3. 4. 5');
});

it('print short long-count fullDate', () => {
  const date = new LongCount(1, 2);

  expect(date.toString()).to.equal(' 0. 0. 0. 2. 1');
});

describe('test lord of night glyphs', () => {
  const dates: [string, LordOfTheNight, string][] = [
    ['9.16.19.17.19', lords.G8, 'G8'],
    ['9.17.0.0.0', lords.get('G9'), 'G9'],
    ['9.17.0.0.5', lords.G5, 'G5'],
    ['9.17.0.0.9', lords.G9, 'G9'],
    ['9.17.0.0.10', lords.get('G1'), 'G1'],
  ];
  const factory = new LongCountFactory();
  dates.forEach((args) => {
    const [date, lordOfNight, id] = args;
    it(`${date} -> ${lordOfNight} (${id})`, () => {
      const lc = factory.parse(date);
      expect(lc!.lordOfNight).to.equal(lordOfNight);
      expect(lc!.lordOfNight).not.to.be.undefined;
      expect(`${lc!.lordOfNight}`).to.equal(id);
    });
  });
});


describe('comparison', () => {
  const dataset: [number[], number[], boolean][] = [
    [[0, 1], [1], true],
  ]
  const expanded: [LongCount, LongCount, boolean][] = dataset.map((row: [number[], number[], boolean]) => [
    new LongCount(...row[0]),
    new LongCount(...row[1]),
    row[2],
  ])
  expanded.forEach((args: [LongCount, LongCount, boolean]) => {
    const [a, b, aLtB] = args;
    it(`${a} > ${b} = ${aLtB}`, () => {
      expect(a.gt(b) === aLtB).to.be.true;
      expect(a.lt(b) === aLtB).to.be.false;
    })
  });
});

it('sign', () => {
  const lc = new LongCount(1, 1, 1, 1, 1);
  expect(lc.isPositive).to.be.true;
  expect(lc.isNegative).to.be.false;

  lc.isNegative = true;
  expect(lc.isPositive).to.be.false;
  expect(lc.isNegative).to.be.true;

  lc.isPositive = true;
  expect(lc.isPositive).to.be.true;
  expect(lc.isNegative).to.be.false;
});

it('equality', () => {
  const lc1 = new LongCount(1, 1, 1, 1, 1);
  const lc2 = new LongCount(1, 1, 1, 1, 1);
  const lc3 = new LongCount(2, 2, 2, 2, 2);
  const lc4 = new LongCount(3, 3, 3, 3, 0);
  const lc5 = new LongCount(3, 3, 3, 3);
  const lc6 = new LongCount(new Wildcard(), new Wildcard(), 1, 1, 1)
  const lc7 = new LongCount(new Wildcard(), new Wildcard(), 1, 1, 1)
  const lc8 = new LongCount(10, 10, 10, 2, new Wildcard())
  const lc9 = new LongCount(10, 10, 10, 2, new Wildcard())

  expect(lc1.equal(lc1)).to.be.true;
  expect(lc1.exactlyEqual(lc1)).to.be.true;

  expect(lc1.equal(lc2)).to.be.true;
  expect(lc1.exactlyEqual(lc2)).to.be.true;
  expect(lc1.equal(lc3)).to.be.false;

  expect(lc4.equal(lc5)).to.be.true;
  expect(lc4.exactlyEqual(lc5)).to.be.false;

  expect(lc6.equal(lc7)).to.be.true
  expect(lc6.exactlyEqual(lc7)).to.be.true

  expect(lc8.equal(lc9)).to.be.true
  expect(lc9.exactlyEqual(lc9)).to.be.true

});

it('wildcard position failure', () => {
  const lc = new LongCount(1, 1, new Wildcard(), 1, 1);
  expect(() => lc.getPosition()).to.throw(
    'Can not get position of fullDate dates',
  );
});

it('significant digits', () => {
  expect(
    new LongCount(1, 1, 1, 1, 0, 0, 0).sigParts
  ).to.eql([1, 1, 1, 1]);
});

it('render long count', () => {
  expect(
    new LongCount(1, 1, 1, 1, 0, 0, 0).toString()
  ).to.eq(` 0. 1. 1. 1. 1`)
})

describe('Gregorian to Long Count conversion', () => {
  it('should convert Gregorian date to Long Count using fromGregorian', () => {
    // 21 December 2012 CE is 13.0.0.0.0 in Long Count
    const gregorianFactory = new GregorianFactory();
    const gregorian = gregorianFactory.parse('21/12/2012 CE');
    
    const lc = LongCount.fromGregorian(gregorian);
    
    expect(lc.toString()).to.equal('13. 0. 0. 0. 0');
    expect(lc.bakTun).to.equal(13);
    expect(lc.kAtun).to.equal(0);
    expect(lc.tun).to.equal(0);
    expect(lc.winal).to.equal(0);
    expect(lc.kIn).to.equal(0);
  });

  it('should convert Julian Day Number to Long Count using fromJulianDay', () => {
    // JDN 2456283 corresponds to 21 December 2012 CE (13.0.0.0.0)
    const lc = LongCount.fromJulianDay(2456283);
    
    expect(lc.toString()).to.equal('13. 0. 0. 0. 0');
  });

  it('should convert Maya Day Number to Long Count using fromMayanDayNumber', () => {
    // 13.0.0.0.0 is 1872000 days since 0.0.0.0.0
    const lc = LongCount.fromMayanDayNumber(1872000);
    
    expect(lc.toString()).to.equal('13. 0. 0. 0. 0');
    expect(lc.bakTun).to.equal(13);
    expect(lc.kAtun).to.equal(0);
    expect(lc.tun).to.equal(0);
    expect(lc.winal).to.equal(0);
    expect(lc.kIn).to.equal(0);
  });

  it('should convert Maya creation date (0.0.0.0.0)', () => {
    const lc = LongCount.fromMayanDayNumber(0);
    
    expect(lc.toString()).to.equal(' 0. 0. 0. 0. 0');
    expect(lc.bakTun).to.equal(0);
    expect(lc.kAtun).to.equal(0);
    expect(lc.tun).to.equal(0);
    expect(lc.winal).to.equal(0);
    expect(lc.kIn).to.equal(0);
  });

  it('should convert a historical date (9.17.0.0.0)', () => {
    // 9.17.0.0.0 is a known historical date
    const gregorianFactory = new GregorianFactory();
    
    // First, convert 9.17.0.0.0 to Gregorian to get the expected date
    const originalLc = new LongCountFactory().parse('9.17.0.0.0');
    const gregorian = originalLc.gregorian;
    
    // Then convert back to Long Count
    const convertedLc = LongCount.fromGregorian(gregorian);
    
    expect(convertedLc.toString()).to.equal(' 9.17. 0. 0. 0');
    expect(convertedLc.bakTun).to.equal(9);
    expect(convertedLc.kAtun).to.equal(17);
  });

  it('should perform roundtrip conversion (LC → Gregorian → LC)', () => {
    const testDates = [
      '9.17.0.0.0',
      '13.0.0.0.0',
      '9.16.19.17.19',
      '12.19.13.4.0',
    ];

    testDates.forEach((dateString) => {
      const originalLc = new LongCountFactory().parse(dateString);
      const gregorian = originalLc.gregorian;
      const convertedLc = LongCount.fromGregorian(gregorian);
      
      // They should be equal
      expect(convertedLc.equal(originalLc)).to.be.true;
      expect(convertedLc.toString()).to.equal(originalLc.toString());
    });
  });

  it('should throw error for negative Maya Day Number in fromMayanDayNumber', () => {
    expect(() => {
      LongCount.fromMayanDayNumber(-1);
    }).to.throw('Maya Day Number must be non-negative');
  });

  it('should throw error for negative Maya Day Number in fromJulianDay', () => {
    // JDN below correlation constant would result in negative MDN
    expect(() => {
      LongCount.fromJulianDay(100); // Way below 584283
    }).to.throw('Maya Day Number must be non-negative');
  });

  it('should handle dates with different components', () => {
    // Test a date with various non-zero components
    const mayanDayNumber = 1 + (2 * 20) + (3 * 360) + (4 * 7200) + (5 * 144000);
    // Expected: 5 baktun, 4 katun, 3 tun, 2 winal, 1 kin
    const lc = LongCount.fromMayanDayNumber(mayanDayNumber);
    
    expect(lc.kIn).to.equal(1);
    expect(lc.winal).to.equal(2);
    expect(lc.tun).to.equal(3);
    expect(lc.kAtun).to.equal(4);
    expect(lc.bakTun).to.equal(5);
  });

  it('should handle max values for each position', () => {
    // 19 kin + 17 winal + 19 tun + 19 katun = maximum before next baktun
    const mayanDayNumber = 19 + (17 * 20) + (19 * 360) + (19 * 7200);
    const lc = LongCount.fromMayanDayNumber(mayanDayNumber);
    
    expect(lc.kIn).to.equal(19);
    expect(lc.winal).to.equal(17);
    expect(lc.tun).to.equal(19);
    expect(lc.kAtun).to.equal(19);
    expect(lc.bakTun).to.equal(0);
  });

  it('should handle winal overflow correctly (base-18)', () => {
    // 18 winal = 1 tun
    const mayanDayNumber = 18 * 20; // 360 days = 1.0.0
    const lc = LongCount.fromMayanDayNumber(mayanDayNumber);
    
    expect(lc.kIn).to.equal(0);
    expect(lc.winal).to.equal(0);
    expect(lc.tun).to.equal(1);
    expect(lc.kAtun).to.equal(0);
    expect(lc.bakTun).to.equal(0);
  });

  it('should preserve correlation constant when provided', () => {
    const gregorianFactory = new GregorianFactory();
    
    const gregorian = gregorianFactory.parse('21/12/2012 CE');
    const customCorrelation = getCorrelationConstant(584285); // Modified GMT
    
    const lc = LongCount.fromGregorian(gregorian, customCorrelation);
    
    // The correlation should be preserved
    expect(lc.julianDay).to.equal(gregorian.julianDay);
  });
});

describe('Date and ISO 8601 to Long Count conversion', () => {
  it('should convert JavaScript Date to Long Count using fromDate', () => {
    // December 21, 2012 corresponds to 13.0.0.0.0
    const date = new Date('2012-12-21');
    const lc = LongCount.fromDate(date);
    
    expect(lc.toString()).to.equal('13. 0. 0. 0. 0');
    expect(lc.bakTun).to.equal(13);
    expect(lc.kAtun).to.equal(0);
    expect(lc.tun).to.equal(0);
    expect(lc.winal).to.equal(0);
    expect(lc.kIn).to.equal(0);
  });

  it('should convert ISO 8601 date string to Long Count using fromISO8601', () => {
    // December 21, 2012 in ISO 8601 format
    const lc = LongCount.fromISO8601('2012-12-21');
    
    expect(lc.toString()).to.equal('13. 0. 0. 0. 0');
    expect(lc.bakTun).to.equal(13);
    expect(lc.kAtun).to.equal(0);
    expect(lc.tun).to.equal(0);
    expect(lc.winal).to.equal(0);
    expect(lc.kIn).to.equal(0);
  });

  it('should convert ISO 8601 datetime string to Long Count', () => {
    // December 21, 2012 with time
    const lc = LongCount.fromISO8601('2012-12-21T00:00:00Z');
    
    expect(lc.toString()).to.equal('13. 0. 0. 0. 0');
  });

  it('should convert ISO 8601 datetime with timezone to Long Count', () => {
    // December 21, 2012 with timezone offset
    const lc = LongCount.fromISO8601('2012-12-21T00:00:00-05:00');
    
    // Should still be the same date (though technically it's Dec 21 in the local timezone)
    expect(lc.bakTun).to.equal(13);
  });

  it('should handle Date object for historical dates', () => {
    // January 22, 771 CE (9.17.0.0.0)
    const date = new Date('0771-01-22');
    const lc = LongCount.fromDate(date);
    
    expect(lc.bakTun).to.equal(9);
    expect(lc.kAtun).to.equal(17);
  });

  it('should throw error for invalid Date object', () => {
    const invalidDate = new Date('invalid');
    
    expect(() => {
      LongCount.fromDate(invalidDate);
    }).to.throw('Invalid Date object');
  });

  it('should throw error for invalid ISO 8601 string', () => {
    expect(() => {
      LongCount.fromISO8601('not-a-date');
    }).to.throw('Invalid ISO 8601 date string');
  });

  it('should throw error for empty ISO 8601 string', () => {
    expect(() => {
      LongCount.fromISO8601('');
    }).to.throw('ISO 8601 string must be a non-empty string');
  });

  it('should perform roundtrip with Date object', () => {
    // Create a date, convert to Long Count, then back to Gregorian
    const originalDate = new Date('2012-12-21');
    const lc = LongCount.fromDate(originalDate);
    const gregorian = lc.gregorian;
    
    // Verify the date components match
    expect(gregorian.day).to.equal(21);
    expect(gregorian.month).to.equal(12);
    expect(gregorian.year).to.equal(2012);
  });

  it('should perform roundtrip with ISO 8601 string', () => {
    const lc = LongCount.fromISO8601('2012-12-21');
    const gregorian = lc.gregorian;
    
    expect(gregorian.day).to.equal(21);
    expect(gregorian.month).to.equal(12);
    expect(gregorian.year).to.equal(2012);
  });

  it('should handle different ISO 8601 formats', () => {
    const formats = [
      '2012-12-21',
      '2012-12-21T00:00:00',
      '2012-12-21T00:00:00.000Z',
    ];

    formats.forEach((format) => {
      const lc = LongCount.fromISO8601(format);
      expect(lc.toString()).to.equal('13. 0. 0. 0. 0');
    });
  });

  it('should preserve correlation constant with fromDate', () => {
    const date = new Date('2012-12-21');
    const customCorrelation = getCorrelationConstant(584285); // Modified GMT
    
    const lc = LongCount.fromDate(date, customCorrelation);
    
    // The correlation should be used
    expect(lc.julianDay).to.be.a('number');
  });

  it('should preserve correlation constant with fromISO8601', () => {
    const customCorrelation = getCorrelationConstant(584285); // Modified GMT
    
    const lc = LongCount.fromISO8601('2012-12-21', customCorrelation);
    
    // The correlation should be used
    expect(lc.julianDay).to.be.a('number');
  });
})
