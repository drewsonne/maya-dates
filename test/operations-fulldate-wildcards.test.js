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

describe('single cr alignment', () => {
  let full_dates = [
    ['* Imix 9 K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
    ['* * 9 K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
    ['* * * K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
    ['* * * * 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
  ]
  test.each(full_dates)('%s -> %s', (raw, expected) => {
    let fd_factory = new mayadates.factory.FullDateFactory()
    let potential_dates = new mayadates.op.FullDateWildcard(
      fd_factory.parse(raw),
    ).run()

    expect(potential_dates.length).toBe(1)
    expect(potential_dates[0].cr.tzolkin.coeff).toBe(expected[0])
    expect(potential_dates[0].cr.tzolkin.name).toBe(expected[1])
    expect(potential_dates[0].cr.haab.coeff).toBe(expected[2])
    expect(potential_dates[0].cr.haab.name).toBe(expected[3])
  })
})
