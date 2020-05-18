"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildcard_1 = require("../wildcard");
class LongCountWildcard {
    constructor(lc) {
        this.lc = lc;
    }
    run() {
        return this.lc.map((part, i) => ((part === wildcard_1.default) ? i : false)).filter((i) => i !== false).reduce((potentials, position) => potentials.reduce((acc, possible) => new Array((position === 1) ? 15 : 20).fill().map((_, i) => possible.clone().setDateSections(position, i)).concat(acc), []), [this.lc]);
    }
}
exports.default = LongCountWildcard;
//# sourceMappingURL=longcount-wildcard.js.map