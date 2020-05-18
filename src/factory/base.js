"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Factory {
    constructor() {
        this.pattern = null;
    }
    split(raw) {
        const matches = raw.match(this.pattern);
        if (matches === null) {
            return [];
        }
        return matches.slice(1);
    }
}
exports.default = Factory;
//# sourceMappingURL=base.js.map