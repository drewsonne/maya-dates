import 'mocha'
import {expect} from 'chai'
import {getHaabMonth, HaabMonth} from "../../cr/component/haabMonth";
import {getHaab, Haab} from "../../cr/haab";
import NumberCoefficient from "../../cr/component/numberCoefficient";
import {Wildcard} from "../../wildcard";

describe('increment haab months', () => {
  const tzolkinDays: [string, string][] = [
    ['Pop', 'Wo'],
    ['Xul', 'Yaxk\'in'],
    ['Wayeb', 'Pop'],
  ];
  tzolkinDays.forEach((args) => {
    const [previous, next] = args;
    it(`${previous} -> ${next}`, () => {
      const today = getHaabMonth(previous);
      expect(today).to.be.an.instanceOf(HaabMonth)
      if (today instanceof HaabMonth) {
        const tomorrow = today.next();
        const expected = getHaabMonth(next);
        // expect(tomorrow.name).to.equal(next);
        expect(tomorrow).to.equal(expected);
      }
    });
  });
});

describe('build haabs', () => {
  const haabs: [[number, string], [number, HaabMonth | Wildcard]][] = [
    [[5, 'Pop'], [6, getHaabMonth('Pop')]],
    [[19, 'Pop'], [0, getHaabMonth('Wo')]],
    [[19, 'Xul'], [0, getHaabMonth('Yaxk\'in')]],
    [[4, 'Wayeb'], [0, getHaabMonth('Pop')]],
  ];
  haabs.forEach((args: [[number, string], [number, HaabMonth | Wildcard]]) => {
    const [prev, next] = args;
    it(`${prev} -> ${next}`, () => {
      const haab = getHaab(new NumberCoefficient(prev[0]), getHaabMonth(prev[1]));
      expect(haab.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (haab.coeff instanceof NumberCoefficient) {
        expect(haab.coeff.value).to.equal(prev[0]);
      }
      expect(haab.name).to.equal(prev[1]);

      const tomorrow = haab.next();
      expect(tomorrow.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (tomorrow.coeff instanceof NumberCoefficient) {
        expect(tomorrow.coeff.value).to.equal(next[0]);
      }
      expect(tomorrow.month).to.equal(next[1]);
    });
  });
});

it('render haab fullDate', () => {
  const haab = getHaab(new NumberCoefficient(5), getHaabMonth('Pop'));
  expect(haab.toString()).to.equal('5 Pop');
});

describe('shift haab', () => {
  const kumku = getHaabMonth('Kumk\'u');
  const pop = getHaabMonth('Pop');
  const haabs: [[number, string], number, [number, HaabMonth | Wildcard]][] = [
    [[8, 'Kumk\'u'], 359, [2, kumku]],
    [[8, 'Kumk\'u'], 361, [4, kumku]],
    [[8, 'Kumk\'u'], 363, [6, kumku]],
    [[8, 'Kumk\'u'], 365, [8, kumku]],
    [[18, 'Pop'], 1, [19, pop]],
    [[18, 'Pop'], 100, [18, getHaabMonth('Xul')]],
    [[18, 'Pop'], 177, [15, getHaabMonth('Yax')]],
    [[18, 'Pop'], 345, [3, getHaabMonth('Wayeb')]],
    [[8, 'Kumk\'u'], 309, [12, getHaabMonth('Muwan')]],
    [[8, 'Kumk\'u'], 367, [10, kumku]],
    [[8, 'Kumk\'u'], 369, [12, kumku]],
    [[4, 'Wayeb'], 1, [0, pop]],
  ];
  haabs.forEach((args: [[number, string], number, [number, HaabMonth | Wildcard]]) => {
    const [start, incremental, expected] = args;
    it(`${start} + ${incremental} = ${expected}`, () => {
      const prevHaab = getHaab(
        new NumberCoefficient(start[0]),
        getHaabMonth(start[1])
      );
      const newHaab = prevHaab.shift(incremental);
      expect(newHaab.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (newHaab.coeff instanceof NumberCoefficient) {
        expect(newHaab.coeff.value).to.equal(expected[0]);
      }
      expect(newHaab.month).to.equal(expected[1]);
    });
  });
});

describe('fromDayNumber', () => {
  it('should handle day 0 (epoch)', () => {
    const haab = Haab.fromDayNumber(0);
    expect(haab.coeff).to.be.an.instanceOf(NumberCoefficient);
    if (haab.coeff instanceof NumberCoefficient) {
      expect(haab.coeff.value).to.equal(8);
    }
    expect(haab.month).to.equal(getHaabMonth('Kumk\'u'));
  });

  it('should handle negative day numbers', () => {
    // -1 day should be 7 Kumk'u
    const haab1 = Haab.fromDayNumber(-1);
    expect(haab1.coeff).to.be.an.instanceOf(NumberCoefficient);
    if (haab1.coeff instanceof NumberCoefficient) {
      expect(haab1.coeff.value).to.equal(7);
    }
    expect(haab1.month).to.equal(getHaabMonth('Kumk\'u'));

    // -365 days should cycle back to 8 Kumk'u
    const haab365 = Haab.fromDayNumber(-365);
    expect(haab365.coeff).to.be.an.instanceOf(NumberCoefficient);
    if (haab365.coeff instanceof NumberCoefficient) {
      expect(haab365.coeff.value).to.equal(8);
    }
    expect(haab365.month).to.equal(getHaabMonth('Kumk\'u'));
  });

  it('should handle large positive day numbers', () => {
    // 365 days should cycle back to 8 Kumk'u
    const haab365 = Haab.fromDayNumber(365);
    expect(haab365.coeff).to.be.an.instanceOf(NumberCoefficient);
    if (haab365.coeff instanceof NumberCoefficient) {
      expect(haab365.coeff.value).to.equal(8);
    }
    expect(haab365.month).to.equal(getHaabMonth('Kumk\'u'));

    // 1000 days
    const haab1000 = Haab.fromDayNumber(1000);
    expect(haab1000.coeff).to.be.an.instanceOf(NumberCoefficient);
    expect(haab1000.month).to.be.an.instanceOf(HaabMonth);

    // 10000 days (multiple cycles)
    const haab10000 = Haab.fromDayNumber(10000);
    expect(haab10000.coeff).to.be.an.instanceOf(NumberCoefficient);
    expect(haab10000.month).to.be.an.instanceOf(HaabMonth);
  });

  it('should handle dates that fall in Wayeb\'', () => {
    // Wayeb' is month 19 (index 18 in 0-based), with days 0-4
    // Epoch is 8 Kumk'u (month 18, day 8)
    // Day-of-year for epoch: 8 + 20*(18-1) = 348
    // Wayeb' starts at day-of-year: 0 + 20*(19-1) = 360
    // Days from epoch to start of Wayeb': 360 - 348 = 12
    
    // Day that results in 0 Wayeb'
    const haabWayeb0 = Haab.fromDayNumber(12);
    expect(haabWayeb0.coeff).to.be.an.instanceOf(NumberCoefficient);
    if (haabWayeb0.coeff instanceof NumberCoefficient) {
      expect(haabWayeb0.coeff.value).to.equal(0);
    }
    expect(haabWayeb0.month).to.equal(getHaabMonth('Wayeb'));

    // Day that results in 4 Wayeb' (last day of Wayeb')
    // 12 days to reach 0 Wayeb' + 4 days = 16
    const haabWayeb4 = Haab.fromDayNumber(16);
    expect(haabWayeb4.coeff).to.be.an.instanceOf(NumberCoefficient);
    if (haabWayeb4.coeff instanceof NumberCoefficient) {
      expect(haabWayeb4.coeff.value).to.equal(4);
    }
    expect(haabWayeb4.month).to.equal(getHaabMonth('Wayeb'));

    // Verify Wayeb' after a full cycle (365 days + 12 days to Wayeb')
    const haabWayebCycle = Haab.fromDayNumber(365 + 12);
    expect(haabWayebCycle.coeff).to.be.an.instanceOf(NumberCoefficient);
    if (haabWayebCycle.coeff instanceof NumberCoefficient) {
      expect(haabWayebCycle.coeff.value).to.equal(0);
    }
    expect(haabWayebCycle.month).to.equal(getHaabMonth('Wayeb'));
  });

  it('should produce same result as shift method', () => {
    const epoch = getHaab(new NumberCoefficient(8), getHaabMonth('Kumk\'u'));
    
    // Test various shifts match fromDayNumber
    const testDays = [0, 1, 10, 100, 365, 1000];
    testDays.forEach(days => {
      const fromShift = epoch.shift(days);
      const fromDayNumber = Haab.fromDayNumber(days);
      
      expect(fromDayNumber.coeff).to.be.an.instanceOf(NumberCoefficient);
      expect(fromShift.coeff).to.be.an.instanceOf(NumberCoefficient);
      
      if (fromDayNumber.coeff instanceof NumberCoefficient && fromShift.coeff instanceof NumberCoefficient) {
        expect(fromDayNumber.coeff.value).to.equal(fromShift.coeff.value, `Day ${days} coefficient mismatch`);
      }
      expect(fromDayNumber.month).to.equal(fromShift.month, `Day ${days} month mismatch`);
    });
  });
});
