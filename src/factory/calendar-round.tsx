import Factory from './base';
import {CalendarRound, getCalendarRound} from '../cr/calendar-round';
import {getTzolkin} from "../cr/tzolkin";
import {getHaab} from "../cr/haab";
import {getTzolkinDay} from "../cr/component/tzolkinDay";
import {getHaabMonth} from "../cr/component/haabMonth";
import {Wildcard} from "../wildcard";
import Coefficient from "../cr/component/coefficient";

/**
 * A factory to create a CalendarRound object from a string
 * @extends {Factory}
 * @example
 *    let cr = new CalendarRoundFactory().parse("4 Ajaw 8 Kumk'u");
 */
export default class CalendarRoundFactory extends Factory {

  pattern: RegExp;

  /**
   * Defines the pattern describing a Calendar Round
   */
  constructor() {
    super();
    /**
     * Describes how to break the string into a Calendar Round
     * @type {RegExp}
     */
    this.pattern = /([*\d]+)\s?([^\s]+)\s?([*\d]+)\s?([^\s]+)/;
  }

  /**
   * Given a string, parse it and create a Calendar Round
   * @param {string} raw - A string containing a Calendar Round
   * @returns {CalendarRound}
   */
  parse(raw: string): CalendarRound {
    const parts: string[] = this.split(raw);
    if (parts.length < 4) {
      return null;
    }

    return getCalendarRound(
      getTzolkin(
        this.parseCoefficient(parts[0]),
        getTzolkinDay(parts[1])
      ),
      getHaab(
        this.parseCoefficient(parts[2]),
        getHaabMonth(parts[3])
      )
    );
  }

  isNumberString(potentialNumber: string): boolean {
    return potentialNumber.match(/^\d+$/g) !== null
  }

  parseCoefficient(potentialCoeff: string): Wildcard | number {
    if (potentialCoeff === '*') {
      return new Wildcard();
    }
    if (!this.isNumberString(potentialCoeff)) {
      throw new Error(`Could not parse '${potentialCoeff}' as Wildcard or Coefficient`)
    }
    return new Coefficient(+potentialCoeff)
  }
}
