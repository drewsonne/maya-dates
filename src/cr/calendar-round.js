import tzolkin from './tzolkin';
import haab from './haab';
import wildcard from '../wildcard';
import DistanceNumber from '../lc/distance-number';

/** @ignore */
const singleton = {}

/**
 * Return a comparable instance of a Calendar Round.
 * @param {number} tzolkinCoeff
 * @param {TzolkinDay|string} tzolkinDay
 * @param {number} haabCoeff
 * @param {HaabMonth|string} haabMonth
 * @return {CalendarRound}
 */
function getCalendarRound (tzolkinCoeff, tzolkinDay, haabCoeff, haabMonth) {
  const crId = `${tzolkinCoeff} ${tzolkinDay} ${haabCoeff} ${haabMonth}`
  if (singleton[crId] === undefined) {
    // eslint-disable-next-line no-use-before-define
    singleton[crId] = new CalendarRound(tzolkinCoeff, tzolkinDay, haabCoeff,
      haabMonth)
  }
  return singleton[crId]
}

/**
 * A combination of 260-day cycles and the Haab cycle. This class should not
 * be instantiated directly, and should be accessed through getCalendarRound.
 * @see {getCalendarRound}
 * @example
 *  let cr = new CalendarRound(4, "Ajaw", 8, "Kumk'u");
 */
class CalendarRound {
  /**
   * @param {number} tzolkinCoeff Coefficient for the 260-day cycle
   * @param {string|TzolkinDay} tzolkinDay Name of the name in the 260-day cycle
   * @param {number} haabCoeff Day in the Haab month
   * @param {string|HaabMonth} haabMonth Name of the Haab month
   */
  constructor (tzolkinCoeff, tzolkinDay, haabCoeff, haabMonth) {
    /**
     * 260-day cycle component of the Calendar Round
     * @type {Tzolkin}
     */
    this.tzolkin = tzolkin.getTzolkin(tzolkinCoeff, tzolkinDay)
    /**
     * Haab cycle component of the Calendar Round
     * @type {Haab}
     */
    this.haab = haab.getHaab(haabCoeff, haabMonth)

    this.validate()
  }

  /**
   * Validate that the Calendar Round has a correct 260-day and Haab
   * configuration
   * @throws {Error} If the Calendar Round is invalid.
   */
  validate () {
    let validHaabCoeffs = []
    if ([
      'Kaban', 'Ik\'', 'Manik\'', 'Eb',
    ].includes(this.tzolkin.name)) {
      validHaabCoeffs = [0, 5, 10, 15]
    } else if ([
      'Etz\'nab', 'Ak\'bal', 'Lamat', 'Ben',
    ].includes(this.tzolkin.name)) {
      validHaabCoeffs = [1, 6, 11, 16]
    } else if ([
      'Kawak', 'K\'an', 'Muluk', 'Ix',
    ].includes(this.tzolkin.name)) {
      validHaabCoeffs = [2, 7, 12, 17]
    } else if ([
      'Ajaw', 'Chikchan', 'Ok', 'Men',
    ].includes(this.tzolkin.name)) {
      validHaabCoeffs = [3, 8, 13, 18]
    } else if ([
      'Imix', 'Kimi', 'Chuwen', 'Kib',
    ].includes(this.tzolkin.name)) {
      validHaabCoeffs = [4, 9, 14, 19]
    } else if ([wildcard].includes(this.tzolkin.name)) {
      validHaabCoeffs = [...Array(19).keys()]
    } else {
      throw new Error(
        `Could not allocate Tzolk'in (${this.tzolkin.name}) to permissible month coeffs.`)
    }

    validHaabCoeffs.push(wildcard)

    if (!validHaabCoeffs.includes(this.haab.coeff)) {
      throw new Error(
        `${this} should have Haab coeff in ${validHaabCoeffs} for day ${this.tzolkin.name}`)
    }
  }

  /**
   * Increment both the Haab and 260-day cycle to the next day in the Calendar Round
   * @returns {CalendarRound}
   */
  next () {
    return this.shift(1)
  }

  /**
   * Check that this CalendarRound matches another CalendarRound. If one CR has
   * wildcards and the other does not, this function will return false.
   * @param {CalendarRound} newCr
   * @return {Boolean}
   */
  equal (newCr) {
    return this === newCr
  }

  /**
   * Return a long count date representing the difference between two dates.
   * @param {CalendarRound} targetCr
   * @return {LongCount}
   */
  minus (targetCr) {
    /** @ignore */
    let foundOrigin = false
    const foundTarget = false
    let current = this
    let count = 0
    let cycleCount = undefined
    while (!foundTarget) {
      // eslint-disable-next-line no-use-before-define
      if (current.equal(origin)) {
        foundOrigin = true
        cycleCount = count
        count = 0
        current = current.next()
      } else if (current.equal(targetCr)) {
        return new DistanceNumber(
          foundOrigin
            ? -(18979 - cycleCount - count)
            : count,
        ).normalise()
      } else {
        current = current.next()
        count += 1
      }
    }
  }

  /**
   * Check that this Calendar Round matches another CalendarRound. If one CR has
   * wildcards and the other does not, this function will return true.
   * @param {CalendarRound} newCr
   * @return {boolean}
   */
  match (newCr) {
    const haabMatches = this.haab.match(newCr.haab)
    const tzolkinMatches = this.tzolkin.match(newCr.tzolkin)
    return haabMatches && tzolkinMatches
  }

  /**
   * Shift a CalendarRound forward through time. Does not modify this
   * object and will return a new object.
   * @param {number} increment
   * @return {CalendarRound}
   */
  shift (increment) {
    const newHaab = this.haab.shift(increment)
    const newTzolkin = this.tzolkin.shift(increment)
    // eslint-disable-next-line no-use-before-define
    return getCalendarRound(
      newTzolkin.coeff,
      newTzolkin.day,
      newHaab.coeff,
      newHaab.month,
    )
  }

  /**
   * Return true, if this function has any wildcard portions.
   * @return {boolean}
   */
  isPartial () {
    return (this.tzolkin.day === wildcard)
      || (this.tzolkin.coeff === wildcard)
      || (this.haab.month === wildcard)
      || (this.haab.coeff === wildcard)
  }

  /**
   * Render the CalendarRound cycle fullDate as a string
   * @returns {string}
   */
  toString () {
    return `${this.tzolkin} ${this.haab}`
  }
}

/** @ignore */
const origin = getCalendarRound(
  4, 'Ajaw',
  8, 'Kumk\'u',
)

export default {
  getCalendarRound,
  origin
};
