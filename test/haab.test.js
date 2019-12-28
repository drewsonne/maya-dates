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
  let haab = new mayadates.cr.haab.Haab(5, 'Pop')
  expect(haab.toString()).toBe('5 Pop')
})

describe('shift haab', () => {
  let haabs = [
    [[8, 'Kumk\'u'], 359, [2, 'Kumk\'u']],
    [[8, 'Kumk\'u'], 361, [4, 'Kumk\'u']],
    [[8, 'Kumk\'u'], 363, [6, 'Kumk\'u']],
    [[8, 'Kumk\'u'], 365, [8, 'Kumk\'u']],
    [[18, 'Pop'], 1, [19, 'Pop']],
    [[18, 'Pop'], 100, [18, 'Xul']],
    [[18, 'Pop'], 177, [15, 'Yax']],
    [[18, 'Pop'], 345, [3, 'Wayeb']],
    [[8, 'Kumk\'u'], 309, [12, 'Muwan']],
    [[8, 'Kumk\'u'], 367, [10, 'Kumk\'u']],
    [[8, 'Kumk\'u'], 369, [12, 'Kumk\'u']],
    [[4, 'Wayeb'], 1, [0, 'Pop']],
  ]
  test.each(haabs)(
    '%s + %s = %s',
    (start, incremental, expected) => {
      let prev_haab = new mayadates.cr.haab.Haab(...start)
      let new_haab = prev_haab.shift(incremental)

      expect(new_haab.coeff).toBe(expected[0])
      expect(new_haab.name).toBe(expected[1])
    },
  )
})
