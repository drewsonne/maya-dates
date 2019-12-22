const mayadates = require('../src/index')

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
      expect(cr.haab.coeff).toBe(expected[0])
      expect(cr.haab.month.name).toBe(expected[1])
      expect(cr.tzolkin.coeff).toBe(expected[2])
      expect(cr.tzolkin.day.name).toBe(expected[3])
    })
})
