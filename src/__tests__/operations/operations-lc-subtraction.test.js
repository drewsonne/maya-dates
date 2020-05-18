"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const { LongCount } = index_1.default.lc;
describe('longcount subtraction', () => {
    const dates = [
        [[1, 4, 13, 19, 12], [1], [0, 4, 13, 19, 12]],
        [[0, 5, 13, 19, 12], [1], [19, 4, 13, 19, 12]],
        [[0, 2, 13, 19, 12], [40], [0, 0, 13, 19, 12]],
        [[0, 0, 14, 19, 12], [300], [0, 0, 13, 19, 12]],
        [[0, 1, 14, 19, 12], [300, 1], [0, 0, 13, 19, 12]],
        [[0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, -19]],
    ].map((row) => [
        new LongCount(...row[0]),
        new LongCount(...row[1]),
        new LongCount(...row[2]),
    ]);
    it.each(dates)('%s - %s = %s', (from, increment, to) => {
        expect(from.minus(increment).equals()).toStrictEqual(to);
    });
});
//# sourceMappingURL=operations-lc-subtraction.test.js.map