const mayadates = require('../src/index');

const {wildcard} = mayadates;
/**
 * @test {CalendarRoundFactory}
 * @test {CalendarRound#next}
 */
describe('increment calendar-rounds', () => {
  const tzolkinDays = [
    ['2Ak\'bal 6 Muwan', [3, 'K\'an', 7, 'Muwan']],
    ['4 Ajaw 8 Kumk\'u', [5, 'Imix', 9, 'Kumk\'u']],
    ['13 Kimi 4 Wayeb', [1, 'Manik\'', 0, 'Pop']],
  ];
  it.each(tzolkinDays)(
    '%s -> %s',
    (today, next) => {
      const cr = new mayadates.factory.CalendarRoundFactory().parse(today);
      const tomorrow = cr.next();
      expect(tomorrow.tzolkin.coeff).toBe(next[0]);
      expect(tomorrow.tzolkin.name).toBe(next[1]);
      expect(tomorrow.haab.coeff).toBe(next[2]);
      expect(tomorrow.haab.name).toBe(next[3]);
    },
  );
});

describe('shift calendar-rounds', () => {
  const tzolkinDays = [
    ['4 Ajaw 8 Kumk\'u', 0, [4, 'Ajaw', 8, 'Kumk\'u']],
    ['4 Ajaw 8 Kumk\'u', 1, [5, 'Imix', 9, 'Kumk\'u']],
    ['4 Ajaw 8 Kumk\'u', 10, [1, 'Ok', 18, 'Kumk\'u']],
    ['4 Ajaw 8 Kumk\'u', 365, [5, 'Chikchan', 8, 'Kumk\'u']],
  ];
  it.each(tzolkinDays)(
    '%s + %s = %s',
    (today, increment, expected) => {
      const cr = new mayadates.factory.CalendarRoundFactory().parse(today);
      const tomorrow = cr.shift(increment);
      expect(tomorrow.tzolkin.coeff).toBe(expected[0]);
      expect(tomorrow.tzolkin.name).toBe(expected[1]);
      expect(tomorrow.haab.coeff).toBe(expected[2]);
      expect(tomorrow.haab.name).toBe(expected[3]);
    },
  );
});

test('failed calendar-round parse', () => {
  const cr = new mayadates.factory.CalendarRoundFactory().parse('World');
  expect(cr).toBeNull();
});

describe('parse calendar-round', () => {
  const sources = [
    ['2 Ak\'bal 6 Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2 Ak\'bal 6Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2Ak\'bal 6 Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ['2Ak\'bal 6Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
  ];
  it.each(sources)(
    '%s',
    (source, expected) => {
      const cr = new mayadates.factory.CalendarRoundFactory().parse(source);
      expect(cr.tzolkin.coeff).toBe(expected[0]);
      expect(cr.tzolkin.name).toBe(expected[1]);
      expect(cr.haab.coeff).toBe(expected[2]);
      expect(cr.haab.name).toBe(expected[3]);
    },
  );
});

describe('parse calendar-round wildcards', () => {
  const sources = [
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
  ];
  it.each(sources)(
    '%s',
    (source, expected, name) => {
      const cr = new mayadates.factory.CalendarRoundFactory().parse(source);
      expect(cr.tzolkin.coeff).toBe(expected[0]);
      expect(cr.tzolkin.name).toBe(expected[1]);
      expect(cr.haab.coeff).toBe(expected[2]);
      expect(cr.haab.name).toBe(expected[3]);

      expect(cr.toString()).toBe(name);
    },
  );
});

test('render calendar round', () => {
  expect(
    mayadates.cr.getCalendarRound(
      4, 'Ajaw',
      8, 'Kumk\'u',
    ).toString(),
  ).toBe(
    '4 Ajaw 8 Kumk\'u',
  );
});

describe('calendar round diff\'s', () => {
  const dates = [
    ['5 Kimi 4 Mol', '6 Manik\' 5 Mol', [1]],
    ['5 Kimi 4 Mol', '7 Ok 13 Xul', [-1, 17, 14, 5, 16]]
  ];
  const crFactory = new mayadates.factory.CalendarRoundFactory();
  it.each(dates)(
    '%s - %s = %s',
    (fromRaw, toRaw, expectRaw) => {
      const from = crFactory.parse(fromRaw);
      const to = crFactory.parse(toRaw);
      const expected = new mayadates.lc.DistanceNumber(...expectRaw).normalise();

      expect(from.minus(to)).toStrictEqual(expected);
    }
  );
});
