import mayadates from '../src/index';

const { wildcard } = mayadates;
const { CalendarRoundFactory, LongCountFactory } = mayadates.factory;

test('parse long-count fullDate', () => {
  const date = new LongCountFactory().parse('1.2.*.4.5');

  expect(date.isValid()).toBeTruthy();

  expect(date.kIn).toBe(5);
  expect(date.winal).toBe(4);
  expect(date.tun).toBe(wildcard);
  expect(date.kAtun).toBe(2);
  expect(date.bakTun).toBe(1);

  expect(date.getDateSections(0)).toBe(5);
  expect(date.getDateSections(4)).toBe(1);

  expect(date.toString()).toBe(' 1. 2. *. 4. 5');
});

describe('test fullDate lc', () => {
  const partialLcs = [
    ['9.0.0.0.*', true],
    ['*.*.*.*.*', true],
    ['9.0.0.*.0', true],
    ['9.0.*.0.0', true],
    ['9.*.0.0.0', true],
    ['*.0.0.0.0', true],
    ['*.*.0.0.0', true],
    ['9.0.0.0.0', false],
  ];
  it.each(partialLcs)(
    '%s -> %s',
    (partial, expected) => {
      const partialDate = new LongCountFactory().parse(partial);
      expect(partialDate.isPartial()).toBe(expected);
    },
  );
});

describe('test fullDate cr', () => {
  const partialLcs = [
    ['4 Ajaw 8 *', true],
    ['4 Ajaw * Kumk\'u', true],
    ['4 * 8 Kumk\'u', true],
    ['* Ajaw 8 Kumk\'u', true],
    ['4 Ajaw 8 Kumk\'u', false],
  ];
  it.each(partialLcs)(
    '%s -> %s',
    (partial, expected) => {
      const partialDate = new CalendarRoundFactory().parse(partial);
      expect(partialDate.isPartial()).toBe(expected);
    },
  );
});
