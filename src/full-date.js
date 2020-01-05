/**
 * An encapsulation of a LongCount and Calendar Round which match each other.
 */
class FullDate {
    /**
     * @param {CalendarRound} cr
     * @param {LongCount} lc
     */
    constructor(cr, lc) {
        /**
         * @type {CalendarRound}
         */
        this.cr = cr;

        /**
         * @type {LongCount}
         */
        this.lc = lc;
    }

    /**
     * Render the FullDate as a string of both the CR and the LC
     * @returns {string}
     */
    toString() {
        return `${this.cr} ${this.lc}`;
    }

}

module.exports = FullDate;
