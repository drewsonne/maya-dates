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
export class Wildcard {
  /**
   * Represent the Wildcard as a string. ie, '*'.
   * @returns {string}
   */
  // eslint-disable-next-line class-methods-use-this
  toString(): string {
    return '*';
  }
}

export function isWildcard(token: any): token is Wildcard {
  return token instanceof Wildcard;
}

