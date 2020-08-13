/**
 * Describes a wildcard in the Calendar Round or Long Count.
 * This class is not directly exposed to the user. There is a singleton in this
 * library to allow for use and equality comparison.
 * @example
 * const mayadates = require('maya-dates')
 * let cr = new mayadates.factory.CalendarRoundFactory().parse('4 Ajaw 8 *')
 * console.log(cr.haab.month === mayadates.wildcard)
 * > true
 */
import IPart from "./i-part";

export class Wildcard implements IPart {
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

