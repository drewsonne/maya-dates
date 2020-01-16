const mayadates = require('../src/index');

describe('compute missing lc wildcard', () => {
  const lcs = [
    // ['10.10.17.14.0', ]
    ['10.10.17.14.*', 20],
  ];
  const lcFactory = new mayadates.factory.LongCountFactory();
  it.each(lcs)(
    'len(%s) = %s',
    (lc, expected) => {
      const partialDate = lcFactory.parse(lc);
      const potentialLcs = new mayadates.op.LongCountWildcard(partialDate).run();
      expect(potentialLcs).toHaveLength(expected);
    },
  );
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

  const crFactory = new mayadates.factory.CalendarRoundFactory();
  it.each(partialDates)('len(%s) = %s',
    (partialDate, expected) => {
      const cr = crFactory.parse(partialDate);
      const potentialCrs = new mayadates.op.CalendarRoundWildcard(cr).run();
      expect(potentialCrs).toHaveLength(expected);
    });
});

describe('fullDate matcher', () => {
  const wc = mayadates.wildcard;
  const fullDate = mayadates.cr.getCalendarRound(
    4, 'Ajaw',
    8, 'Kumk\'u',
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
  it.each(partialDates)(
    '%s = %s',
    (partial, expected) => {
      const partialDate = mayadates.cr.getCalendarRound(...partial);
      expect(partialDate.match(fullDate)).toBe(expected);
    },
  );
});
