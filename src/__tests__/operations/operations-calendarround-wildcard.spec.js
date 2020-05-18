"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildcard_1 = require("../../wildcard");
const calendar_round_1 = require("../../cr/calendar-round");
const tzolkin_1 = require("../../cr/tzolkin");
const haab_1 = require("../../cr/haab");
const coefficient_1 = require("../../cr/component/coefficient");
const haabMonth_1 = require("../../cr/component/haabMonth");
const tzolkinDay_1 = require("../../cr/component/tzolkinDay");
const calendar_round_2 = require("../../factory/calendar-round");
const calendar_round_wildcard_1 = require("../../operations/calendar-round-wildcard");
require("mocha");
const chai_1 = require("chai");
const long_count_1 = require("../../factory/long-count");
const longcount_wildcard_1 = require("../../operations/longcount-wildcard");
describe('compute missing lc wildcard', () => {
    const lcs = [
        ['10.10.17.14.*', 20],
    ];
    const lcFactory = new long_count_1.default();
    lcs.forEach((args) => {
        const [lc, expected] = args;
        it(`len(${lc}) = ${expected}`, () => {
            const partialDate = lcFactory.parse(lc);
            const potentialLcs = new longcount_wildcard_1.default(partialDate).run();
            chai_1.expect(potentialLcs.length).to.equal(expected);
        });
    });
});
describe('compute missing cr wildcard', () => {
    const partialDates = [
        ['12Imix * Pop', 4],
        ['* Imix 9K\'ank\'in', 13],
        ['* Imix *K\'ank\'in', 52],
        ['* * * *', 18980],
    ];
    const crFactory = new calendar_round_2.default();
    partialDates.forEach((args) => {
        const [partialDate, expected] = args;
        it(`len(${partialDate}) = ${expected}`, () => {
            const cr = crFactory.parse(partialDate);
            const potentialCrs = new calendar_round_wildcard_1.default(cr).run();
            chai_1.expect(potentialCrs.length).to.equal(expected);
        });
    });
});
describe('fullDate matcher', () => {
    const wc = new wildcard_1.Wildcard();
    const fullDate = calendar_round_1.getCalendarRound(tzolkin_1.getTzolkin(new coefficient_1.default(4), tzolkinDay_1.getTzolkinDay('Ajaw')), haab_1.getHaab(new coefficient_1.default(8), haabMonth_1.getHaabMonth('Kumk\'u')));
    const partialDates = [
        [[4, 'Ajaw', 8, wc], true],
        [[4, 'Ajaw', wc, 'Kumk\'u'], true],
        [[4, 'Ajaw', wc, wc], true],
        [[4, wc, 8, 'Kumk\'u'], true],
        [[4, wc, 8, wc], true],
        [[4, wc, wc, 'Kumk\'u'], true],
        [[4, wc, wc, wc], true],
        [[wc, 'Ajaw', 8, 'Kumk\'u'], true],
        [[wc, 'Ajaw', 8, wc], true],
        [[wc, 'Ajaw', wc, 'Kumk\'u'], true],
        [[wc, 'Ajaw', wc, wc], true],
        [[wc, wc, 8, 'Kumk\'u'], true],
        [[wc, wc, 8, wc], true],
        [[wc, wc, wc, 'Kumk\'u'], true],
        [[wc, wc, wc, wc], true],
    ];
    partialDates.forEach((args) => {
        const [partial, expected] = args;
        it(`${partial} = ${expected}`, () => {
            const partialDate = calendar_round_1.getCalendarRound(tzolkin_1.getTzolkin(partial[0], tzolkinDay_1.getTzolkinDay(partial[1])), haab_1.getHaab(partial[0], haabMonth_1.getHaabMonth(partial[1])));
            chai_1.expect(partialDate.match(fullDate)).to.equal(expected);
        });
    });
});
//# sourceMappingURL=operations-calendarround-wildcard.spec.js.map