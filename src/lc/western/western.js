"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moonbeams_1 = require("moonbeams");
class WesternCalendar {
    constructor(julianDay) {
        this.julianDay = julianDay;
        this.date = moonbeams_1.default.jdToCalendar(julianDay + this.offset);
    }
    get year() {
        if (this.era === 'BCE') {
            return Math.abs(this.date.year - 1);
        }
        return this.date.year;
    }
    get month() {
        return this.date.month;
    }
    get day() {
        return Math.floor(this.date.day);
    }
    get era() {
        return (this.date.year < 0) ? 'BCE' : 'CE';
    }
    isThreshold() {
        return this.year === 1582 && this.month === 10 && [15, 4].includes(this.day);
    }
    toString() {
        const date = `${this.day}/${this.month}/${this.year} ${this.era}`;
        if (this.isThreshold()) {
            return `${date}*`;
        }
        return date;
    }
}
exports.default = WesternCalendar;
//# sourceMappingURL=western.js.map