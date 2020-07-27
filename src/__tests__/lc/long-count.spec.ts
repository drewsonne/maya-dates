import LongCountFactory from "../../factory/long-count";
import 'mocha'
import {expect} from 'chai'
import LongCount from "../../lc/long-count";
import {Wildcard} from "../../wildcard";
import {LordOfTheNight, lords} from "../../lc/night/lord-of-night"

describe('parse long-count fullDate', () => {
  const dates = [
    ['7.13', ' 0. 0. 0. 7.13'],
    ['9.16.19.17.19', ' 9.16.19.17.19'],
  ];
  const factory = new LongCountFactory();
  dates.forEach((args) => {
    const [date, expected] = args;
    it(`${date} -> ${expected}`, () => {
        const actual = factory.parse(date);
        expect(`${actual}`).to.equal(expected);
      },
    );
  });
});

it('fail longcount', () => {
  const failParse = () => {
    new LongCountFactory().parse('hello, world')
  }
  expect(failParse).to.throw()
});

describe('modify long-count fullDate', () => {
  const dates: [number[], string, number[], string][] = [
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
  dates.forEach((args: [number[], string, number[], string]) => {
    const [numericDate, expected,
      modifiers, expectedModified] = args;
    it(`${numericDate} -> ${expected}; ${modifiers} -> ${expectedModified}`, () => {
        const date = new LongCount(...numericDate);

        expect(date.isValid()).to.be.true;

        expect(date.kIn).to.equal(numericDate[0]);
        expect(date.winal).to.equal(numericDate[1]);
        expect(date.tun).to.equal(numericDate[2]);
        expect(date.kAtun).to.equal(numericDate[3]);
        expect(date.bakTun).to.equal(numericDate[4]);
        expect(date.piktun).to.equal(numericDate[5]);
        expect(date.kalabtun).to.equal(numericDate[6]);
        expect(date.kinchiltun).to.equal(numericDate[7]);

        expect(date.getDateSections(0)).to.equal(numericDate[0]);
        expect(date.getDateSections(4)).to.equal(numericDate[4]);
        expect(date.getDateSections(10)).to.equal(0);

        expect(date.toString()).to.equal(expected);

        date.setDateSections(modifiers[0], modifiers[1]);

        expect(date.toString()).to.equal(expectedModified);
      },
    );
  });
});

it('set long count parts', () => {
  const date = new LongCount(1, 2, 3, 4, 5);
  expect(date.toString()).to.equal(' 5. 4. 3. 2. 1');

  date.kIn = 5;
  date.winal = 4;
  date.tun = 3;
  date.kAtun = 2;
  date.bakTun = 1;
  date.piktun = 10;
  expect(date.toString()).to.equal('10. 1. 2. 3. 4. 5');

  // These two are backwards to test that the extra
  // positions beyond the Bak'tun can be correctly rendered
  date.kinchiltun = 12;
  expect(date.toString()).to.equal('12. 0.10. 1. 2. 3. 4. 5');
  date.kalabtun = 11;
  expect(date.toString()).to.equal('12.11.10. 1. 2. 3. 4. 5');
});

it('print short long-count fullDate', () => {
  const date = new LongCount(1, 2);

  expect(date.toString()).to.equal(' 0. 0. 0. 2. 1');
});

describe('test lord of night glyphs', () => {
  const dates: [string, LordOfTheNight, string][] = [
    ['9.16.19.17.19', lords.G8, 'G8'],
    ['9.17.0.0.0', lords.get('G9'), 'G9'],
    ['9.17.0.0.5', lords.G5, 'G5'],
    ['9.17.0.0.9', lords.G9, 'G9'],
    ['9.17.0.0.10', lords.get('G1'), 'G1'],
  ];
  const factory = new LongCountFactory();
  dates.forEach((args) => {
    const [date, lordOfNight, id] = args;
    it(`${date} -> ${lordOfNight} (${id})`, () => {
      const lc = factory.parse(date);
      expect(lc!.lordOfNight).to.equal(lordOfNight);
      expect(lc!.lordOfNight).not.to.be.undefined;
      expect(`${lc!.lordOfNight}`).to.equal(id);
    });
  });
});


describe('comparison', () => {
  const dataset: [number[], number[], boolean][] = [
    [[0, 1], [1], true],
  ]
  const expanded: [LongCount, LongCount, boolean][] = dataset.map((row: [number[], number[], boolean]) => [
    new LongCount(...row[0]),
    new LongCount(...row[1]),
    row[2],
  ])
  expanded.forEach((args: [LongCount, LongCount, boolean]) => {
    const [a, b, aLtB] = args;
    it(`${a} > ${b} = ${aLtB}`, () => {
      expect(a.gt(b) === aLtB).to.be.true;
      expect(a.lt(b) === aLtB).to.be.false;
    })
  });
});

it('sign', () => {
  const lc = new LongCount(1, 1, 1, 1, 1);
  expect(lc.isPositive).to.be.true;
  expect(lc.isNegative).to.be.false;

  lc.isNegative = true;
  expect(lc.isPositive).to.be.false;
  expect(lc.isNegative).to.be.true;

  lc.isPositive = true;
  expect(lc.isPositive).to.be.true;
  expect(lc.isNegative).to.be.false;
});

it('equality', () => {
  const lc1 = new LongCount(1, 1, 1, 1, 1);
  const lc2 = new LongCount(1, 1, 1, 1, 1);
  const lc3 = new LongCount(2, 2, 2, 2, 2);
  const lc4 = new LongCount(3, 3, 3, 3, 0);
  const lc5 = new LongCount(3, 3, 3, 3);

  expect(lc1.equal(lc1)).to.be.true;
  expect(lc1.exactlyEqual(lc1)).to.be.true;

  expect(lc1.equal(lc2)).to.be.true;
  expect(lc1.exactlyEqual(lc2)).to.be.true;
  expect(lc1.equal(lc3)).to.be.false;

  expect(lc4.equal(lc5)).to.be.true;
  expect(lc4.exactlyEqual(lc5)).to.be.false;
});

it('wildcard position failure', () => {
  const lc = new LongCount(1, 1, new Wildcard(), 1, 1);
  expect(() => lc.getPosition()).to.throw(
    'Can not get position of fullDate dates',
  );
});

it('significant digits', () => {
  expect(
    new LongCount(1, 1, 1, 1, 0, 0, 0).sigParts
  ).to.eql([1, 1, 1, 1]);
});
