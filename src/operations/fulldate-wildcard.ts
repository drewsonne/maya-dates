import FullDate from '../full-date';
import LongCountWildcard from './longcount-wildcard';

/** @ignore */
// const concat = (x, y) => x.concat(y);
//
// /** @ignore */
// const flatMap = (f, xs) => xs.map(f).reduce(concat, []);

/** @ignore */
// eslint-disable-next-line no-extend-native,func-names
// Array.prototype.flatMap = function (f) {
//   return flatMap(f, this);
// };

/**
 * Given a Calendar Round and Long Count with a wildcard, calculate all possible
 * matching fully qualified Long Counts with CalendarRounds.
 */
export default class FullDateWildcard {
  private fullDate: FullDate;

  /**
   * @param {FullDate} partialDate
   */
  constructor(partialDate: FullDate) {
    /**
     * @type {FullDate}
     */
    this.fullDate = partialDate;
  }

  /**
   * Run calculation to find all fully qualified Long Counts with Calendar Rounds
   * @return {FullDate[]}
   */
  run(): FullDate[] {
    if (!this.fullDate.isPartial()) {
      return [this.fullDate]
    }

    if (this.fullDate.lc.isPartial()) {
      const partialCr = this.fullDate.cr.isPartial()
      const fullDatesFromPartialLc: FullDate[] = new LongCountWildcard(this.fullDate.lc)
        .run()
        .map((potentialLc) => potentialLc.buildFullDate());
      return fullDatesFromPartialLc.filter((fullDate) => {
        return partialCr ? fullDate.cr.match(this.fullDate.cr) : fullDate.cr.equal(this.fullDate.cr)
      })
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
