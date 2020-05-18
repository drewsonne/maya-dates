"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const calendar_round_1 = require("../cr/calendar-round");
const tzolkin_1 = require("../cr/tzolkin");
const haab_1 = require("../cr/haab");
const tzolkinDay_1 = require("../cr/component/tzolkinDay");
const haabMonth_1 = require("../cr/component/haabMonth");
const wildcard_1 = require("../wildcard");
const coefficient_1 = require("../cr/component/coefficient");
class CalendarRoundFactory extends base_1.default {
    constructor() {
        super();
        this.pattern = /([*\d]+)\s?([^\s]+)\s?([*\d]+)\s?([^\s]+)/;
    }
    parse(raw) {
        const parts = this.split(raw);
        if (parts.length < 4) {
            return null;
        }
        return calendar_round_1.getCalendarRound(tzolkin_1.getTzolkin(this.parseCoefficient(parts[0]), tzolkinDay_1.getTzolkinDay(parts[1])), haab_1.getHaab(this.parseCoefficient(parts[2]), haabMonth_1.getHaabMonth(parts[3])));
    }
    isNumberString(potentialNumber) {
        return potentialNumber.match(/^\d+$/g) !== null;
    }
    parseCoefficient(potentialCoeff) {
        if (potentialCoeff === '*') {
            return new wildcard_1.Wildcard();
        }
        if (!this.isNumberString(potentialCoeff)) {
            throw new Error(`Could not parse '${potentialCoeff}' as Wildcard or Coefficient`);
        }
        return new coefficient_1.default(+potentialCoeff);
    }
}
exports.default = CalendarRoundFactory;
//# sourceMappingURL=calendar-round.js.map