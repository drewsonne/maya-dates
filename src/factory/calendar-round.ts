import Factory from './base';
import {CalendarRound, getCalendarRound} from '../cr/calendar-round';
import {getTzolkin} from "../cr/tzolkin";
import {getHaab} from "../cr/haab";
import {getTzolkinDay} from "../cr/component/tzolkinDay";
import {getHaabMonth} from "../cr/component/haabMonth";
import {coefficientParser as _} from "../cr/component/coefficient";

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

    let tzolkinPart = getTzolkin(
      _(parts[0]),
      getTzolkinDay(parts[1])
    )
    let haabPart = getHaab(
      _(parts[2]),
      getHaabMonth(parts[3])
    )
    return getCalendarRound(tzolkinPart, haabPart);
  }

  isNumberString(potentialNumber: string): boolean {
    return potentialNumber.match(/^\d+$/g) !== null
  }

}
