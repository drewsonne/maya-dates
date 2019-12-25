const mayadates = require('../src/index')

describe('increment tzolkin days', () => {
  let tzolkin_days = [
    ['Imix', 'Ik\''],
    ['Ik\'', 'Ak\'bal'],
    ['Ajaw', 'Imix'],
  ]
  test.each(tzolkin_days)(
    '%s -> %s',
    (previous, next) => {
      let today = new mayadates.cr.tzolkin.TzolkinDay(previous)
      let tomorrow = today.next()
      expect(tomorrow.name).toBe(next)
    })
})

describe('build tzolkins', () => {
  let tzolkins = [
    [[5, 'Imix'], [6, 'Ik\'']],
    [[13, 'Ik\''], [1, 'Ak\'bal']],
    [[13, 'Ajaw'], [1, 'Imix']],
  ]
  test.each(tzolkins)(
    '%s -> %s',
    (prev, next) => {
      let tz = new mayadates.cr.tzolkin.Tzolkin(prev[0], prev[1])
      expect(tz.coeff).toBe(prev[0])
      expect(tz.name).toBe(prev[1])

      let tomorrow = tz.next()
      expect(tomorrow.coeff).toBe(next[0])
      expect(tomorrow.name).toBe(next[1])
    },
  )
})

test('render tzolkin date', () => {
  let haab = new mayadates.cr.tzolkin.Tzolkin(5,'Imix')
  expect(haab.toString()).toBe('5 Imix')
})
