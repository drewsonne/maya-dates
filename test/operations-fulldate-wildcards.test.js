const mayadates = require('../src/index')
const wildcard = mayadates.wildcard

describe('complex wildcard parsing', () => {
  let partial_dates = [
    '1 Ok * * 9.*.10.10.10',
    '1Ok * * 9.*.10.10.10',
    '1 Ok ** 9.*.10.10.10',
    '1Ok ** 9.*.10.10.10',
  ]
  test.each(partial_dates)(
    '%s',
    (partial_date) => {
      let full_date = new mayadates.factory.FullDateFactory().parse(
        partial_date,
      )

      expect(full_date.cr.tzolkin.coeff).toBe(1)
      expect(full_date.cr.tzolkin.name).toBe('Ok')
      expect(full_date.cr.haab.coeff).toBe(wildcard)
      expect(full_date.cr.haab.name).toBe(wildcard)
      expect(full_date.lc.k_in).toBe(10)
      expect(full_date.lc.winal).toBe(10)
      expect(full_date.lc.tun).toBe(10)
      expect(full_date.lc.k_atun).toBe(wildcard)
      expect(full_date.lc.bak_tun).toBe(9)
    })
})

test('compute single date', () => {
  let partial_date = new mayadates.factory.
    FullDateFactory().parse('1 Ok 13 * 9.*.10.10.10')

  let potential_dates = new mayadates.op.
    FullDateWildcard(partial_date).run()
})

test('single alignment', () => {
  let partial_date = new mayadates.factory.
    FullDateFactory().parse('* * * * 13.0.7.2.1')

  let potential_dates = new mayadates.op.
    FullDateWildcard(partial_date).run()

  expect(potential_dates.length).toBe(1)
  expect(potential_dates[0].cr.tzolkin.coeff).toBe(4)
  expect(potential_dates[0].cr.tzolkin.name).toBe('Imix')
  expect(potential_dates[0].cr.haab.coeff).toBe(9)
  expect(potential_dates[0].cr.haab.name).toBe('K\'ank\'in')
})
