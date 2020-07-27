import {getTzolkinDay, TzolkinDay} from "../../cr/component/tzolkinDay";

import {expect} from 'chai'
import {getTzolkin} from "../../cr/tzolkin";

describe('increment tzolkin days', () => {
  const tzolkinDays: [string, string][] = [
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
  tzolkinDays.forEach((args) => {
    let [previous, next] = args
    it(`${previous} -> ${next}`, () => {
      const today = getTzolkinDay(previous);
      const expected = getTzolkinDay(next);

      expect(today).to.be.an.instanceOf(TzolkinDay)
      expect(expected).to.be.an.instanceOf(TzolkinDay)

      if (today instanceof TzolkinDay) {
        const tomorrow = today.next();
        expect(tomorrow === expected).to.be.true;
      }
    })
  })
});

describe('build tzolkins', () => {
  const tzolkins: [[number, string], [number, string]][] = [
    [[5, 'Imix'], [6, 'Ik\'']],
    [[13, 'Ik\''], [1, 'Ak\'bal']],
    [[13, 'Ajaw'], [1, 'Imix']],
  ];
  tzolkins.forEach((args) => {
    let [prev, next] = args
    it(`${prev} -> ${next}`, () => {

      const tz = getTzolkin(prev[0], prev[1]);
      expect(tz.coeff).to.eq(prev[0]);
      expect(tz.name).to.eq(prev[1]);

      const expected = getTzolkin(next[0], next[1]);
      const tomorrow = tz.next();
      expect(tomorrow.coeff).to.eq(next[0]);
      expect(tomorrow.name).to.eq(next[1]);
      expect(tomorrow).to.eq(expected);
    })
  });
});

describe('shift tzolkins', () => {
  const tzolkins: [[number, string], number, [number, string]][] = [
    [[5, 'Imix'], 1, [6, 'Ik\'']],
    [[13, 'Ajaw'], 100, [9, 'Ajaw']],
    [[13, 'Ajaw'], 177, [8, 'Kaban']],
  ];

  tzolkins.forEach((args) => {
    let [start, incremental, expected] = args
    it(`${start} + ${incremental} = ${expected}`, () => {
      const date = getTzolkin(...start);
      const newTz = date.shift(incremental);

      const expectedDate = getTzolkin(...expected);
      expect(newTz === expectedDate).to.be.true;
    })
  });
});

it('render tzolkin fullDate', () => {
  const haab = getTzolkin(5, 'Imix');
  expect(haab.toString()).to.eq('5 Imix');
});
