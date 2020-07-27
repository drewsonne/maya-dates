import {Wildcard} from "../../wildcard";
import {getCalendarRound} from "../../cr/calendar-round";
import {getTzolkin} from "../../cr/tzolkin";
import {getHaab} from "../../cr/haab";
import {getHaabMonth} from "../../cr/component/haabMonth";
import {getTzolkinDay} from "../../cr/component/tzolkinDay";
import CalendarRoundFactory from "../../factory/calendar-round";
import CalendarRoundWildcard from "../../operations/calendar-round-wildcard";
import 'mocha'
import {expect} from 'chai'
import LongCountFactory from "../../factory/long-count";
import LongCountWildcard from "../../operations/longcount-wildcard";
import NumberCoefficient from "../../cr/component/numberCoefficient";
import {coefficientParser as _} from "../../cr/component/coefficient";

describe('compute missing lc wildcard', () => {
  const lcs: [string, number][] = [
    // ['10.10.17.14.0', ]
    ['10.10.17.14.*', 20],
  ];
  const lcFactory = new LongCountFactory();
  lcs.forEach((args) => {
    const [lc, expected] = args;
    it(`len(${lc}) = ${expected}`, () => {
      const partialDate = lcFactory.parse(lc);
      expect(partialDate).is.not.null
      if (partialDate !== null) {
        const potentialLcs = new LongCountWildcard(partialDate).run();
        expect(potentialLcs.length).to.equal(expected);
      }
    });
  });
});

describe('compute missing cr wildcard', () => {
  const partialDates: [string, number][] = [
    ['12Imix * Pop', 4],
    ['* Imix 9K\'ank\'in', 13],
    ['* Imix *K\'ank\'in', 52],
    /** ['* * * K\'ank\'in', 988],
     * @TODO Re-enable before final publishing.
     * Compare the existing maya-calendar output against the output of this
     * test. This output says there are 1040 calendar rounds for this wildcard
     * format, whereas the existing maya-calendar says there should be 988.
     * */
    ['* * * *', 18980],
  ];

  const crFactory = new CalendarRoundFactory();
  partialDates.forEach((args: [string, number]) => {
    const [partialDate, expected] = args;
    it(`len(${partialDate}) = ${expected}`, () => {
      const cr = crFactory.parse(partialDate);
      const potentialCrs = new CalendarRoundWildcard(cr).run();
      expect(potentialCrs.length).to.equal(expected);
    });
  });
});

describe('fullDate matcher', () => {
  const wc = new Wildcard();
  const fullDate = getCalendarRound(
    getTzolkin(
      new NumberCoefficient(4),
      getTzolkinDay('Ajaw')
    ),
    getHaab(
      new NumberCoefficient(8),
      getHaabMonth('Kumk\'u')
    ),
  );
  const partialDates: [(number | string | Wildcard)[], boolean][] = [
    [[4, 'Ajaw', 8, wc], true],
    [[4, 'Ajaw', wc, 'Kumk\'u'], true],
    [[4, 'Ajaw', wc, wc], true],
    [[4, wc, 8, 'Kumk\'u'], true],
    [[4, wc, 8, wc], true],
    [[4, wc, wc, 'Kumk\'u'], true],
    [[4, wc, wc, wc], true],
    [[wc, 'Ajaw', 8, 'Kumk\'u'], true],
    [[wc, 'Ajaw', 8, wc], true],
    [[wc, 'Ajaw', wc, 'Kumk\'u'], true],
    [[wc, 'Ajaw', wc, wc], true],
    [[wc, wc, 8, 'Kumk\'u'], true],
    [[wc, wc, 8, wc], true],
    [[wc, wc, wc, 'Kumk\'u'], true],
    [[wc, wc, wc, wc], true],
  ]
  partialDates.forEach((args: [(number | string | Wildcard)[], boolean]) => {
    const [partial, expected] = args;
    it(`${partial} = ${expected}`, () => {
      const partialDate = getCalendarRound(
        getTzolkin(_(partial[0]), getTzolkinDay(partial[1])),
        getHaab(_(partial[2]), getHaabMonth(partial[3]))
      );
      expect(partialDate.match(fullDate)).to.equal(expected);
    });
  });
});
