const mayadates = require('../src/index')

describe('compute missing single wildcard', () => {
  let partial_dates = [
    ['12Imix * Pop', 4],
    ['* Imix 9K\'ank\'in', 13],
  ]
  let cr_factory = new mayadates.factory.CalendarRoundFactory()
  test.each(partial_dates)(
    'len(%s) = %s',
    (partial_date, expected) => {
      let cr = cr_factory.parse(partial_date)
      let potential_crs = new mayadates.op.
        CalendarRoundWildcard(cr).run()
      expect(potential_crs.length).toBe(expected)
    },
  )
})

describe('partial matcher', () => {
  let wc = mayadates.wildcard
  let full_date = new mayadates.cr.CalendarRound(
    8, 'Ajaw',
    4, 'Kumk\'u',
  )
  let find_wildcard = new mayadates.op.CalendarRoundWildcard()
  let partial_dates = [
    [[8, 'Ajaw', 4, wc], true],
    [[8, 'Ajaw', wc, 'Kumk\'u'], true],
    [[8, 'Ajaw', wc, wc], true],
    [[8, wc, 4, 'Kumk\'u'], true],
    [[8, wc, 4, wc], true],
    [[8, wc, wc, 'Kumk\'u'], true],
    [[8, wc, wc, wc], true],
    [[wc, 'Ajaw', 4, 'Kumk\'u'], true],
    [[wc, 'Ajaw', 4, wc], true],
    [[wc, 'Ajaw', wc, 'Kumk\'u'], true],
    [[wc, 'Ajaw', wc, wc], true],
    [[wc, wc, 4, 'Kumk\'u'], true],
    [[wc, wc, 4, wc], true],
    [[wc, wc, wc, 'Kumk\'u'], true],
    [[wc, wc, wc, wc], true],
  ]
  test.each(partial_dates)(
    '%s = %s',
    (partial, expected) => {
      let partial_date = new mayadates.cr.CalendarRound(...partial)
      expect(find_wildcard._date_matches_wildcards(
        partial_date, full_date,
      )).toBe(expected)
    },
  )

})
