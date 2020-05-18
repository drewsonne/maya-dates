"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendar_round_1 = require("./calendar-round");
const long_count_1 = require("./long-count");
const full_date_1 = require("../full-date");
class FullDateFactory {
    parse(raw) {
        const cleanedRaw = raw.replace('**', '* *');
        const cr = new calendar_round_1.default().parse(cleanedRaw);
        const lc = new long_count_1.default().parse(cleanedRaw);
        return new full_date_1.default(cr, lc);
    }
}
exports.default = FullDateFactory;
//# sourceMappingURL=full-date.js.map