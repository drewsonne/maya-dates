import {getTzolkinDay, TzolkinDay} from "../../cr/component/tzolkinDay";

import {expect} from 'chai'
import 'mocha'
import {getTzolkin, Tzolkin} from "../../cr/tzolkin";
import NumberCoefficient from "../../cr/component/numberCoefficient";

describe('increment tzolkin days', () => {
  const tzolkinDays: [string, string][] = [
    ['Imix', 'Ik\''],
    ['Ik\'', 'Ak\'bal'],
    ['Ak\'bal', 'K\'an'],
    ['K\'an', 'Chikchan'],
    ['Chikchan', 'Kimi'],
    ['Kimi', 'Manik\''],
    ['Manik\'', 'Lamat'],
    ['Lamat', 'Muluk'],
    ['Muluk', 'Ok'],
    ['Ok', 'Chuwen'],
    ['Chuwen', 'Eb'],
    ['Eb', 'Ben'],
    ['Ben', 'Ix'],
    ['Ix', 'Men'],
    ['Men', 'Kib'],
    ['Kib', 'Kaban'],
    ['Kaban', 'Etz\'nab'],
    ['Etz\'nab', 'Kawak'],
    ['Kawak', 'Ajaw'],
    ['Ajaw', 'Imix'],
  ];
  tzolkinDays.forEach((args) => {
    let [previous, next] = args
    it(`${previous} -> ${next}`, () => {
      const today = getTzolkinDay(previous);
      const expected = getTzolkinDay(next);

      expect(today).to.be.an.instanceOf(TzolkinDay)
      expect(expected).to.be.an.instanceOf(TzolkinDay)

      if (today instanceof TzolkinDay) {
        const tomorrow = today.next();
        expect(tomorrow === expected).to.be.true;
      }
    })
  })
});

describe('build tzolkins', () => {
  const tzolkins: [[number, string], [number, string]][] = [
    [[5, 'Imix'], [6, 'Ik\'']],
    [[13, 'Ik\''], [1, 'Ak\'bal']],
    [[13, 'Ajaw'], [1, 'Imix']],
  ];
  tzolkins.forEach((args) => {
    let [prev, next] = args
    it(`${prev} -> ${next}`, () => {

      const tz = getTzolkin(new NumberCoefficient(prev[0]), getTzolkinDay(prev[1]));
      expect(tz.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (tz.coeff instanceof NumberCoefficient) {
        expect(tz.coeff.value).to.eq(prev[0]);
      }
      expect(tz.name).to.eq(prev[1]);

      const expected = getTzolkin(new NumberCoefficient(next[0]), getTzolkinDay(next[1]));
      const tomorrow = tz.next();
      expect(tomorrow.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (tomorrow.coeff instanceof NumberCoefficient) {
        expect(tomorrow.coeff.value).to.eq(next[0]);
      }
      expect(tomorrow.name).to.eq(next[1]);
      expect(tomorrow.equal(expected)).to.be.true;
    })
  });
});

describe('shift tzolkins', () => {
  const tzolkins: [[number, string], number, [number, string]][] = [
    [[5, 'Imix'], 1, [6, 'Ik\'']],
    [[13, 'Ajaw'], 100, [9, 'Ajaw']],
    [[13, 'Ajaw'], 177, [8, 'Kaban']],
    [[13, 'Ajaw'], -1, [12, 'Kawak']],
    [[13, 'Ajaw'], -100, [4, 'Ajaw']],
    [[5, 'Imix'], -177, [10, 'K\'an']],
  ];

  tzolkins.forEach((args) => {
    let [start, incremental, expected] = args
    it(`${start} + ${incremental} = ${expected}`, () => {
      const date = getTzolkin(new NumberCoefficient(start[0]), getTzolkinDay(start[1]));
      const newTz = date.shift(incremental);

      const expectedDate = getTzolkin(new NumberCoefficient(expected[0]), getTzolkinDay(expected[1]));
      expect(newTz === expectedDate).to.be.true;
    })
  });
});

it('render tzolkin fullDate', () => {
  const haab = getTzolkin(new NumberCoefficient(5), getTzolkinDay('Imix'));
  expect(haab.toString()).to.eq('5 Imix');
});

describe('fromDayNumber', () => {
  it('should create epoch date (4 Ajaw) for day 0', () => {
    const tzolkin = getTzolkin(new NumberCoefficient(4), getTzolkinDay('Ajaw'));
    const fromDay = Tzolkin.fromDayNumber(0);
    expect(fromDay.equal(tzolkin)).to.be.true;
  });

  it('should handle positive day numbers', () => {
    // Day 1 should be 5 Imix (4 Ajaw + 1 day)
    const day1 = Tzolkin.fromDayNumber(1);
    const expected1 = getTzolkin(new NumberCoefficient(5), getTzolkinDay('Imix'));
    expect(day1.equal(expected1)).to.be.true;

    // Day 20 should be 11 Ajaw
    const day20 = Tzolkin.fromDayNumber(20);
    const expected20 = getTzolkin(new NumberCoefficient(11), getTzolkinDay('Ajaw'));
    expect(day20.equal(expected20)).to.be.true;

    // Day 100 should be 13 Ajaw
    const day100 = Tzolkin.fromDayNumber(100);
    const expected100 = getTzolkin(new NumberCoefficient(13), getTzolkinDay('Ajaw'));
    expect(day100.equal(expected100)).to.be.true;
  });

  it('should handle negative day numbers', () => {
    // Day -1 should be 3 Kawak (4 Ajaw - 1 day)
    const dayMinus1 = Tzolkin.fromDayNumber(-1);
    const expected1 = getTzolkin(new NumberCoefficient(3), getTzolkinDay('Kawak'));
    expect(dayMinus1.equal(expected1)).to.be.true;

    // Day -20 should be 10 Ajaw
    const dayMinus20 = Tzolkin.fromDayNumber(-20);
    const expected20 = getTzolkin(new NumberCoefficient(10), getTzolkinDay('Ajaw'));
    expect(dayMinus20.equal(expected20)).to.be.true;
  });

  it('should handle boundary values (multiples of 260)', () => {
    // Day 260 should be the same as day 0 (full cycle)
    const day260 = Tzolkin.fromDayNumber(260);
    const day0 = Tzolkin.fromDayNumber(0);
    expect(day260.equal(day0)).to.be.true;

    // Day -260 should also be the same as day 0
    const dayMinus260 = Tzolkin.fromDayNumber(-260);
    expect(dayMinus260.equal(day0)).to.be.true;

    // Day 520 (2 full cycles)
    const day520 = Tzolkin.fromDayNumber(520);
    expect(day520.equal(day0)).to.be.true;
  });

  it('should match results from shift method (round-trip validation)', () => {
    const epoch = getTzolkin(new NumberCoefficient(4), getTzolkinDay('Ajaw'));

    // Forward shifts
    for (let days of [1, 5, 13, 20, 100, 177, 259]) {
      const fromShift = epoch.shift(days);
      const fromDayNumber = Tzolkin.fromDayNumber(days);
      expect(fromDayNumber.equal(fromShift)).to.be.true;
    }

    // Backward shifts
    for (let days of [-1, -5, -13, -20, -100, -259]) {
      const fromShift = epoch.shift(days);
      const fromDayNumber = Tzolkin.fromDayNumber(days);
      expect(fromDayNumber.equal(fromShift)).to.be.true;
    }
  });
});
