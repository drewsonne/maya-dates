/** @ignore */
const FullDate = require('../full-date');
/** @ignore */
const LongCountWildcard = require('../operations/longcount-wildcard');
/** @ignore */
const CalendarRoundWildcard = require('../operations/calendar-round-wildcard');

/** @ignore */
const concat = (x, y) => x.concat(y);

/** @ignore */
const flatMap = (f, xs) => xs.map(f).reduce(concat, []);

/** @ignore */
// eslint-disable-next-line no-extend-native,func-names
Array.prototype.flatMap = function (f) {
  return flatMap(f, this);
};

/**
 * Given a Calendar Round and Long Count with a wildcard, calculate all possible
 * matching fully qualified Long Counts with CalendarRounds.
 */
class FullDateWildcard {
  /**
   * @param {FullDate} partialDate
   */
  constructor(partialDate) {
    /**
     * @type {FullDate}
     */
    this.fullDate = partialDate;
  }

  /**
   * Run calculation to find all fully qualified Long Counts with Calendar Rounds
   * @return {FullDate[]}
   */
  run() {
    if (this.fullDate.lc.isPartial()) {
      const lcs = new LongCountWildcard(this.fullDate.lc).run();

      const mappedLcs = lcs.map(function (potentialLc) {
          return potentialLc.buildFullDate();
        }
      );
      const flatMappedLcs = mappedLcs.flatMap(
        (fullDate) => (
          this.fullDate.cr.isPartial()
            ? new CalendarRoundWildcard(this.fullDate.cr).run()
            : [this.fullDate.cr]
        ).map(
          (cr) => [].concat(cr, fullDate)
        )
      );
      const filteredMappedLcs = flatMappedLcs.filter(
        (pair) => pair[0].equal(pair[1].cr)
      );
      return filteredMappedLcs;
    }
    // If we have a full formed LC fullDate, and a fullDate CR, then generate the
    // CR for the LC, and compare them. The fullDate CR will either match the
    // CR for the LC or it won't.
    const staticCr = this.fullDate.lc.buildCalendarRound();
    return (staticCr.match(this.fullDate.cr))
      ? [new FullDate(staticCr, this.fullDate.lc)]
      : [];
  }
}

module.exports = FullDateWildcard;
