const mayadates = require('../src/index');

describe('compute missing lc wildcard', () => {
  let lcs = [
    // ['10.10.17.14.0', ]
    ['10.10.17.14.*', 20],
  ];
  let lc_factory = new mayadates.factory.LongCountFactory();
  test.each(lcs)(
    'len(%s) = %s',
    (lc, expected) => {
      let partial_date = lc_factory.parse(lc);
      let potential_lcs = new mayadates.op.LongCountWildcard(partial_date).run();
      expect(potential_lcs.length).toBe(expected);
    },
  );
});

describe('compute missing cr wildcard', () => {
  let partial_dates = [
    ['12Imix * Pop', 4],
    ['* Imix 9K\'ank\'in', 13],
    ['* Imix *K\'ank\'in', 52],
    /** ['* * * K\'ank\'in', 988],
     * @TODO Re-enable before final publishing.
     * Compare the existing maya-calendar output against the output of this
     * test. This output says there are 1040 calendar rounds for this wildcard
     * format, whereas the existing maya-calendar says there should be 988.
     **/
    ['* * * *', 18980],
  ];
  let cr_factory = new mayadates.factory.CalendarRoundFactory();
  test.each(partial_dates)('len(%s) = %s',
    (partial_date, expected) => {
      let cr = cr_factory.parse(partial_date);
      let potential_crs = new mayadates.op.CalendarRoundWildcard(cr).run();
      expect(potential_crs.length).toBe(expected);
    });
});

describe('partial matcher', () => {
  let wc = mayadates.wildcard;
  let full_date = new mayadates.cr.CalendarRound(
    4, 'Ajaw',
    8, 'Kumk\'u',
  );
  let find_wildcard = new mayadates.op.CalendarRoundWildcard();
  let partial_dates = [
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
  test.each(partial_dates)(
    '%s = %s',
    (partial, expected) => {
      let partial_date = new mayadates.cr.CalendarRound(...partial);
      expect(partial_date.match(full_date)).toBe(expected);
    },
  );

});
