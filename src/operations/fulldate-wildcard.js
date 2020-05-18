"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const full_date_1 = require("../full-date");
const longcount_wildcard_1 = require("./longcount-wildcard");
const calendar_round_wildcard_1 = require("./calendar-round-wildcard");
const concat = (x, y) => x.concat(y);
const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
Array.prototype.flatMap = function (f) {
    return flatMap(f, this);
};
class FullDateWildcard {
    constructor(partialDate) {
        this.fullDate = partialDate;
    }
    run() {
        if (this.fullDate.lc.isPartial()) {
            const lcs = new longcount_wildcard_1.default(this.fullDate.lc).run();
            const mappedLcs = lcs.map((potentialLc) => potentialLc.buildFullDate());
            const flatMappedLcs = mappedLcs.flatMap((fullDate) => (this.fullDate.cr.isPartial()
                ? new calendar_round_wildcard_1.default(this.fullDate.cr).run()
                : [this.fullDate.cr]).map((cr) => [].concat(cr, fullDate)));
            return flatMappedLcs.filter((pair) => pair[0].equal(pair[1].cr));
        }
        const staticCr = this.fullDate.lc.buildCalendarRound();
        return (staticCr.match(this.fullDate.cr))
            ? [new full_date_1.default(staticCr, this.fullDate.lc)]
            : [];
    }
}
exports.default = FullDateWildcard;
//# sourceMappingURL=fulldate-wildcard.js.map