const LongCountFactory = require('../src/factory/long-count')
const wildcard = require('../src/wildcard')

test('parse long-count date', () => {
  let date = new LongCountFactory().parse('1.2.*.4.5')

  expect(date.is_valid()).toBeTruthy()

  expect(date.k_in).toBe(5)
  expect(date.winal).toBe(4)
  expect(date.tun).toBe(wildcard)
  expect(date.k_atun).toBe(2)
  expect(date.bak_tun).toBe(1)

  expect(date._get_date_sections(0)).toBe(5)
  expect(date._get_date_sections(4)).toBe(1)

  expect(date.toString()).toBe(' 1. 2. *. 4. 5')
})
