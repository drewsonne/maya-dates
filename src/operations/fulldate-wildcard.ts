import FullDate from '../full-date';
import LongCountWildcard from './longcount-wildcard';
import {IPart} from "../i-part";
import {CommentWrapper} from "../comment-wrapper";


/**
 * Expand a partial {@link FullDate} into all valid permutations.
 */
export default class FullDateWildcard extends CommentWrapper implements IPart {
  private readonly fullDate: FullDate;

  constructor(partialDate: FullDate) {
    super();
    this.fullDate = partialDate;
  }

  equal(other: IPart): boolean {
    if (other instanceof FullDateWildcard) {
      return this.fullDate.equal(other.fullDate)
    }
    return false;
  }

  /**
   * Produce all fully qualified full dates.
   */
  run(): FullDate[] {
    if (!this.fullDate.isPartial()) {
      return [this.fullDate]
    }

    if (this.fullDate.lc.isPartial()) {
      const isPartialCr = this.fullDate.cr.isPartial()
      const fullDatesFromPartialLc: FullDate[] = new LongCountWildcard(this.fullDate.lc)
        .run()
        .map((potentialLc) => potentialLc.buildFullDate());
      let that = this;
      return fullDatesFromPartialLc.filter((fullDate) => {
        return isPartialCr ? fullDate.cr.match(this.fullDate.cr) : (fullDate.cr === this.fullDate.cr)
      }, this)
    }
    // If we have a full formed LC fullDate, and a fullDate CR, then generate the
    // CR for the LC, and compare them. The fullDate CR will either match the
    // CR for the LC or it won't.
    const staticCr = this.fullDate.lc.buildCalendarRound();
    return (staticCr.match(this.fullDate.cr))
      ? [new FullDate(staticCr, this.fullDate.lc)]
      : [];
  }

  toString(): string {
    return this.fullDate.toString()
  }
}
