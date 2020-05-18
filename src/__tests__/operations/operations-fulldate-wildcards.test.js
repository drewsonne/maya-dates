"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const { wildcard } = index_1.default;
describe('complex wildcard parsing', () => {
    const partialDates = [
        '1 Ok * * 9.*.10.10.10',
        '1Ok * * 9.*.10.10.10',
        '1 Ok ** 9.*.10.10.10',
        '1Ok ** 9.*.10.10.10',
    ];
    it.each(partialDates)('%s', (partialDate) => {
        const fullDate = new index_1.default.factory.FullDateFactory().parse(partialDate);
        expect(fullDate.cr.tzolkin.coeff).toBe(1);
        expect(fullDate.cr.tzolkin.name).toBe('Ok');
        expect(fullDate.cr.haab.coeff).toBe(wildcard);
        expect(fullDate.cr.haab.name).toBe(wildcard);
        expect(fullDate.lc.kIn).toBe(10);
        expect(fullDate.lc.winal).toBe(10);
        expect(fullDate.lc.tun).toBe(10);
        expect(fullDate.lc.kAtun).toBe(wildcard);
        expect(fullDate.lc.bakTun).toBe(9);
    });
});
describe('complex wildcard inference', () => {
    const partialDates = [
        ['11 Ok 18 Muwan 9.*.*.*.10', 7],
        ['* Ok * Mak 9.*.10.10.10', 2],
        ['1 Ok 13 * 9.*.10.10.10', 1],
        ['* * 18 Muwan 9.*.*.10.10', 6],
    ];
    it.each(partialDates)('len(%s) = %s', (partialDate, expected) => {
        const fullDatePartial = new index_1.default.factory.FullDateFactory().parse(partialDate);
        const potentialDates = new index_1.default.op.FullDateWildcard(fullDatePartial).run();
        expect(potentialDates).toHaveLength(expected);
    });
});
describe('single cr alignment', () => {
    const fullDates = [
        ['* Imix 9 K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
        ['* * 9 K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
        ['* * * K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
        ['* * * * 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
    ];
    it.each(fullDates)('%s -> %s', (raw, expected) => {
        const fdFactory = new index_1.default.factory.FullDateFactory();
        const potentialDates = new index_1.default.op.FullDateWildcard(fdFactory.parse(raw)).run();
        expect(potentialDates).toHaveLength(1);
        expect(potentialDates[0].cr.tzolkin.coeff).toBe(expected[0]);
        expect(potentialDates[0].cr.tzolkin.name).toBe(expected[1]);
        expect(potentialDates[0].cr.haab.coeff).toBe(expected[2]);
        expect(potentialDates[0].cr.haab.name).toBe(expected[3]);
    });
});
//# sourceMappingURL=operations-fulldate-wildcards.test.js.map