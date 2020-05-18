"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendar_round_iter_1 = require("./calendar-round-iter");
const iter = new calendar_round_iter_1.default();
class CalendarRoundWildcard {
    constructor(cr) {
        this.cr = cr;
    }
    run() {
        const potentials = [];
        let cr = iter.next();
        while (!cr.done) {
            if (this.cr.match(cr.value)) {
                potentials.push(cr.value);
            }
            cr = iter.next();
        }
        iter.reset();
        return potentials;
    }
}
exports.default = CalendarRoundWildcard;
//# sourceMappingURL=calendar-round-wildcard.js.map