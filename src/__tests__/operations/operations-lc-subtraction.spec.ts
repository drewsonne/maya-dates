import {expect} from 'chai'
import 'mocha'
import LongCount from "../../lc/long-count";

describe('longcount subtraction', () => {
  const dates: [LongCount, LongCount, LongCount][] = [
    [[1, 4, 13, 19, 12], [1], [0, 4, 13, 19, 12]],
    [[0, 5, 13, 19, 12], [1], [19, 4, 13, 19, 12]],
    [[0, 2, 13, 19, 12], [40], [0, 0, 13, 19, 12]],
    [[0, 0, 14, 19, 12], [300], [0, 3, 13, 19, 12]], // Fixed: base-18 winal (300 kin borrowed across tun boundary)
    [[0, 1, 14, 19, 12], [300, 1], [0, 3, 13, 19, 12]], // Fixed: base-18 winal (320 kin borrowed across tun boundary)
    [[0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, -19]],
  ].map((row) => [
    new LongCount(...row[0]),
    new LongCount(...row[1]),
    new LongCount(...row[2]),
  ]);

  dates.forEach((args) => {
    let [from, increment, to] = args
    it(`${from} - ${increment} = ${to}`, () => {
      expect(from.minus(increment).equals().equal(to)).to.be.true;
    })
  })

});
