/**
 * An encapsulation of a LongCount and Calendar Round which match each other.
 */
import LongCount from "./lc/long-count";
import {CalendarRound} from "./cr/calendar-round";
import {Comment, isComment} from "./comment";
import {IPart} from "./i-part";

export default class FullDate implements IPart {

  cr: CalendarRound;
  lc: LongCount;
  comment: Comment | undefined;

  constructor(cr: CalendarRound, lc: LongCount) {
    this.cr = cr;
    this.lc = lc;
  }

  setComment(comment: Comment): FullDate {
    this.comment = comment
    return this;
  }

  appendComment(comment: Comment): FullDate {
    if (isComment(this.comment)) {
      this.comment = this.comment.merge(comment)
    } else {
      this.setComment(comment)
    }
    return this
  }

  /**
   * Render the FullDate as a string of both the CR and the LC
   */
  toString(): string {
    return `${this.cr} ${this.lc}`;
  }

  isPartial(): boolean {
    return this.cr.isPartial() || this.lc.isPartial()
  }

  equal(other: IPart): boolean {
    if (other instanceof FullDate) {
      throw new Error('Not Implemented')
    }
    return false;
  }
}
