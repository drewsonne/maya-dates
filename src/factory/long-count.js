"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const long_count_1 = require("../lc/long-count");
const wildcard_1 = require("../wildcard");
class LongCountFactory extends base_1.default {
    parse(raw) {
        const dates = raw.match(/(?:(?:\*|(?:[\d]{1,2}))\.){1,}(?:(?:\*)|(?:[\d]{1,2}))/);
        if (dates === null || dates.length !== 1) {
            return null;
        }
        const parts = dates[0].split('.');
        return new long_count_1.default(...new Array(Math.max(5 - parts.length, 0))
            .fill('0')
            .concat(parts)
            .map((part) => ((part === '*') ? wildcard_1.default : parseInt(part, 10)))
            .reverse());
    }
}
exports.default = LongCountFactory;
//# sourceMappingURL=long-count.js.map