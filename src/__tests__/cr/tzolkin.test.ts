import mayadates from '../index';

describe('increment tzolkin days', () => {
  const tzolkinDays = [
    ['Imix', 'Ik\''],
    ['Ik\'', 'Ak\'bal'],
    ['Ak\'bal', 'K\'an'],
    ['K\'an', 'Chikchan'],
    ['Chikchan', 'Kimi'],
    ['Kimi', 'Manik\''],
    ['Manik\'', 'Lamat'],
    ['Lamat', 'Muluk'],
    ['Muluk', 'Ok'],
    ['Ok', 'Chuwen'],
    ['Chuwen', 'Eb'],
    ['Eb', 'Ben'],
    ['Ben', 'Ix'],
    ['Ix', 'Men'],
    ['Men', 'Kib'],
    ['Kib', 'Kaban'],
    ['Kaban', 'Etz\'nab'],
    ['Etz\'nab', 'Kawak'],
    ['Kawak', 'Ajaw'],
    ['Ajaw', 'Imix'],
  ];
  it.each(tzolkinDays)(
    '%s -> %s',
    (previous, next) => {
      const today = mayadates.cr.tzolkin.getTzolkinDay(previous);
      const tomorrow = today.next();
      const expected = mayadates.cr.tzolkin.getTzolkinDay(next);
      expect(tomorrow === expected).toBeTruthy();
    },
  );
});

describe('build tzolkins', () => {
  const tzolkins = [
    [[5, 'Imix'], [6, 'Ik\'']],
    [[13, 'Ik\''], [1, 'Ak\'bal']],
    [[13, 'Ajaw'], [1, 'Imix']],
  ];
  it.each(tzolkins)(
    '%s -> %s',
    (prev, next) => {
      const tz = mayadates.cr.tzolkin.getTzolkin(prev[0], prev[1]);
      expect(tz.coeff).toBe(prev[0]);
      expect(tz.name).toBe(prev[1]);

      const expected = mayadates.cr.tzolkin.getTzolkin(next[0], next[1]);
      const tomorrow = tz.next();
      expect(tomorrow.coeff).toBe(next[0]);
      expect(tomorrow.name).toBe(next[1]);
      expect(tomorrow).toStrictEqual(expected);
    },
  );
});

describe('shift tzolkins', () => {
  const tzolkins = [
    [[5, 'Imix'], 1, [6, 'Ik\'']],
    [[13, 'Ajaw'], 100, [9, 'Ajaw']],
    [[13, 'Ajaw'], 177, [8, 'Kaban']],
  ];
  it.each(tzolkins)(
    '%s + %s = %s',
    (start, incremental, expected) => {
      const date = mayadates.cr.tzolkin
        .getTzolkin(...start);
      const newTz = date.shift(incremental);

      const expectedDate = mayadates.cr.tzolkin.getTzolkin(...expected);
      expect(newTz === expectedDate).toBeTruthy();
    },
  );
});

test('render tzolkin fullDate', () => {
  const haab = mayadates.cr.tzolkin.getTzolkin(5, 'Imix');
  expect(haab.toString()).toBe('5 Imix');
});
