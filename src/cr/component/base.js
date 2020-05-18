"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildcard_1 = require("../../wildcard");
class Base {
    constructor(value) {
        this.value = value;
    }
    isWildcard() {
        return this.value instanceof wildcard_1.Wildcard;
    }
    toString() {
        return `${this.value}`;
    }
}
exports.default = Base;
//# sourceMappingURL=base.js.map