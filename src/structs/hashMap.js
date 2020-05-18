"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HashMap {
    constructor(raw) {
        this.indexToValue = raw;
        const initialValueToIndex = {};
        this.valueToIndex = this.indexToValue.reduce((obj, elem, idx) => {
            obj[elem] = idx;
            return obj;
        }, initialValueToIndex);
    }
    getValue(index) {
        return this.indexToValue[index];
    }
    getIndex(value) {
        return this.valueToIndex[value];
    }
    includes(value) {
        return this.indexToValue.includes(value);
    }
    get length() {
        return this.indexToValue.length;
    }
    toString() {
        return `${this.indexToValue}`;
    }
}
exports.default = HashMap;
//# sourceMappingURL=hashMap.js.map