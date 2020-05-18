"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendar_round_1 = require("../cr/calendar-round");
const full_date_1 = require("../full-date");
const lord_of_night_1 = require("./night/lord-of-night");
const longcount_addition_1 = require("../operations/longcount-addition");
const longcount_subtraction_1 = require("../operations/longcount-subtraction");
const correlation_constant_1 = require("./correlation-constant");
const gregorian_1 = require("./western/gregorian");
const julian_1 = require("./western/julian");
const distance_number_1 = require("./distance-number");
class LongCount extends distance_number_1.default {
    constructor(...cycles) {
        super(...cycles);
        this.correlationConstant = correlation_constant_1.default(584283);
    }
    setCorrelationConstant(newConstant) {
        this.correlationConstant = newConstant;
        return this;
    }
    get julianDay() {
        return this.correlationConstant.value + this.getPosition();
    }
    get gregorian() {
        return new gregorian_1.default(this.julianDay);
    }
    get julian() {
        return new julian_1.default(this.julianDay);
    }
    clone() {
        return new LongCount(...this.parts);
    }
    get lordOfNight() {
        return lord_of_night_1.default.get(`G${((this.getPosition() - 1) % 9) + 1}`);
    }
    buildCalendarRound() {
        return calendar_round_1.default.origin.shift(this.getPosition());
    }
    buildFullDate() {
        return new full_date_1.default(this.buildCalendarRound(), this.clone());
    }
    plus(newLc) {
        return new longcount_addition_1.default(LongCount, this, newLc);
    }
    minus(newLc) {
        return new longcount_subtraction_1.default(LongCount, this, newLc);
    }
    asDistanceNumber() {
        return new distance_number_1.default(...this.parts);
    }
}
exports.default = LongCount;
//# sourceMappingURL=long-count.js.map