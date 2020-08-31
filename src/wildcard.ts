/**
 * Describes a wildcard in the Calendar Round or Long Count.
 * This class is not directly exposed to the user. There is a singleton in this
 * library to allow for use and equality comparison.
 * @example
 * import {CalendarRoundFactory, Wildcard} from '@drewsonne/maya-dates'
 * let cr = new CalendarRoundFactory().parse('4 Ajaw 8 *')
 * console.log(cr.haab.month.equal(new Wildcard()))
 * > true
 */
import {IPart} from "./i-part";
import {CommentWrapper} from "./comment-wrapper";

export class Wildcard extends CommentWrapper implements IPart {

  constructor() {
    super();
  }

  /**
   * Represent the Wildcard as a string. ie, '*'.
   * @returns {string}
   */
  // eslint-disable-next-line class-methods-use-this
  toString(): string {
    return '*';
  }

  equal(other: IPart): boolean {
    return other instanceof Wildcard
  }
}

export function isWildcard(token: any): token is Wildcard {
  return token instanceof Wildcard;
}

