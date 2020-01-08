const mayadates = require('../src/index');

describe('parse long-count date', () => {
  let dates = [
    ['7.13', ' 0. 0. 0. 7.13'],
    ['9.16.19.17.19', ' 9.16.19.17.19']
  ];
  let factory = new mayadates.factory.LongCountFactory();
  test.each(dates)(
    '%s -> %s',
    (date, expected) => {
      let actual = factory.parse(date);
      expect(`${actual}`).toBe(expected);
    });
});

describe('modify long-count date', () => {
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
  ];
  test.each(dates)(
    '%s -> %s; %s -> %s',
    (
      numeric_date, expected,
      modifiers, expected_modified
    ) => {
      let date = new mayadates.lc.LongCount(...numeric_date);

      expect(date.is_valid()).toBeTruthy();

      expect(date.k_in).toBe(numeric_date[0]);
      expect(date.winal).toBe(numeric_date[1]);
      expect(date.tun).toBe(numeric_date[2]);
      expect(date.k_atun).toBe(numeric_date[3]);
      expect(date.bak_tun).toBe(numeric_date[4]);
      expect(date.piktun).toBe(numeric_date[5]);
      expect(date.kalabtun).toBe(numeric_date[6]);
      expect(date.kinchiltun).toBe(numeric_date[7]);

      expect(date.get_date_sections(0)).toBe(numeric_date[0]);
      expect(date.get_date_sections(4)).toBe(numeric_date[4]);
      expect(date.get_date_sections(10)).toBe(0);

      expect(date.toString()).toBe(expected);

      date.set_date_sections(...modifiers);

      expect(date.toString()).toBe(expected_modified);
    }
  );

});

test('set long count parts', () => {
  let date = new mayadates.lc.LongCount(1, 2, 3, 4, 5);
  expect(date.toString()).toBe(' 5. 4. 3. 2. 1');

  date.k_in = 5;
  date.winal = 4;
  date.tun = 3;
  date.k_atun = 2;
  date.bak_tun = 1;
  date.piktun = 10;
  expect(date.toString()).toBe('10. 1. 2. 3. 4. 5');

  // These two are backwards to test that the extra
  // positions beyond the Bak'tun can be correctly rendered
  date.kinchiltun = 12;
  expect(date.toString()).toBe('12. 0.10. 1. 2. 3. 4. 5');
  date.kalabtun = 11;
  expect(date.toString()).toBe('12.11.10. 1. 2. 3. 4. 5');
});

test('print short long-count date', () => {
  let date = new mayadates.lc.LongCount(1, 2);

  expect(date.toString()).toBe(' 0. 0. 0. 2. 1');
});

describe('test lord of night glyphs', () => {
  const night = mayadates.lc.night;
  let dates = [
    ['9.16.19.17.19', night.G8, 'G8'],
    ['9.17.0.0.0', night.get('G9'), 'G9'],
    ['9.17.0.0.5', night.G5, 'G5'],
    ['9.17.0.0.9', night.G9, 'G9'],
    ['9.17.0.0.10', night.get('G1'), 'G1'],
  ];
  let factory = new mayadates.factory.LongCountFactory();
  test.each(dates)(
    '%s -> %s',
    (date, lord_of_night, id) => {
      let lc = factory.parse(date);
      expect(lc.lord_of_night).toBe(lord_of_night);
      expect(lc.lord_of_night).not.toBeUndefined();
      expect(`${lc.lord_of_night}`).toBe(id);
    }
  );
});
