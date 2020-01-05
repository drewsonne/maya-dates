/** @ignore */
const tzolkin = require('../cr/tzolkin');
/** @ignore */
const haab = require('../cr/haab');
/** @ignore */
const wildcard = require('../wildcard');

/**
 * A combination of 260-day cycles and the Haab cycle.
 * @example
 *  let cr = new CalendarRound(4, "Ajaw", 8, "Kumk'u");
 */
class CalendarRound {
    /**
     *
     * @param {number} tzolkin_coeff Coefficient for the 260-day cycle
     * @param {string} tzolkin_day Name of the name in the 260-day cycle
     * @param {number} haab_coeff Day in the Haab month
     * @param {string} haab_month Name of the Haab month
     */
    constructor(tzolkin_coeff, tzolkin_day, haab_coeff, haab_month) {
        /**
         * 260-day cycle component of the Calendar Round
         * @type {Tzolkin}
         */
        this.tzolkin = new tzolkin.Tzolkin(tzolkin_coeff, tzolkin_day);
        /**
         * Haab cycle component of the Calendar Round
         * @type {Haab}
         */
        this.haab = new haab.Haab(haab_coeff, haab_month);

        this.validate();
    }

    /**
     * Validate that the Calendar Round has a correct 260-day and Haab
     * configuration
     */
    validate() {
        let valid_haab_coeffs = [];
        if ([
            'Kaban', 'Ik\'', 'Manik\'', 'Eb',
        ].includes(this.tzolkin.name)) {
            valid_haab_coeffs = [0, 5, 10, 15];
        } else if ([
            'Etz\'nab', 'Ak\'bal', 'Lamat', 'Ben',
        ].includes(this.tzolkin.name)) {
            valid_haab_coeffs = [1, 6, 11, 16];
        } else if ([
            'Kawak', 'K\'an', 'Muluk', 'Ix',
        ].includes(this.tzolkin.name)) {
            valid_haab_coeffs = [2, 7, 12, 17];
        } else if ([
            'Ajaw', 'Chikchan', 'Ok', 'Men',
        ].includes(this.tzolkin.name)) {
            valid_haab_coeffs = [3, 8, 13, 18];
        } else if ([
            'Imix', 'Kimi', 'Chuwen', 'Kib',
        ].includes(this.tzolkin.name)) {
            valid_haab_coeffs = [4, 9, 14, 19];
        } else if ([wildcard].includes(this.tzolkin.name)) {
            valid_haab_coeffs = [...Array(19).keys()];
        } else {
            throw `Could not allocate Tzolk'in (${this.tzolkin.name}) to permissible month coeffs.`;
        }

        valid_haab_coeffs.push(wildcard);

        if (!valid_haab_coeffs.includes(this.haab.coeff)) {
            throw `${this} should have Haab coeff in ${valid_haab_coeffs} for day ${this.tzolkin.name}`;
        }
    }

    /**
     * Increment both the Haab and 260-day cycle to the next day in the Calendar Round
     * @returns {CalendarRound}
     */
    next() {
        let new_cr = this.clone();
        new_cr.tzolkin = this.tzolkin.next();
        new_cr.haab = this.haab.next();
        new_cr.validate();
        return new_cr;
    }

    /**
     * Check that this CalendarRound matches another CalendarRound. If one CR has
     * wildcards and the other does not, this function will return false.
     * @param {CalendarRound} new_cr
     * @return {Boolean}
     */
    equal(new_cr) {
        return this.haab.equal(new_cr.haab) &&
            this.tzolkin.equal(new_cr.tzolkin);
    }

    /**
     * Check that this Calendar Round matches another CalendarRound. If one CR has
     * wildcards and the other does not, this function will return true.
     * @param {CalendarRound} new_cr
     * @return {boolean}
     */
    match(new_cr) {
        let haab_matches = this.haab.match(new_cr.haab);
        let tzolkin_matches = this.tzolkin.match(new_cr.tzolkin);
        return haab_matches && tzolkin_matches;
    }

    /**
     * Shift a CalendarRound date forward through time. Does not modify this
     * object and will return a new object.
     * @param {number} increment
     * @return {CalendarRound}
     */
    shift(increment) {
        let new_cr = this.clone();
        new_cr.haab = new_cr.haab.shift(increment);
        new_cr.tzolkin = new_cr.tzolkin.shift(increment);
        return new_cr;
    }

    /**
     * Return a brand new object with the same configuration as this object.
     * @return {CalendarRound}
     */
    clone() {
        return new CalendarRound(
            this.tzolkin.coeff,
            this.tzolkin.day,
            this.haab.coeff,
            this.haab.month,
        );
    }

    /**
     * Return true, if this function has any wildcard portions.
     * @return {boolean}
     */
    is_partial() {
        return (this.tzolkin.day === wildcard) ||
            (this.tzolkin.coeff === wildcard) ||
            (this.haab.month === wildcard) ||
            (this.haab.coeff === wildcard);
    }

    /**
     * Render the CalendarRound cycle date as a string
     * @returns {string}
     */
    toString(is_numeric) {
        if (is_numeric) {
            return `${this.tzolkin.toString(is_numeric)}:${this.haab.toString(
                is_numeric)}`;
        }
        return `${this.tzolkin} ${this.haab}`;
    }
}

module.exports = CalendarRound;
