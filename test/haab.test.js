const mayadates = require('../src/index')

describe('increment haab months', () => {
  let tzolkin_days = [
    ['Pop', 'Wo'],
    ['Xul', 'Yaxk\'in'],
    ['Wayeb', 'Pop'],
  ]
  test.each(tzolkin_days)(
    '%s -> %s',
    (previous, next) => {
      let today = new mayadates.cr.haab.HaabMonth(previous)
      let tomorrow = today.next()
      expect(tomorrow.name).toBe(next)
    })
})

describe('build haabs', () => {
  let haabs = [
    [[5, 'Pop'], [6, 'Pop']],
    [[19, 'Pop'], [0, 'Wo']],
    [[19, 'Xul'], [0, 'Yaxk\'in']],
    [[4, 'Wayeb'], [0, 'Pop']],
  ]
  test.each(haabs)(
    '%s -> %s',
    (prev, next) => {
      let haab = new mayadates.cr.haab.Haab(prev[0], prev[1])
      expect(haab.coeff).toBe(prev[0])
      expect(haab.name).toBe(prev[1])

      let tomorrow = haab.next()
      expect(tomorrow.coeff).toBe(next[0])
      expect(tomorrow.name).toBe(next[1])
    },
  )
})

test('render haab date', () => {
  let haab = new mayadates.cr.haab.Haab(5,'Pop')
  expect(haab.toString()).toBe('5 Pop')
})
