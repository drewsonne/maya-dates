import {Wildcard} from "../../wildcard";
import {getCalendarRound} from "../../cr/calendar-round";
import {getTzolkin} from "../../cr/tzolkin";
import {getHaab} from "../../cr/haab";
import Coefficient from "../../cr/component/coefficient";
import {getHaabMonth} from "../../cr/component/haabMonth";
import {getTzolkinDay} from "../../cr/component/tzolkinDay";
import CalendarRoundFactory from "../../factory/calendar-round";
import CalendarRoundWildcard from "../../operations/calendar-round-wildcard";
import 'mocha'
import {expect} from 'chai'
import LongCountFactory from "../../factory/long-count";
import LongCountWildcard from "../../operations/longcount-wildcard";

describe('compute missing lc wildcard', () => {
  const lcs = [
    // ['10.10.17.14.0', ]
    ['10.10.17.14.*', 20],
  ];
  const lcFactory = new LongCountFactory();
  lcs.forEach((args) => {
    const [lc, expected] = args;
    it(`len(${lc}) = ${expected}`, () => {
      const partialDate = lcFactory.parse(lc);
      const potentialLcs = new LongCountWildcard(partialDate).run();
      expect(potentialLcs.length).to.equal(expected);
    });
  });
});

describe('compute missing cr wildcard', () => {
  const partialDates = [
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
      new Coefficient(4),
      getTzolkinDay('Ajaw')
    ),
    getHaab(
      new Coefficient(8),
      getHaabMonth('Kumk\'u')
    ),
  );
  const partialDates = [
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
  ];
  partialDates.forEach((args: [[Wildcard | number, Wildcard | string, Wildcard | number, Wildcard | string], boolean]) => {
    const [partial, expected] = args;
    it(`${partial} = ${expected}`, () => {
      const partialDate = getCalendarRound(
        getTzolkin(partial[0], getTzolkinDay(partial[1])),
        getHaab(partial[0], getHaabMonth(partial[1]))
      );
      expect(partialDate.match(fullDate)).to.equal(expected);
    });
  });
});
