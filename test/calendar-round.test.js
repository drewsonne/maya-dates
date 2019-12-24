const mayadates = require('../src/index')

describe('increment calendar-rounds', () => {
  let tzolkin_days = [
    ['2Ak\'bal 6 Muwan', [3, 'K\'an', 7, 'Muwan']],
  ]
  test.each(tzolkin_days)(
    '%s -> %s',
    (today, next) => {
      let cr = new mayadates.factory.CalendarRoundFactory().parse(today)
      let tomorrow = cr.next()
      expect(tomorrow.tzolkin.coeff).toBe(next[0])
      expect(tomorrow.tzolkin.name).toBe(next[1])
      expect(tomorrow.haab.coeff).toBe(next[2])
      expect(tomorrow.haab.name).toBe(next[3])
    })
})

test('failed calendar-round parse', () => {
  let cr = new mayadates.factory.CalendarRoundFactory().parse('World')
  expect(cr).toBeNull()
})

describe('parse calendar-round', () => {
  let sources = [
    ['2 Ak\'bal 6 Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2 Ak\'bal 6Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2Ak\'bal 6 Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2Ak\'bal 6Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
  ]
  test.each(sources)(
    '%s',
    (source, expected) => {
      let cr = new mayadates.factory.CalendarRoundFactory().parse(source)
      expect(cr.tzolkin.coeff).toBe(expected[0])
      expect(cr.tzolkin.name).toBe(expected[1])
      expect(cr.haab.coeff).toBe(expected[2])
      expect(cr.haab.name).toBe(expected[3])
    })
})

test('render calendar round', () => {
  let haab = new mayadates.calendar_round.CalendarRound(
    2, 'Ajaw', 8, 'Kumk\'u')
  expect(haab.toString()).toBe('2 Ajaw 8 Kumk\'u')
})
