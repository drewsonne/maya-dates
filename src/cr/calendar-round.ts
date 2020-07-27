import {getTzolkin, Tzolkin} from './tzolkin';
import {getHaab, Haab} from './haab';
import DistanceNumber from '../lc/distance-number';
import {getHaabMonth} from "./component/haabMonth";
import {getTzolkinDay} from "./component/tzolkinDay";
import NumberCoefficient from "./component/numberCoefficient";
import {Wildcard} from "../wildcard";

/** @ignore */
const singleton: { [key: string]: CalendarRound } = {};

/**
 * Return a comparable instance of a Calendar Round.
 */
export function getCalendarRound(
  tzolkin: Tzolkin,
  haab: Haab
): CalendarRound {
  const crId = `${tzolkin} ${haab}`;
  if (singleton[crId] === undefined) {
    // eslint-disable-next-line no-use-before-define
    singleton[crId] = new CalendarRound(tzolkin, haab);
  }
  return singleton[crId];
}

/**
 * A combination of 260-day cycles and the Haab cycle. This class should not
 * be instantiated directly, and should be accessed through getCalendarRound.
 * @see {getCalendarRound}
 * @example
 *  let cr = new CalendarRound(4, "Ajaw", 8, "Kumk'u");
 */
export class CalendarRound {
  tzolkin: Tzolkin;
  haab: Haab;

  constructor(tzolkin: Tzolkin, haab: Haab) {
    /**
     * 260-day cycle component of the Calendar Round
     */
    this.tzolkin = tzolkin;
    /**
     * Haab cycle component of the Calendar Round
     */
    this.haab = haab;

    this.validate();
  }

  /**
   * Validate that the Calendar Round has a correct 260-day and Haab
   * configuration
   * @throws {Error} If the Calendar Round is invalid.
   */
  validate() {
    let validHaabCoeffs: number[] = [];
    if ([
      'Kaban', 'Ik\'', 'Manik\'', 'Eb',
    ].includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [0, 5, 10, 15];
    } else if ([
      'Etz\'nab', 'Ak\'bal', 'Lamat', 'Ben',
    ].includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [1, 6, 11, 16];
    } else if ([
      'Kawak', 'K\'an', 'Muluk', 'Ix',
    ].includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [2, 7, 12, 17];
    } else if ([
      'Ajaw', 'Chikchan', 'Ok', 'Men',
    ].includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [3, 8, 13, 18];
    } else if ([
      'Imix', 'Kimi', 'Chuwen', 'Kib',
    ].includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [4, 9, 14, 19];
    } else if (this.tzolkin.name instanceof Wildcard) {
      validHaabCoeffs = [...Array(19).keys()];
    } else {
      throw new Error(
        `Could not allocate Tzolk'in (${this.tzolkin.name}) to permissible month coeffs.`
      );
    }

    if (this.haab.coeff !== undefined) {
      if (!this.haab.coeff.isIn(validHaabCoeffs)) {
        throw new Error(
          `${this} should have Haab coeff in ${validHaabCoeffs} for day ${this.tzolkin.name}`
        );
      }
    }
  }

  /**
   * Increment both the Haab and 260-day cycle to the next day in the Calendar Round
   * @returns {CalendarRound}
   */
  next(): CalendarRound {
    return this.shift(1);
  }

  /**
   * Check that this CalendarRound matches another CalendarRound. If one CR has
   * wildcards and the other does not, this function will return false.
   * @param {CalendarRound} newCr
   */
  equal(newCr: CalendarRound): boolean {
    return this === newCr;
  }

  /**
   * Return a long count date representing the difference between two dates.
   */
  minus(targetCr: CalendarRound): DistanceNumber {
    /** @ignore */
    let foundOrigin: boolean = false;
    let foundTarget: boolean = false;
    let current: CalendarRound = this;
    let count: number = 0;
    let cycleCount: number = 0;
    let result: DistanceNumber;
    while (!foundTarget) {
      // eslint-disable-next-line no-use-before-define
      if (current.equal(origin)) {
        foundOrigin = true;
        cycleCount = count;
        count = 0;
        current = current.next();
      } else if (current.equal(targetCr)) {
        result = new DistanceNumber(
          foundOrigin
            ? -(18979 - cycleCount - count)
            : count,
        ).normalise();
        foundTarget = true;
      } else {
        current = current.next();
        count += 1;
      }
    }
    return result;
  }

  /**
   * Check that this Calendar Round matches another CalendarRound. If one CR has
   * wildcards and the other does not, this function will return true.
   */
  match(newCr: CalendarRound): boolean {
    return this.haab.match(newCr.haab) &&
      this.tzolkin.match(newCr.tzolkin);
  }

  /**
   * Shift a CalendarRound forward through time. Does not modify this
   * object and will return a new object.
   */
  shift(increment: number): CalendarRound {
    // eslint-disable-next-line no-use-before-define
    return getCalendarRound(
      this.tzolkin.shift(increment),
      this.haab.shift(increment)
    );
  }

  /**
   * Return true, if this function has any wildcard portions.
   */
  isPartial(): boolean {
    return (this.tzolkin.day instanceof Wildcard)
      || (this.tzolkin.coeff instanceof Wildcard)
      || (this.haab.month instanceof Wildcard)
      || (this.haab.coeff instanceof Wildcard);
  }

  /**
   * Render the CalendarRound cycle fullDate as a string
   */
  toString(): string {
    return `${this.tzolkin} ${this.haab}`;
  }
}

/** @ignore */
export const origin = getCalendarRound(
  getTzolkin(
    new NumberCoefficient(4), getTzolkinDay('Ajaw')),
  getHaab(
    new NumberCoefficient(8), getHaabMonth('Kumk\'u')
  )
);

