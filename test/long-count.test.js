const mayadates = require('../src/index')

describe('parse long-count date', () => {
  let dates = [
    [
      [1, 2, 3, 4, 5, 6, 7, 8],
      ' 8. 7. 6. 5. 4. 3. 2. 1',
      [2, 17],
      ' 8. 7. 6. 5. 4.17. 2. 1',
    ],
    [
      [0, 0, 0, 17, 9, 0, 0, 0],
      ' 9.17. 0. 0. 0',
      [0, 10],
      ' 9.17. 0. 0.10',
    ],
  ]
  test.each(dates)(
    '%s -> %s; %s -> %s',
    (
      numeric_date, expected,
      modifiers, expected_modified,
    ) => {
      let date = new mayadates.lc.LongCount(...numeric_date)

      expect(date.is_valid()).toBeTruthy()

      expect(date.k_in).toBe(numeric_date[0])
      expect(date.winal).toBe(numeric_date[1])
      expect(date.tun).toBe(numeric_date[2])
      expect(date.k_atun).toBe(numeric_date[3])
      expect(date.bak_tun).toBe(numeric_date[4])
      expect(date.piktun).toBe(numeric_date[5])
      expect(date.kalabtun).toBe(numeric_date[6])
      expect(date.kinchiltun).toBe(numeric_date[7])

      expect(date._get_date_sections(0)).toBe(numeric_date[0])
      expect(date._get_date_sections(4)).toBe(numeric_date[4])
      expect(date._get_date_sections(10)).toBe(0)

      expect(date.toString()).toBe(expected)

      date._set_date_sections(...modifiers)

      expect(date.toString()).toBe(expected_modified)
    },
  )

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

  expect(date.toString()).toBe(' 2. 1. 0. 0. 0')
})
