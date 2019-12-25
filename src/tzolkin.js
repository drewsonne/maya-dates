/** @ignore */
const wildcard = require('./wildcard')

/**
 * Describes a date in the 260-day cycle with a position and a day
 * @example
 *    let day = new Tzolkin(4, "Ajaw");
 *
 * @example
 *    let day = new Tzolkin(4, new TzolkinDay("Ajaw"));
 *
 */
class Tzolkin {
  /**
   * Constructor
   * @param {number} coeff - The position in the 260-day cycle
   * @param {string|TzolkinDay} day
   */
  constructor (coeff, day) {
    if (typeof day === 'string') {
      if (day === '*') {
        day = wildcard
      } else {
        day = new TzolkinDay(day)
      }
    }
    if (coeff === '*') {
      coeff = wildcard
    } else {
      coeff = parseInt(coeff)
    }
    /**
     * @type {TzolkinDay}
     */
    this.day = day
    /**
     * @type {number}
     */
    this.coeff = coeff
  }

  /**
   * Return the next day in the 260-day cycle
   * @returns {Tzolkin}
   */
  next () {
    let next_coeff = this.coeff + 1
    let next_day = this.day.next()
    return new Tzolkin(
      (next_coeff % 13) === 0 ? 13 : next_coeff % 13,
      next_day,
    )
  }

  /**
   * Return a string representation of the 260-day cycle name
   * @returns {string}
   */
  get name () {
    if (this.day === wildcard) {
      return this.day
    }
    return this.day.name
  }

  /**
   * Render the 260-day cycle date as a string
   * @returns {string}
   */
  toString () {
    return `${this.coeff} ${this.name}`
  }
}

/**
 * Describes only the day component of a 260-day cycle
 */
class TzolkinDay {
  /**
   * @param {string} name - Name of the 260-day cycle day
   */
  constructor (name) {
    /**
     * Name of the day in the 260-day cycle
     * @type {string}
     */
    this.name = name

    /**
     * Mapping of day names to indexes
     * @type {Map<number, string>}
     */
    this.days = {
      1: 'Imix',
      2: 'Ik\'',
      3: 'Ak\'bal',
      4: 'K\'an',
      5: 'Chikchan',
      6: 'Kimi',
      7: 'Manik',
      8: 'Lamat',
      9: 'Muluk',
      10: 'Ok',
      11: 'Chuwen',
      12: 'Eb',
      13: 'Ben',
      14: 'Ix',
      15: 'Men',
      16: 'Kib',
      17: 'Kaban',
      18: 'Etz\'nab',
      19: 'Kawak',
      20: 'Ajaw',
    }
  }

  /**
   * Return the next day in the 260-day cycle
   * @returns {TzolkinDay}
   */
  next () {
    let i
    for (i = 0; i < 20; i++) {
      if (this.days[i] === this.name) {
        break
      }
    }
    i += 1
    if (i > 20) {
      i = 1
    }
    return new TzolkinDay(this.days[i])
  }
}

module.exports = {
  'TzolkinDay': TzolkinDay,
  'Tzolkin': Tzolkin,
}
