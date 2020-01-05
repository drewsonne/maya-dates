/** @ignore */
const FullDate = require('../full-date');
/** @ignore */
const LongCountWildcard = require('../operations/longcount-wildcard');
/** @ignore */
const CalendarRoundWildcard = require('../operations/calendar-round-wildcard');

/**
 * Given a Calendar Round and Long Count with a wildcard, calculate all possible
 * matching fully qualified Long Counts with CalendarRounds.
 */
class FullDateWildcard {
    /**
     * @param {FullDate} partial_date
     */
    constructor(partial_date) {
        /**
         * @type {FullDate}
         */
        this.partial = partial_date;
    }

    /**
     * Run calculation to find all fully qualified Long Counts with Calendar Rounds
     * @return {FullDate[]}
     */
    run() {
        let potential_dates = [];
        let potential_lc_fulldates = [];
        let potential_crs;

        let has_cr_partial = this.partial.cr.is_partial();
        let has_lc_partial = this.partial.lc.is_partial();
        if (has_lc_partial) {
            let potential_lcs = new LongCountWildcard(this.partial.lc).run();
            for (let potential_lc of potential_lcs) {
                potential_lc_fulldates.push(potential_lc.build_full_date());
            }
        } else {
            // If we have a full formed LC date, and a partial CR, then generate the
            // CR for the LC, and compare them. The partial CR will either match the
            // CR for the LC or it won't.
            let static_cr = this.partial.lc.build_calendar_round();
            return (static_cr.match(this.partial.cr)) ?
                [new FullDate(static_cr, this.partial.lc)] :
                [];
        }
        if (has_cr_partial) {
            potential_crs = new CalendarRoundWildcard(this.partial.cr).run();
        } else {
            potential_crs = [this.partial.cr];
        }
        for (let full_date of potential_lc_fulldates) {
            for (let cr of potential_crs) {
                if (cr.equal(full_date.cr)) {
                    potential_dates.push(full_date);
                }
            }
        }
        return potential_dates;
    }
}

module.exports = FullDateWildcard;

