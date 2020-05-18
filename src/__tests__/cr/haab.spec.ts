import 'mocha'
import {expect} from 'chai'
import {getHaabMonth, HaabMonth} from "../../cr/component/haabMonth";
import {getHaab} from "../../cr/haab";
import Coefficient from "../../cr/component/coefficient";

describe('increment haab months', () => {
  const tzolkinDays = [
    ['Pop', 'Wo'],
    ['Xul', 'Yaxk\'in'],
    ['Wayeb', 'Pop'],
  ];
  tzolkinDays.forEach((args) => {
    const [previous, next] = args;
    it(`${previous} -> ${next}`, () => {
      const today = getHaabMonth(previous);
      const tomorrow = today.next();
      const expected = getHaabMonth(next);
      // expect(tomorrow.name).to.equal(next);
      expect(tomorrow).to.equal(expected);
    });
  });
});

describe('build haabs', () => {
  const haabs = [
    [[5, 'Pop'], [6, getHaabMonth('Pop')]],
    [[19, 'Pop'], [0, getHaabMonth('Wo')]],
    [[19, 'Xul'], [0, getHaabMonth('Yaxk\'in')]],
    [[4, 'Wayeb'], [0, getHaabMonth('Pop')]],
  ];
  haabs.forEach((args: [[number, string], [number, HaabMonth]]) => {
    const [prev, next] = args;
    it(`${prev} -> ${next}`, () => {
      const haab = getHaab(prev[0], getHaabMonth(prev[1]));
      expect(haab.coeff.value).to.equal(prev[0]);
      expect(haab.name).to.equal(prev[1]);

      const tomorrow = haab.next();
      expect(tomorrow.coeff.value).to.equal(next[0]);
      expect(tomorrow.month).to.equal(next[1]);
    });
  });
});

it('render haab fullDate', () => {
  const haab = getHaab(new Coefficient(5), 'Pop');
  expect(haab.toString()).to.equal('5 Pop');
});

describe('shift haab', () => {
  const kumku = getHaabMonth('Kumk\'u');
  const pop = getHaabMonth('Pop');
  const haabs = [
    [[8, 'Kumk\'u'], 359, [2, kumku]],
    [[8, 'Kumk\'u'], 361, [4, kumku]],
    [[8, 'Kumk\'u'], 363, [6, kumku]],
    [[8, 'Kumk\'u'], 365, [8, kumku]],
    [[18, 'Pop'], 1, [19, pop]],
    [[18, 'Pop'], 100, [18, getHaabMonth('Xul')]],
    [[18, 'Pop'], 177, [15, getHaabMonth('Yax')]],
    [[18, 'Pop'], 345, [3, getHaabMonth('Wayeb')]],
    [[8, 'Kumk\'u'], 309, [12, getHaabMonth('Muwan')]],
    [[8, 'Kumk\'u'], 367, [10, kumku]],
    [[8, 'Kumk\'u'], 369, [12, kumku]],
    [[4, 'Wayeb'], 1, [0, pop]],
  ];
  haabs.forEach((args: [[number, string], number, [number, string]]) => {
    const [start, incremental, expected] = args;
    it(`${start} + ${incremental} = ${expected}`, () => {
      const prevHaab = getHaab(
        new Coefficient(start[0]),
        getHaabMonth(start[1])
      );
      const newHaab = prevHaab.shift(incremental);

      expect(newHaab.coeff.value).to.equal(expected[0]);
      expect(newHaab.month).to.equal(expected[1]);
    });
  });
});
