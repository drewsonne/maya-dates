"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashMap_1 = require("../../structs/hashMap");
const cycle_1 = require("./cycle");
const wildcard_1 = require("../../wildcard");
const months = new hashMap_1.default([
    undefined,
    'Pop',
    'Wo',
    'Sip',
    'Sotz\'',
    'Sek',
    'Xul',
    'Yaxk\'in',
    'Mol',
    'Ch\'en',
    'Yax',
    'Sak',
    'Keh',
    'Mak',
    'K\'ank\'in',
    'Muwan',
    'Pax',
    'K\'ayab',
    'Kumk\'u',
    'Wayeb'
]);
exports.getHaabMonth = cycle_1.singletonGenerator(months, (name) => new HaabMonth(name));
class HaabMonth extends cycle_1.Cycle {
    constructor(raw) {
        super(raw, months, exports.getHaabMonth);
    }
    validate() {
        if (!(this.value instanceof wildcard_1.Wildcard)) {
            if (this.value === undefined) {
                throw new Error('Haab\' month name must be provided');
            }
            if (!months.includes(this.value)) {
                throw new Error(`Haab' day (${this.value}) must be in ${months}`);
            }
        }
        return true;
    }
}
exports.HaabMonth = HaabMonth;
//# sourceMappingURL=haabMonth.js.map