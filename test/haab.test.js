import mayadates from '../src/index';

describe('increment haab months', () => {
  const tzolkinDays = [
    ['Pop', 'Wo'],
    ['Xul', 'Yaxk\'in'],
    ['Wayeb', 'Pop'],
  ];
  it.each(tzolkinDays)(
    '%s -> %s',
    (previous, next) => {
      const today = mayadates.cr.haab.getHaabMonth(previous);
      const tomorrow = today.next();
      const expected = mayadates.cr.haab.getHaabMonth(next);
      expect(tomorrow.name).toBe(next);
      expect(tomorrow).toBe(expected);
    },
  );
});

describe('build haabs', () => {
  const haabs = [
    [[5, 'Pop'], [6, 'Pop']],
    [[19, 'Pop'], [0, 'Wo']],
    [[19, 'Xul'], [0, 'Yaxk\'in']],
    [[4, 'Wayeb'], [0, 'Pop']],
  ];
  it.each(haabs)(
    '%s -> %s',
    (prev, next) => {
      const haab = mayadates.cr.haab.getHaab(prev[0], prev[1]);
      expect(haab.coeff).toBe(prev[0]);
      expect(haab.name).toBe(prev[1]);

      const tomorrow = haab.next();
      expect(tomorrow.coeff).toBe(next[0]);
      expect(tomorrow.name).toBe(next[1]);
    },
  );
});

test('render haab fullDate', () => {
  const haab = mayadates.cr.haab.getHaab(5, 'Pop');
  expect(haab.toString()).toBe('5 Pop');
});

describe('shift haab', () => {
  const haabs = [
    [[8, 'Kumk\'u'], 359, [2, 'Kumk\'u']],
    [[8, 'Kumk\'u'], 361, [4, 'Kumk\'u']],
    [[8, 'Kumk\'u'], 363, [6, 'Kumk\'u']],
    [[8, 'Kumk\'u'], 365, [8, 'Kumk\'u']],
    [[18, 'Pop'], 1, [19, 'Pop']],
    [[18, 'Pop'], 100, [18, 'Xul']],
    [[18, 'Pop'], 177, [15, 'Yax']],
    [[18, 'Pop'], 345, [3, 'Wayeb']],
    [[8, 'Kumk\'u'], 309, [12, 'Muwan']],
    [[8, 'Kumk\'u'], 367, [10, 'Kumk\'u']],
    [[8, 'Kumk\'u'], 369, [12, 'Kumk\'u']],
    [[4, 'Wayeb'], 1, [0, 'Pop']],
  ];
  it.each(haabs)(
    '%s + %s = %s',
    (start, incremental, expected) => {
      const prevHaab = mayadates.cr.haab.getHaab(...start);
      const newHaab = prevHaab.shift(incremental);

      expect(newHaab.coeff).toBe(expected[0]);
      expect(newHaab.name).toBe(expected[1]);
    },
  );
});
