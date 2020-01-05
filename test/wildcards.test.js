const LongCountFactory = require('../src/factory/long-count')
const CalendarRoundFactory = require('../src/factory/calendar-round')
const wildcard = require('../src/wildcard')

test('parse long-count date', () => {
  let date = new LongCountFactory().parse('1.2.*.4.5')

  expect(date.is_valid()).toBeTruthy()

  expect(date.k_in).toBe(5)
  expect(date.winal).toBe(4)
  expect(date.tun).toBe(wildcard)
  expect(date.k_atun).toBe(2)
  expect(date.bak_tun).toBe(1)

  expect(date.get_date_sections(0)).toBe(5)
  expect(date.get_date_sections(4)).toBe(1)

  expect(date.toString()).toBe(' 1. 2. *. 4. 5')
})

describe('test partial lc', () => {
  let partial_lcs = [
    ['9.0.0.0.*', true],
    ['*.*.*.*.*', true],
    ['9.0.0.*.0', true],
    ['9.0.*.0.0', true],
    ['9.*.0.0.0', true],
    ['*.0.0.0.0', true],
    ['*.*.0.0.0', true],
    ['9.0.0.0.0', false],
  ]
  test.each(partial_lcs)(
    '%s -> %s',
    (partial, expected) => {
      let partial_date = new LongCountFactory().parse(partial)
      expect(partial_date.is_partial()).toBe(expected)
    })
})

describe('test partial cr', () => {
  let partial_lcs = [
    ['4 Ajaw 8 *', true],
    ['4 Ajaw * Kumk\'u', true],
    ['4 * 8 Kumk\'u', true],
    ['* Ajaw 8 Kumk\'u', true],
    ['4 Ajaw 8 Kumk\'u', false],
  ]
  test.each(partial_lcs)(
    '%s -> %s',
    (partial, expected) => {
      let partial_date = new CalendarRoundFactory().parse(partial)
      expect(partial_date.is_partial()).toBe(expected)
    })
})
