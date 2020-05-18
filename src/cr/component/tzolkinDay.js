"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashMap_1 = require("../../structs/hashMap");
const cycle_1 = require("./cycle");
const days = new hashMap_1.default([
    undefined,
    'Imix',
    'Ik\'',
    'Ak\'bal',
    'K\'an',
    'Chikchan',
    'Kimi',
    'Manik\'',
    'Lamat',
    'Muluk',
    'Ok',
    'Chuwen',
    'Eb',
    'Ben',
    'Ix',
    'Men',
    'Kib',
    'Kaban',
    'Etz\'nab',
    'Kawak',
    'Ajaw',
]);
exports.getTzolkinDay = cycle_1.singletonGenerator(days, (name) => new TzolkinDay(name));
class TzolkinDay extends cycle_1.Cycle {
    constructor(newName) {
        super(newName, days, exports.getTzolkinDay);
    }
    validate() {
        if (this.value === undefined) {
            throw new Error('Tzolk\'in day name must be provided');
        }
        if (typeof this.value === 'string') {
            if (!days.includes(this.value)) {
                throw new Error(`Tzolk'in day (${this.value}) must be in ${days}`);
            }
        }
        return true;
    }
}
exports.TzolkinDay = TzolkinDay;
//# sourceMappingURL=tzolkinDay.js.map