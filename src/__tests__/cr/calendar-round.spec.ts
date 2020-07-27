import {expect} from 'chai'
import 'mocha'
import CalendarRoundFactory from "../../factory/calendar-round";
import {Wildcard} from "../../wildcard";
import {CalendarRound, getCalendarRound} from "../../cr/calendar-round";
import {getTzolkin} from "../../cr/tzolkin";
import {getHaab} from "../../cr/haab";
import DistanceNumber from "../../lc/distance-number";
import {getTzolkinDay, TzolkinDay} from "../../cr/component/tzolkinDay";
import {getHaabMonth, HaabMonth} from "../../cr/component/haabMonth";
import NumberCoefficient from "../../cr/component/numberCoefficient";

/**
 * @test {CalendarRoundFactory}
 * @test {CalendarRound#next}
 */
describe('increment calendar-rounds', () => {
  const tzolkinDays = [
    ['2Ak\'bal 6 Muwan', [3, getTzolkinDay('K\'an'), 7, getHaabMonth('Muwan')]],
    ['4 Ajaw 8 Kumk\'u', [5, getTzolkinDay('Imix'), 9, getHaabMonth('Kumk\'u')]],
    ['13 Kimi 4 Wayeb', [1, getTzolkinDay('Manik\''), 0, getHaabMonth('Pop')]],
  ];
  tzolkinDays.forEach((args: [string, [number, TzolkinDay, number, HaabMonth]]) => {
    const [today, next] = args;
    it(`${today} -> ${next}`, () => {
      const cr = new CalendarRoundFactory().parse(today);
      const tomorrow = cr.next();
      expect(tomorrow.tzolkin.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (tomorrow.tzolkin.coeff instanceof NumberCoefficient) {
        expect(tomorrow.tzolkin.coeff.value).to.equal(next[0]);
      }
      expect(tomorrow.tzolkin.day).to.equal(next[1]);
      expect(tomorrow.haab.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (tomorrow.haab.coeff instanceof NumberCoefficient) {
        expect(tomorrow.haab.coeff.value).to.equal(next[2]);
      }
      expect(tomorrow.haab.month).to.equal(next[3]);
    });
  });
});

describe('shift calendar-rounds', () => {
  const tzolkinDays = [
    ['4 Ajaw 8 Kumk\'u', 0, [4, 'Ajaw', 8, 'Kumk\'u']],
    ['4 Ajaw 8 Kumk\'u', 1, [5, 'Imix', 9, 'Kumk\'u']],
    ['4 Ajaw 8 Kumk\'u', 10, [1, 'Ok', 18, 'Kumk\'u']],
    ['4 Ajaw 8 Kumk\'u', 365, [5, 'Chikchan', 8, 'Kumk\'u']],
  ];
  tzolkinDays.forEach((args: [string, number, [number, string, number, string]]) => {
    const [today, increment, expected] = args;
    it(`${today} + ${increment} = ${expected}`, () => {
      const cr = new CalendarRoundFactory().parse(today);
      const tomorrow = cr.shift(increment);

      expect(tomorrow.tzolkin.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (tomorrow.tzolkin.coeff instanceof NumberCoefficient) {
        expect(tomorrow.tzolkin.coeff.value).to.equal(expected[0]);
      }
      expect(tomorrow.tzolkin.name).to.eq(expected[1]);

      expect(tomorrow.haab.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (tomorrow.haab.coeff instanceof NumberCoefficient) {
        expect(tomorrow.haab.coeff.value).to.equal(expected[2]);
      }
      expect(tomorrow.haab.name).to.eq(expected[3]);
    });
  });
});

it('failed calendar-round parse', () => {
  const cr = new CalendarRoundFactory().parse('World');
  expect(cr).to.be.null;
});

describe('parse calendar-round', () => {
  const sources = [
    ['2 Ak\'bal 6 Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2 Ak\'bal 6Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2Ak\'bal 6 Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2Ak\'bal 6Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
  ];
  sources.forEach((args: [string, [number, string, number, string]]) => {
    const [source, expected] = args;
    it(`${source} -> ${expected}`, () => {
      const cr = new CalendarRoundFactory().parse(source);
      expect(cr.tzolkin.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (cr.tzolkin.coeff instanceof NumberCoefficient) {
        expect(cr.tzolkin.coeff.value).to.equal(expected[0]);
      }
      expect(cr.tzolkin.name).to.eq(expected[1]);

      expect(cr.haab.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (cr.haab.coeff instanceof NumberCoefficient) {
        expect(cr.haab.coeff.value).to.equal(expected[2]);
      }
      expect(cr.haab.name).to.eq(expected[3]);
    });
  })
});

function checkCrAgainstCr(cr: CalendarRound, crComponents: (number | string | Wildcard)[]) {
  const crParts = [
    cr.tzolkin.coeff,
    cr.tzolkin.day,
    cr.haab.coeff,
    cr.haab.month
  ]
  return crComponents.map((expectedValue: (number | string | Wildcard), index: number) => {
    const actualValue = crParts[index]
    if (expectedValue instanceof Wildcard) {
      expect(actualValue).to.be.an.instanceOf(Wildcard)
    } else if (typeof expectedValue === 'string') {
      expect(`${actualValue}`).to.be.eq(`${expectedValue}`)
    } else if (typeof expectedValue === 'number') {
      expect(actualValue).to.be.an.instanceOf(NumberCoefficient)
      if (actualValue instanceof NumberCoefficient) {
        expect(actualValue.value).to.eq(expectedValue)
      } else {
        return false
      }
    } else {
      return false
    }
    return true
  }).every((result) => result)
}

describe('parse calendar-round wildcards', () => {
  const wildcard = new Wildcard();
  const sources = [
    [
      '* Ak\'bal 6 Muwan',
      [wildcard, 'Ak\'bal', 6, 'Muwan'],
      '* Ak\'bal 6 Muwan'],
    [
      '2 Ak\'bal *Muwan',
      [2, 'Ak\'bal', wildcard, 'Muwan'],
      '2 Ak\'bal * Muwan'],
    [
      '*Ak\'bal 6 *',
      [wildcard, 'Ak\'bal', 6, wildcard],
      '* Ak\'bal 6 *'],
    [
      '2Ak\'bal 6*',
      [2, 'Ak\'bal', 6, wildcard],
      '2 Ak\'bal 6 *',
    ],
  ];
  sources.forEach((args: [string, [Wildcard | number | string, Wildcard | number | string, Wildcard | number | string, Wildcard | number | string], string]) => {
    const [source, expected, name] = args;
    it(`${source}, ${expected}, ${name}`, () => {
      const cr = new CalendarRoundFactory().parse(source);
      expect(
        checkCrAgainstCr(cr, expected)
      ).to.be.true
      expect(cr.toString()).to.eq(name);
    });
  })
});

it('render calendar round', () => {
  expect(
    getCalendarRound(
      getTzolkin(new NumberCoefficient(4), getTzolkinDay('Ajaw')),
      getHaab(new NumberCoefficient(8), getTzolkinDay('Kumk\'u')),
    ).toString(),
  ).to.equal(
    '4 Ajaw 8 Kumk\'u',
  )
});

// 6Kimi   9Muwan  --> 3227
// 5Kimi   4Mol    --> 3447
// 6Manik' 5Mol    --> 3448
// 13Ix    12Mol   --> 3455
// 7Ok     13 Xul  --> 5971

describe('calendar round diff\'s', () => {
  const dates = [
    ['5 Kimi 4 Mol', '6 Manik\' 5 Mol', [1]],
    ['5 Kimi 4 Mol', '13 Ix 12 Mol', [8]],
    ['5 Kimi 4 Mol', '7 Ok 13 Xul', [4, 0, 7]],
    ['5 Kimi 4 Mol', '6 Kimi 9 Muwan', [0, -11]],
    ['5 Kimi 4 Mol', '4 Chikchan 3 Mol', [-1]],
  ];
  const crFactory = new CalendarRoundFactory();
  dates.forEach((args: [string, string, number[]]) => {
    const [fromRaw, toRaw, expectRaw] = args;
    it(`${fromRaw} - ${toRaw} = ${expectRaw}`, () => {
      const from = crFactory.parse(fromRaw);
      const to = crFactory.parse(toRaw);
      const expected = new DistanceNumber(
        ...expectRaw,
      ).normalise();

      expect(from.minus(to).equal(expected)).to.be.true
    });
  })
});