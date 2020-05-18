"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const calendar_round_1 = require("../../factory/calendar-round");
const wildcard_1 = require("../../wildcard");
const calendar_round_2 = require("../../cr/calendar-round");
const tzolkin_1 = require("../../cr/tzolkin");
const haab_1 = require("../../cr/haab");
const distance_number_1 = require("../../lc/distance-number");
const coefficient_1 = require("../../cr/component/coefficient");
const tzolkinDay_1 = require("../../cr/component/tzolkinDay");
const haabMonth_1 = require("../../cr/component/haabMonth");
describe('increment calendar-rounds', () => {
    const tzolkinDays = [
        ['2Ak\'bal 6 Muwan', [3, tzolkinDay_1.getTzolkinDay('K\'an'), 7, haabMonth_1.getHaabMonth('Muwan')]],
        ['4 Ajaw 8 Kumk\'u', [5, tzolkinDay_1.getTzolkinDay('Imix'), 9, haabMonth_1.getHaabMonth('Kumk\'u')]],
        ['13 Kimi 4 Wayeb', [1, tzolkinDay_1.getTzolkinDay('Manik\''), 0, haabMonth_1.getHaabMonth('Pop')]],
    ];
    tzolkinDays.forEach((args) => {
        const [today, next] = args;
        it(`${today} -> ${next}`, () => {
            const cr = new calendar_round_1.default().parse(today);
            const tomorrow = cr.next();
            chai_1.expect(tomorrow.tzolkin.coeff.value).to.equal(next[0]);
            chai_1.expect(tomorrow.tzolkin.day).to.equal(next[1]);
            chai_1.expect(tomorrow.haab.coeff.value).to.equal(next[2]);
            chai_1.expect(tomorrow.haab.month).to.equal(next[3]);
        });
    });
});
describe('shift calendar-rounds', () => {
    const tzolkinDays = [
        ['4 Ajaw 8 Kumk\'u', 0, [4, 'Ajaw', 8, 'Kumk\'u']],
        ['4 Ajaw 8 Kumk\'u', 1, [5, 'Imix', 9, 'Kumk\'u']],
        ['4 Ajaw 8 Kumk\'u', 10, [1, 'Ok', 18, 'Kumk\'u']],
        ['4 Ajaw 8 Kumk\'u', 365, [5, 'Chikchan', 8, 'Kumk\'u']],
    ];
    tzolkinDays.forEach((args) => {
        const [today, increment, expected] = args;
        it(`${today} + ${increment} = ${expected}`, () => {
            const cr = new calendar_round_1.default().parse(today);
            const tomorrow = cr.shift(increment);
            chai_1.expect(tomorrow.tzolkin.coeff).to.equal(expected[0]);
            chai_1.expect(tomorrow.tzolkin.name).to.be(expected[1]);
            chai_1.expect(tomorrow.haab.coeff).to.equal(expected[2]);
            chai_1.expect(tomorrow.haab.name).to.be(expected[3]);
        });
    });
});
it('failed calendar-round parse', () => {
    const cr = new calendar_round_1.default().parse('World');
    chai_1.expect(cr).to.be.null;
});
describe('parse calendar-round', () => {
    const sources = [
        ['2 Ak\'bal 6 Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
        ['2 Ak\'bal 6Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
        ['2Ak\'bal 6 Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
        ['2Ak\'bal 6Muwan', [2, 'Ak\'bal', 6, 'Muwan']],
    ];
    sources.forEach((args) => {
        const [source, expected] = args;
        it(`${source} -> ${expected}`, () => {
            const cr = new calendar_round_1.default().parse(source);
            chai_1.expect(cr.tzolkin.coeff).to.equal(expected[0]);
            chai_1.expect(cr.tzolkin.name).to.be(expected[1]);
            chai_1.expect(cr.haab.coeff).to.equal(expected[2]);
            chai_1.expect(cr.haab.name).to.be(expected[3]);
        });
    });
});
describe('parse calendar-round wildcards', () => {
    const wildcard = new wildcard_1.Wildcard();
    const sources = [
        [
            '* Ak\'bal 6 Muwan',
            [wildcard, 'Ak\'bal', 6, 'Muwan'],
            '* Ak\'bal 6 Muwan'
        ],
        [
            '2 Ak\'bal *Muwan',
            [2, 'Ak\'bal', wildcard, 'Muwan'],
            '2 Ak\'bal * Muwan'
        ],
        [
            '*Ak\'bal 6 *',
            [wildcard, 'Ak\'bal', 6, wildcard],
            '* Ak\'bal 6 *'
        ],
        [
            '2Ak\'bal 6*',
            [2, 'Ak\'bal', 6, wildcard],
            '2 Ak\'bal 6 *',
        ],
    ];
    sources.forEach((args) => {
        const [source, expected, name] = args;
        it(`${source}, ${expected}, ${name}`, () => {
            const cr = new calendar_round_1.default().parse(source);
            chai_1.expect(cr.tzolkin.coeff).to.equal(expected[0]);
            chai_1.expect(cr.tzolkin.name).to.equal(expected[1]);
            chai_1.expect(cr.haab.coeff).to.equal(expected[2]);
            chai_1.expect(cr.haab.name).to.equal(expected[3]);
            chai_1.expect(cr.toString()).to.be(name);
        });
    });
});
it('render calendar round', () => {
    chai_1.expect(calendar_round_2.getCalendarRound(tzolkin_1.getTzolkin(new coefficient_1.default(4), tzolkinDay_1.getTzolkinDay('Ajaw')), haab_1.getHaab(new coefficient_1.default(8), tzolkinDay_1.getTzolkinDay('Kumk\'u'))).toString()).to.equal('4 Ajaw 8 Kumk\'u');
});
describe('calendar round diff\'s', () => {
    const dates = [
        ['5 Kimi 4 Mol', '6 Manik\' 5 Mol', [1]],
        ['5 Kimi 4 Mol', '13 Ix 12 Mol', [8]],
        ['5 Kimi 4 Mol', '7 Ok 13 Xul', [4, 0, 7]],
        ['5 Kimi 4 Mol', '6 Kimi 9 Muwan', [0, -11]],
        ['5 Kimi 4 Mol', '4 Chikchan 3 Mol', [-1]],
    ];
    const crFactory = new calendar_round_1.default();
    dates.forEach((args) => {
        const [fromRaw, toRaw, expectRaw] = args;
        it(`${fromRaw} - ${toRaw} = ${expectRaw}`, () => {
            const from = crFactory.parse(fromRaw);
            const to = crFactory.parse(toRaw);
            const expected = new distance_number_1.default(...expectRaw).normalise();
            chai_1.expect(from.minus(to)).to.equal(expected);
        });
    });
});
//# sourceMappingURL=calendar-round.spec.js.map