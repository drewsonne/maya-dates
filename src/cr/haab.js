"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const haabMonth_1 = require("./component/haabMonth");
const coefficient_1 = require("./component/coefficient");
const wildcard_1 = require("../wildcard");
const singleton = {};
function getHaab(coeff, month) {
    const monthName = `${coeff} ${month}`;
    if (singleton[monthName] === undefined) {
        const newMonth = (typeof month === 'string') ? haabMonth_1.getHaabMonth(month) : month;
        singleton[monthName] = new Haab((coeff instanceof coefficient_1.default) ? coeff : new coefficient_1.default(coeff), newMonth);
    }
    return singleton[monthName];
}
exports.getHaab = getHaab;
class Haab {
    constructor(coeff, month) {
        this.month = month;
        this.coeff = coeff;
        this.privateNext = undefined;
        this.validate();
    }
    validate() {
        if (typeof this.coeff === 'number') {
            if (this.coeff > 19 || this.coeff < 0) {
                throw new Error('Haab\' coefficient must inclusively between 0 and 19.');
            }
            if (this.coeff > 4 && this.month === haabMonth_1.getHaabMonth('Wayeb')) {
                throw new Error('Haab\' coefficient for Wayeb must inclusively between 0 and 4.');
            }
        }
        if (this.month === undefined) {
            throw new Error('Haab\' month must be provided');
        }
        if (!(this.month instanceof wildcard_1.Wildcard)) {
            this.month.validate();
        }
        return true;
    }
    next() {
        return this.shift(1);
    }
    equal(otherHaab) {
        return this === otherHaab;
    }
    match(otherHaab) {
        return ((this.coeff instanceof wildcard_1.Wildcard || otherHaab.coeff instanceof wildcard_1.Wildcard)
            ? true
            : (this.coeff === otherHaab.coeff)) && ((this.month instanceof wildcard_1.Wildcard || otherHaab.month instanceof wildcard_1.Wildcard)
            ? true
            : (this.name === otherHaab.name));
    }
    get name() {
        return `${this.month}`;
    }
    shift(numDays) {
        if (!(this.month instanceof wildcard_1.Wildcard) &&
            !(this.coeff.value instanceof wildcard_1.Wildcard)) {
            const incremental = numDays % 365;
            if (incremental === 0) {
                return this;
            }
            if (this.privateNext === undefined) {
                const monthLength = (this.month === haabMonth_1.getHaabMonth(19)) ? 5 : 20;
                if (1 + this.coeff.value >= monthLength) {
                    const newMonth = this.month.shift(1);
                    this.privateNext = getHaab(0, newMonth);
                }
                else {
                    this.privateNext = getHaab(this.coeff.value + 1, this.month);
                }
            }
            return this.privateNext.shift(incremental - 1);
        }
        else {
            throw new Error("Can not shift Haab date with wildcard");
        }
    }
    get coeffValue() {
        if (this.coeff instanceof coefficient_1.default) {
            return this.coeff.value;
        }
        return this.coeff;
    }
    toString() {
        return `${this.coeffValue} ${this.name}`;
    }
}
exports.Haab = Haab;
//# sourceMappingURL=haab.js.map