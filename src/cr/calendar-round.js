"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tzolkin_1 = require("./tzolkin");
const haab_1 = require("./haab");
const distance_number_1 = require("../lc/distance-number");
const wildcard_1 = require("../wildcard");
const haabMonth_1 = require("./component/haabMonth");
const tzolkinDay_1 = require("./component/tzolkinDay");
const coefficient_1 = require("./component/coefficient");
const singleton = {};
function getCalendarRound(tzolkin, haab) {
    const crId = `${tzolkin} ${haab}`;
    if (singleton[crId] === undefined) {
        singleton[crId] = new CalendarRound(tzolkin, haab);
    }
    return singleton[crId];
}
exports.getCalendarRound = getCalendarRound;
class CalendarRound {
    constructor(tzolkin, haab) {
        this.tzolkin = tzolkin;
        this.haab = haab;
        this.validate();
    }
    validate() {
        let validHaabCoeffs = [];
        if ([
            'Kaban', 'Ik\'', 'Manik\'', 'Eb',
        ].includes(this.tzolkin.name)) {
            validHaabCoeffs = [0, 5, 10, 15];
        }
        else if ([
            'Etz\'nab', 'Ak\'bal', 'Lamat', 'Ben',
        ].includes(this.tzolkin.name)) {
            validHaabCoeffs = [1, 6, 11, 16];
        }
        else if ([
            'Kawak', 'K\'an', 'Muluk', 'Ix',
        ].includes(this.tzolkin.name)) {
            validHaabCoeffs = [2, 7, 12, 17];
        }
        else if ([
            'Ajaw', 'Chikchan', 'Ok', 'Men',
        ].includes(this.tzolkin.name)) {
            validHaabCoeffs = [3, 8, 13, 18];
        }
        else if ([
            'Imix', 'Kimi', 'Chuwen', 'Kib',
        ].includes(this.tzolkin.name)) {
            validHaabCoeffs = [4, 9, 14, 19];
        }
        else if ([wildcard_1.wildcard].includes(this.tzolkin.name)) {
            validHaabCoeffs = [...Array(19).keys()];
        }
        else {
            throw new Error(`Could not allocate Tzolk'in (${this.tzolkin.name}) to permissible month coeffs.`);
        }
        if (this.haab.coeff !== undefined) {
            if (!wildcard_1.isWildcard(this.haab.coeff.value)) {
                if (!this.haab.coeff.isIn(validHaabCoeffs)) {
                    throw new Error(`${this} should have Haab coeff in ${validHaabCoeffs} for day ${this.tzolkin.name}`);
                }
            }
        }
    }
    next() {
        return this.shift(1);
    }
    equal(newCr) {
        return this === newCr;
    }
    minus(targetCr) {
        let foundOrigin = false;
        let foundTarget = false;
        let current = this;
        let count = 0;
        let cycleCount = 0;
        let result;
        while (!foundTarget) {
            if (current.equal(exports.origin)) {
                foundOrigin = true;
                cycleCount = count;
                count = 0;
                current = current.next();
            }
            else if (current.equal(targetCr)) {
                result = new distance_number_1.default(foundOrigin
                    ? -(18979 - cycleCount - count)
                    : count).normalise();
                foundTarget = true;
            }
            else {
                current = current.next();
                count += 1;
            }
        }
        return result;
    }
    match(newCr) {
        return this.haab.match(newCr.haab) &&
            this.tzolkin.match(newCr.tzolkin);
    }
    shift(increment) {
        return getCalendarRound(this.tzolkin.shift(increment), this.haab.shift(increment));
    }
    isPartial() {
        return (this.tzolkin.day === wildcard_1.wildcard)
            || (this.tzolkin.coeff === wildcard_1.wildcard)
            || (this.haab.month === wildcard_1.wildcard)
            || (this.haab.coeff === wildcard_1.wildcard);
    }
    toString() {
        return `${this.tzolkin} ${this.haab}`;
    }
}
exports.CalendarRound = CalendarRound;
exports.origin = getCalendarRound(tzolkin_1.getTzolkin(new coefficient_1.default(4), tzolkinDay_1.getTzolkinDay('Ajaw')), haab_1.getHaab(new coefficient_1.default(8), haabMonth_1.getHaabMonth('Kumk\'u')));
//# sourceMappingURL=calendar-round.js.map