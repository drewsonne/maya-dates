"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coefficient_1 = require("./component/coefficient");
const wildcard_1 = require("../wildcard");
const singleton = {};
function getTzolkin(coeff, day) {
    const monthName = `${coeff} ${day}`;
    if (singleton[monthName] === undefined) {
        singleton[monthName] = new Tzolkin(coeff, day);
    }
    return singleton[monthName];
}
exports.getTzolkin = getTzolkin;
class Tzolkin {
    constructor(newCoeff, newDay) {
        this.day = newDay;
        this.coeff = newCoeff;
        this.privateNext = undefined;
        this.validate();
    }
    next() {
        return this.shift(1);
    }
    validate() {
        if (this.coeff > 13 || this.coeff < 1) {
            throw new Error('Tzolk\'in coefficient must inclusively between 1 and 13.');
        }
        if (this.day === undefined) {
            throw new Error('Tzolk\'in day must be provided');
        }
        if (!(this.day instanceof wildcard_1.Wildcard)) {
            this.day.validate();
        }
        return true;
    }
    shift(newIncremental) {
        if (!(this.day instanceof wildcard_1.Wildcard) &&
            !(this.coeff instanceof wildcard_1.Wildcard)) {
            const incremental = newIncremental % 260;
            if (this.privateNext === undefined) {
                let newCoeff = (this.coeff.value + 1) % 13;
                newCoeff = (newCoeff % 13) === 0 ? 13 : newCoeff;
                this.privateNext = getTzolkin(new coefficient_1.default(newCoeff), this.day.shift(1));
            }
            if (incremental === 0) {
                return this;
            }
            return this.privateNext.shift(incremental - 1);
        }
    }
    equal(newTzolkin) {
        return (this.coeff === newTzolkin.coeff)
            && (this.name === newTzolkin.name);
    }
    match(newTzolkin) {
        if (this === newTzolkin) {
            return true;
        }
        return ((this.coeff === wildcard || newTzolkin.coeff === wildcard)
            ? true
            : (this.coeff === newTzolkin.coeff)) && ((this.day === wildcard || newTzolkin.day === wildcard)
            ? true
            : (this.name === newTzolkin.name));
    }
    get name() {
        if (this.day instanceof wildcard_1.Wildcard) {
            return this.day;
        }
        return `${this.day}`;
    }
    toString() {
        return `${this.coeff} ${this.name}`;
    }
}
exports.Tzolkin = Tzolkin;
//# sourceMappingURL=tzolkin.js.map