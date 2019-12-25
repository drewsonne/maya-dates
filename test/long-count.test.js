const mayadates = require('../src/index')

test('parse long-count date', () => {
  let date = new mayadates.lc.LongCount(1, 2, 3, 4, 5, 6, 7, 8)

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
  expect(date._get_date_sections(10)).toBe(0)

  expect(date.toString()).toBe(
    ' 8. 7. 6. 5. 4. 3. 2. 1')

  date._set_date_sections(2, 17)

  expect(date.toString()).toBe(
    ' 8. 7. 6. 5. 4.17. 2. 1')
})

test('set long count parts', () => {
  let date = new mayadates.lc.LongCount(1, 2, 3, 4, 5)
  expect(date.toString()).toBe(' 5. 4. 3. 2. 1')

  date.k_in = 5
  date.winal = 4
  date.tun = 3
  date.k_atun = 2
  date.bak_tun = 1
  date.piktun = 10
  expect(date.toString()).toBe('10. 1. 2. 3. 4. 5')

  // These two are backwards to test that the extra
  // positions beyond the Bak'tun can be correctly rendered
  date.kinchiltun = 12
  expect(date.toString()).toBe('12. 0.10. 1. 2. 3. 4. 5')
  date.kalabtun = 11
  expect(date.toString()).toBe('12.11.10. 1. 2. 3. 4. 5')
})

test('print short long-count date', () => {
  let date = new mayadates.lc.LongCount(1, 2)

  expect(date.toString()).toBe(' 0. 0. 0. 2. 1')
})
