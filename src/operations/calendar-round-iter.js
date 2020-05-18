"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendar_round_1 = require("../cr/calendar-round");
class CalendarRoundIterator {
    constructor() {
        this.current = undefined;
        this.isFirst = undefined;
        this.fullDate = calendar_round_1.origin;
        this.reset();
    }
    reset() {
        this.current = this.fullDate;
        this.isFirst = true;
    }
    next() {
        if (this.isFirst) {
            this.isFirst = false;
            return { value: this.current, done: false };
        }
        const next = this.current.next();
        if (next.equal(this.fullDate)) {
            return { value: null, done: true };
        }
        this.current = next;
        return { value: next, done: false };
    }
}
exports.default = CalendarRoundIterator;
//# sourceMappingURL=calendar-round-iter.js.map