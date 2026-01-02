import {expect} from 'chai'
import 'mocha'
import LongCount from "../../lc/long-count";

describe('longcount addition', () => {
  const dates = [
    [[0, 4, 13, 19, 12], [1], [1, 4, 13, 19, 12]],
    [[19, 4, 13, 19, 12], [1], [0, 5, 13, 19, 12]],
    [[0, 0, 13, 19, 12], [40], [0, 2, 13, 19, 12]],
    [[0, 0, 13, 19, 12], [300], [0, 15, 13, 19, 12]], // Fixed: base-18 winal (300 kin = 15 winal, no carry to tun)
    [[0, 0, 13, 19, 12], [300, 1], [0, 16, 13, 19, 12]], // Fixed: base-18 winal (320 kin = 16 winal, no carry to tun)
  ].map((row) => [
    new LongCount(...row[0]),
    new LongCount(...row[1]),
    new LongCount(...row[2]),
  ]);

  dates.forEach((args) => {
    let [from, increment, to] = args
    it(`${from} + ${increment} = ${to}`, () => {
      expect(from.plus(increment).equals().equal(to)).to.be.true;
    })
  });
});
