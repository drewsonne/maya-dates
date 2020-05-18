"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const haabMonth_1 = require("../../cr/component/haabMonth");
const haab_1 = require("../../cr/haab");
const coefficient_1 = require("../../cr/component/coefficient");
describe('increment haab months', () => {
    const tzolkinDays = [
        ['Pop', 'Wo'],
        ['Xul', 'Yaxk\'in'],
        ['Wayeb', 'Pop'],
    ];
    tzolkinDays.forEach((args) => {
        const [previous, next] = args;
        it(`${previous} -> ${next}`, () => {
            const today = haabMonth_1.getHaabMonth(previous);
            const tomorrow = today.next();
            const expected = haabMonth_1.getHaabMonth(next);
            chai_1.expect(tomorrow).to.equal(expected);
        });
    });
});
describe('build haabs', () => {
    const haabs = [
        [[5, 'Pop'], [6, haabMonth_1.getHaabMonth('Pop')]],
        [[19, 'Pop'], [0, haabMonth_1.getHaabMonth('Wo')]],
        [[19, 'Xul'], [0, haabMonth_1.getHaabMonth('Yaxk\'in')]],
        [[4, 'Wayeb'], [0, haabMonth_1.getHaabMonth('Pop')]],
    ];
    haabs.forEach((args) => {
        const [prev, next] = args;
        it(`${prev} -> ${next}`, () => {
            const haab = haab_1.getHaab(prev[0], haabMonth_1.getHaabMonth(prev[1]));
            chai_1.expect(haab.coeff.value).to.equal(prev[0]);
            chai_1.expect(haab.name).to.equal(prev[1]);
            const tomorrow = haab.next();
            chai_1.expect(tomorrow.coeff.value).to.equal(next[0]);
            chai_1.expect(tomorrow.month).to.equal(next[1]);
        });
    });
});
it('render haab fullDate', () => {
    const haab = haab_1.getHaab(new coefficient_1.default(5), 'Pop');
    chai_1.expect(haab.toString()).to.equal('5 Pop');
});
describe('shift haab', () => {
    const kumku = haabMonth_1.getHaabMonth('Kumk\'u');
    const pop = haabMonth_1.getHaabMonth('Pop');
    const haabs = [
        [[8, 'Kumk\'u'], 359, [2, kumku]],
        [[8, 'Kumk\'u'], 361, [4, kumku]],
        [[8, 'Kumk\'u'], 363, [6, kumku]],
        [[8, 'Kumk\'u'], 365, [8, kumku]],
        [[18, 'Pop'], 1, [19, pop]],
        [[18, 'Pop'], 100, [18, haabMonth_1.getHaabMonth('Xul')]],
        [[18, 'Pop'], 177, [15, haabMonth_1.getHaabMonth('Yax')]],
        [[18, 'Pop'], 345, [3, haabMonth_1.getHaabMonth('Wayeb')]],
        [[8, 'Kumk\'u'], 309, [12, haabMonth_1.getHaabMonth('Muwan')]],
        [[8, 'Kumk\'u'], 367, [10, kumku]],
        [[8, 'Kumk\'u'], 369, [12, kumku]],
        [[4, 'Wayeb'], 1, [0, pop]],
    ];
    haabs.forEach((args) => {
        const [start, incremental, expected] = args;
        it(`${start} + ${incremental} = ${expected}`, () => {
            const prevHaab = haab_1.getHaab(new coefficient_1.default(start[0]), haabMonth_1.getHaabMonth(start[1]));
            const newHaab = prevHaab.shift(incremental);
            chai_1.expect(newHaab.coeff.value).to.equal(expected[0]);
            chai_1.expect(newHaab.month).to.equal(expected[1]);
        });
    });
});
//# sourceMappingURL=haab.spec.js.map