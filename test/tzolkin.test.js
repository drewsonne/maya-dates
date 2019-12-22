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
      let today = new mayadates.calendar_round.tzolkin.TzolkinDay(previous)
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
      let tz = new mayadates.calendar_round.tzolkin.Tzolkin(prev[0], prev[1])
      expect(tz.coeff).toBe(prev[0])
      expect(tz.day.name).toBe(prev[1])

      let tomorrow = tz.next()
      expect(tomorrow.coeff).toBe(next[0])
      expect(tomorrow.day.name).toBe(next[1])
    },
  )
})
