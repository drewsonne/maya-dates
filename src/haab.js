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
    if (typeof month === 'string') {
      month = new HaabMonth(month)
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

  /**
   * Return a string representation of the Haab month name
   * @returns {string}
   */
  get name () {
    return this.month.name
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
     * Name of the Haab month
     * @type {string}
     */
    this.name = name

    /**
     * @type {Map<number, string>}
     */
    this.months = {
      1: 'Pop',
      2: 'Wo',
      3: 'Sip',
      4: 'Sotz\'',
      5: 'Sek',
      6: 'Xul',
      7: 'Yaxk\'in',
      8: 'Mol',
      9: 'Ch\'en',
      10: 'Yax',
      11: 'Sak',
      12: 'Keh',
      13: 'Mak',
      14: 'K\'ank\'in',
      15: 'Muwan',
      16: 'Pax',
      17: 'K\'ayab',
      18: 'Kumk\'u',
      19: 'Wayeb',
    }
  }

  /**
   * Return the next month in the Haab cycle
   * @returns {HaabMonth}
   */
  next () {
    let i
    for (i = 0; i < 20; i++) {
      if (this.months[i] === this.name) {
        break
      }
    }
    i += 1
    if (i > 19) {
      i = 1
    }
    return new HaabMonth(this.months[i])
  }
}

module.exports = {
  'Haab': Haab,
  'HaabMonth': HaabMonth,
}
