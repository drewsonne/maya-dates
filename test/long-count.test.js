const lc = require('../src/long-count')

test('parse long-count date', () => {
  let date = new lc.LongCount(1, 2, 3, 4, 5, 6, 7, 8)

  expect(date.is_valid()).toBeTruthy()

  expect(date.k_in).toBe(1)
  expect(date.winal).toBe(2)
  expect(date.tun).toBe(3)
  expect(date.k_atun).toBe(4)
  expect(date.bak_tun).toBe(5)
  expect(date.piktun).toBe(6)
  expect(date.kalabtun).toBe(7)
  expect(date.kinchiltun).toBe(8)

  expect(date._get_date_sections(0)).toBe(1)
  expect(date._get_date_sections(4)).toBe(5)

  expect(date.toString()).toBe(
    ' 8. 7. 6. 5. 4. 3. 2. 1')
})
