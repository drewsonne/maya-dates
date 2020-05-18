"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wildcard {
    toString() {
        return '*';
    }
}
exports.Wildcard = Wildcard;
function isWildcard(token) {
    return token instanceof Wildcard;
}
exports.isWildcard = isWildcard;
//# sourceMappingURL=wildcard.js.map