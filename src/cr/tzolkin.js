/** @ignore */
const wildcard = require('../wildcard')

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
    if (coeff !== undefined) {
      if (coeff === '*') {
        coeff = wildcard
      } else if (coeff !== wildcard) {
        coeff = parseInt(coeff)
      }
    }
    if (day !== undefined) {
      if (typeof day === 'string') {
        if (day === '*') {
          day = wildcard
        } else {
          day = _get_day(day)
        }
      }
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
   *
   * @param {Tzolkin} incremental
   * @return {Tzolkin}
   */
  shift (incremental) {

  }

  equal (new_tzolkin) {
    return (this.coeff === new_tzolkin.coeff) &&
      (this.name === new_tzolkin.name)
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

const _day_lookup = {}

function _get_day (day_name) {
  if (_day_lookup[day_name] === undefined) {
    _day_lookup[day_name] = new TzolkinDay(day_name)
  }
  return _day_lookup[day_name]
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
    this.days = [
      undefined,
      'Imix',
      'Ik\'',
      'Ak\'bal',
      'K\'an',
      'Chikchan',
      'Kimi',
      'Manik',
      'Lamat',
      'Muluk',
      'Ok',
      'Chuwen',
      'Eb',
      'Ben',
      'Ix',
      'Men',
      'Kib',
      'Kaban',
      'Etz\'nab',
      'Kawak',
      'Ajaw',
    ]

    this.day_position = this.days.findIndex(
      d => d === this.name)
  }

  /**
   * Return the next day in the 260-day cycle
   * @returns {TzolkinDay}
   */
  next () {
    let i = this.day_position + 1
    if (i > 20) {
      i = 1
    }
    return _get_day(this.days[i])
  }
}

module.exports = {
  'TzolkinDay': TzolkinDay,
  'Tzolkin': Tzolkin,
}
