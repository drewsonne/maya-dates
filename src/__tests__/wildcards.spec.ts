import {expect} from 'chai'
import 'mocha'
import LongCountFactory from "../factory/long-count";
import {Wildcard} from "../wildcard";
import CalendarRoundFactory from "../factory/calendar-round";


it('parse long-count fullDate', () => {
  const date = new LongCountFactory().parse('1.2.*.4.5');

  expect(date.isValid()).to.be.true

  expect(date.kIn).to.eq(5);
  expect(date.winal).to.eq(4);
  expect(date.tun).to.be.an.instanceOf(Wildcard);
  expect(date.kAtun).to.eq(2);
  expect(date.bakTun).to.eq(1);

  expect(date.getDateSections(0)).to.eq(5);
  expect(date.getDateSections(4)).to.eq(1);

  expect(date.toString()).to.eq(' 1. 2. *. 4. 5');
});

describe('test fullDate lc', () => {
  const partialLcs: [string, boolean][] = [
    ['9.0.0.0.*', true],
    ['*.*.*.*.*', true],
    ['9.0.0.*.0', true],
    ['9.0.*.0.0', true],
    ['9.*.0.0.0', true],
    ['*.0.0.0.0', true],
    ['*.*.0.0.0', true],
    ['9.0.0.0.0', false],
  ];
  partialLcs.forEach((value) => {
    let [partial, expected] = value
    it(`${partial} -> ${expected}`, () => {
      const partialDate = new LongCountFactory().parse(partial);
      expect(partialDate.isPartial()).to.eq(expected);
    })
  });
});

describe('test fullDate cr', () => {
  const partialLcs: [string, boolean][] = [
    ['4 Ajaw 8 *', true],
    ['4 Ajaw * Kumk\'u', true],
    ['4 * 8 Kumk\'u', true],
    ['* Ajaw 8 Kumk\'u', true],
    ['4 Ajaw 8 Kumk\'u', false],
  ];
  partialLcs.forEach((value) => {
    let [partial, expected] = value
    it(`${partial} -> ${expected}`, () => {
      const partialDate = new CalendarRoundFactory().parse(partial);
      expect(partialDate.isPartial()).to.eq(expected);
    });
  })
});
