const mayadates = require('../src/index')
const wildcard = mayadates.wildcard
/**
 * @test {CalendarRoundFactory}
 * @test {CalendarRound#next}
 */
describe('increment calendar-rounds', () => {
  let tzolkin_days = [
    ['2Ak\'bal 6 Muwan', [3, 'K\'an', 7, 'Muwan']],
    ['4 Ajaw 8 Kumk\'u', [5, 'Imix', 9, 'Kumk\'u']],
    ['13 Kimi 4 Wayeb', [1, 'Manik\'', 0, 'Pop']],
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

describe('shift calendar-rounds', () => {
  let tzolkin_days = [
    ['4 Ajaw 8 Kumk\'u', 10, [1, 'Ok', 18, 'Kumk\'u']],
    ['4 Ajaw 8 Kumk\'u', 365, [5, 'Chikchan', 8, 'Kumk\'u']],
  ]
  test.each(tzolkin_days)(
    '%s + %s = %s',
    (today, increment, expected) => {
      let cr = new mayadates.factory.CalendarRoundFactory().parse(today)
      let tomorrow = cr.shift(increment)
      expect(tomorrow.tzolkin.coeff).toBe(expected[0])
      expect(tomorrow.tzolkin.name).toBe(expected[1])
      expect(tomorrow.haab.coeff).toBe(expected[2])
      expect(tomorrow.haab.name).toBe(expected[3])
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

describe('parse calendar-round wildcards', () => {
  let sources = [
    [
      '* Ak\'bal 6 Muwan',
      [wildcard, 'Ak\'bal', 6, 'Muwan'],
      '* Ak\'bal 6 Muwan'],
    [
      '2 Ak\'bal *Muwan',
      [2, 'Ak\'bal', wildcard, 'Muwan'],
      '2 Ak\'bal * Muwan'],
    [
      '*Ak\'bal 6 *',
      [wildcard, 'Ak\'bal', 6, wildcard],
      '* Ak\'bal 6 *'],
    [
      '2Ak\'bal 6*',
      [2, 'Ak\'bal', 6, wildcard],
      '2 Ak\'bal 6 *',
    ],
  ]
  test.each(sources)(
    '%s',
    (source, expected, name) => {
      let cr = new mayadates.factory.CalendarRoundFactory().parse(source)
      expect(cr.tzolkin.coeff).toBe(expected[0])
      expect(cr.tzolkin.name).toBe(expected[1])
      expect(cr.haab.coeff).toBe(expected[2])
      expect(cr.haab.name).toBe(expected[3])

      expect(cr.toString()).toBe(name)
    })
})

test('render calendar round', () => {
  expect(
    new mayadates.cr.CalendarRound(
      4, 'Ajaw',
      8, 'Kumk\'u',
    ).toString(),
  ).toBe(
    '4 Ajaw 8 Kumk\'u',
  )
})
