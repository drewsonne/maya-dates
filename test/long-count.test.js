import mayadates from '../src/index';

describe('parse long-count fullDate', () => {
  const dates = [
    ['7.13', ' 0. 0. 0. 7.13'],
    ['9.16.19.17.19', ' 9.16.19.17.19'],
  ];
  const factory = new mayadates.factory.LongCountFactory();
  it.each(dates)(
    '%s -> %s',
    (date, expected) => {
      const actual = factory.parse(date);
      expect(`${actual}`).toBe(expected);
    },
  );
});

test('fail longcount', () => {
  expect(
    new mayadates.factory.LongCountFactory().parse('hello, world'),
  ).toBeNull();
});

describe('modify long-count fullDate', () => {
  const dates = [
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
  it.each(dates)(
    '%s -> %s; %s -> %s',
    (
      numericDate, expected,
      modifiers, expectedModified,
    ) => {
      const date = new mayadates.lc.LongCount(...numericDate);

      expect(date.isValid()).toBeTruthy();

      expect(date.kIn).toBe(numericDate[0]);
      expect(date.winal).toBe(numericDate[1]);
      expect(date.tun).toBe(numericDate[2]);
      expect(date.kAtun).toBe(numericDate[3]);
      expect(date.bakTun).toBe(numericDate[4]);
      expect(date.piktun).toBe(numericDate[5]);
      expect(date.kalabtun).toBe(numericDate[6]);
      expect(date.kinchiltun).toBe(numericDate[7]);

      expect(date.getDateSections(0)).toBe(numericDate[0]);
      expect(date.getDateSections(4)).toBe(numericDate[4]);
      expect(date.getDateSections(10)).toBe(0);

      expect(date.toString()).toBe(expected);

      date.setDateSections(...modifiers);

      expect(date.toString()).toBe(expectedModified);
    },
  );
});

test('set long count parts', () => {
  const date = new mayadates.lc.LongCount(1, 2, 3, 4, 5);
  expect(date.toString()).toBe(' 5. 4. 3. 2. 1');

  date.kIn = 5;
  date.winal = 4;
  date.tun = 3;
  date.kAtun = 2;
  date.bakTun = 1;
  date.piktun = 10;
  expect(date.toString()).toBe('10. 1. 2. 3. 4. 5');

  // These two are backwards to test that the extra
  // positions beyond the Bak'tun can be correctly rendered
  date.kinchiltun = 12;
  expect(date.toString()).toBe('12. 0.10. 1. 2. 3. 4. 5');
  date.kalabtun = 11;
  expect(date.toString()).toBe('12.11.10. 1. 2. 3. 4. 5');
});

test('print short long-count fullDate', () => {
  const date = new mayadates.lc.LongCount(1, 2);

  expect(date.toString()).toBe(' 0. 0. 0. 2. 1');
});

describe('test lord of night glyphs', () => {
  const {night} = mayadates.lc;
  const dates = [
    ['9.16.19.17.19', night.G8, 'G8'],
    ['9.17.0.0.0', night.get('G9'), 'G9'],
    ['9.17.0.0.5', night.G5, 'G5'],
    ['9.17.0.0.9', night.G9, 'G9'],
    ['9.17.0.0.10', night.get('G1'), 'G1'],
  ];
  const factory = new mayadates.factory.LongCountFactory();
  it.each(dates)(
    '%s -> %s',
    (date, lordOfNight, id) => {
      const lc = factory.parse(date);
      expect(lc.lordOfNight).toBe(lordOfNight);
      expect(lc.lordOfNight).not.toBeUndefined();
      expect(`${lc.lordOfNight}`).toBe(id);
    },
  );
});


describe('comparison', () => {
  const dates = [
    [[0, 1], [1], true],
  ].map((row) => [
    new mayadates.lc.LongCount(...row[0]),
    new mayadates.lc.LongCount(...row[1]),
    row[2],
  ]);
  it.each(dates)(
    '%s > %s = %s',
    (a, b, aLtB) => {
      expect(a.gt(b) === aLtB).toBeTruthy();
      expect(a.lt(b) === aLtB).toBeFalsy();
    },
  );
});

test('sign', () => {
  const lc = new mayadates.lc.LongCount(1, 1, 1, 1, 1);
  expect(lc.isPositive).toBeTruthy();
  expect(lc.isNegative).toBeFalsy();

  lc.isNegative = true;
  expect(lc.isPositive).toBeFalsy();
  expect(lc.isNegative).toBeTruthy();

  lc.isPositive = true;
  expect(lc.isPositive).toBeTruthy();
  expect(lc.isNegative).toBeFalsy();
});

test('equality', () => {
  const lc1 = new mayadates.lc.LongCount(1, 1, 1, 1, 1);
  const lc2 = new mayadates.lc.LongCount(1, 1, 1, 1, 1);
  const lc3 = new mayadates.lc.LongCount(2, 2, 2, 2, 2);

  expect(lc1.equal(lc1)).toBeTruthy();
  expect(lc1.equal(lc2)).toBeTruthy();
  expect(lc1.equal(lc3)).toBeFalsy();
});

test('wildcard position failure', () => {
  const lc = new mayadates.lc.LongCount(1, 1, mayadates.wildcard, 1, 1);
  expect(() => lc.getPosition(0)).toThrow(
    'Can not get position of fullDate dates',
  );
});
