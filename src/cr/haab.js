/** @ignore */
const wildcard = require('../wildcard')

/**
 * Describes a Haab date with a position and a month
 * @example
 *    let day = new Haab(8, "Kumk'u");
 *
 * @example
 *    let day = new Haab(8, new HaabMonth("Kumk'u"));
 *
 */
class Haab {
  /**
   * Constructor
   * @param {number} coeff - The position in the Haab month for this date
   * @param {string|HaabMonth} month
   */
  constructor (coeff, month) {
    if (coeff === '*') {
      coeff = wildcard
    } else if (coeff !== wildcard) {
      coeff = parseInt(coeff)
    }
    if (typeof month === 'string') {
      if (month === '*') {
        month = wildcard
      } else {
        month = new HaabMonth(month)
      }
    }
    /**
     * @type {HaabMonth}
     */
    this.month = month
    /**
     * @type {number}
     */
    this.coeff = coeff
  }

  /**
   * Return the next day in the Haab cycle
   * @returns {Haab}
   */
  next () {
    let month_length = (this.name === this.month.months[19]) ? 5 : 20
    let tomorrow_coeff = (this.coeff + 1) % month_length
    return new Haab(
      tomorrow_coeff,
      (tomorrow_coeff === 0) ? this.month.next() : this.month,
    )
  }

  equal (new_haab) {
    return (this.coeff === new_haab.coeff) &&
      (this.name === new_haab.name)
  }

  /**
   * Return a string representation of the Haab month name
   * @returns {string}
   */
  get name () {
    if (this.month === wildcard) {
      return this.month
    }
    return this.month.name
  }

  /**
   *
   * @param {number} incremental
   */
  shift (incremental) {

    let new_date = this.clone()
    while (incremental > 0) {
      let month_length = (new_date.name === this.month.months[19]) ? 5 : 20
      let month_incremental = Math.floor(incremental / month_length)
      if (month_incremental > 0) {
        new_date.month = new_date.month.shift(1)
      }
      let day_incremental = incremental % month_length
      if (day_incremental === 0 && incremental !== 0) {
        day_incremental = 20
      }
      if (day_incremental !== month_length) {
        new_date.coeff = (new_date.coeff + day_incremental) % month_length
      }
      incremental -= day_incremental
    }

    return new_date
  }

  /**
   * Render the Haab date as a string
   * @returns {string}
   */
  toString () {
    return `${this.coeff} ${this.name}`
  }

  clone () {
    return new Haab(
      this.coeff,
      this.month,
    )
  }

}

/**
 * Describes only the month component of a Haab date
 */
class HaabMonth {
  /**
   * @param {string} name - Name of the Haab month
   */
  constructor (name) {

    /**
     * @type {Map<number, string>}
     */
    this.months = [
      undefined,
      'Pop',
      'Wo',
      'Sip',
      'Sotz\'',
      'Sek',
      'Xul',
      'Yaxk\'in',
      'Mol',
      'Ch\'en',
      'Yax',
      'Sak',
      'Keh',
      'Mak',
      'K\'ank\'in',
      'Muwan',
      'Pax',
      'K\'ayab',
      'Kumk\'u',
      'Wayeb',
    ]

    if (typeof name === 'number') {
      name = this.months[name]
    }

    /**
     * Name of the Haab month
     * @type {string}
     */
    this.name = name

    /**
     * @type {number}
     */
    this.month_position = this.months.findIndex(
      m => m === this.name)
  }

  /**
   * Return the next month in the Haab cycle
   * @returns {HaabMonth}
   */
  next () {
    return this.shift(1)
  }

  /**
   *
   * @param {number} incremental
   */
  shift (incremental) {
    let new_incremental = (this.month_position + incremental) % 19
    new_incremental = (new_incremental === 0) ? 19 : new_incremental
    return new HaabMonth(new_incremental)
  }
}

module.exports = {
  'Haab': Haab,
  'HaabMonth': HaabMonth,
}
