/** @ignore */
const wildcard = require('../wildcard');

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
   * @param {number|Wildcard|string} coeff - The position in the Haab month for this date
   * @param {string|HaabMonth|Wildcard} month
   */
  constructor(coeff, month) {
    if (coeff === '*') {
      coeff = wildcard;
    } else if (coeff !== wildcard) {
      coeff = parseInt(coeff);
    }
    if (typeof month === 'string') {
      if (month === '*') {
        month = wildcard;
      } else {
        month = new HaabMonth(month);
      }
    }
    /**
     * @type {HaabMonth|Wildcard}
     */
    this.month = month;
    /**
     * @type {number|Wildcard}
     */
    this.coeff = coeff;

    this.validate();
  }

  /**
   * Ensure the Haab's coefficients are within range and the month is defined
   * @return {boolean}
   */
  validate() {
    if (this.coeff > 19 || this.coeff < 0) {
      throw 'Haab\' coefficient must inclusively between 0 and 19.';
    }
    if (this.name === 'Wayeb' && this.coeff > 4) {
      throw 'Haab\' coefficient for Wayeb must inclusively between 0 and 4.';
    }
    if (this.month === undefined) {
      throw 'Haab\' month must be provided';
    }
    if (this.month !== wildcard) {
      this.month.validate();
    }

    return true;
  }

  /**
   * Return the next day in the Haab cycle
   * @returns {Haab}
   */
  next() {
    return this.shift(1);
  }

  /**
   * Ensure this Haab object has the same configuration as another Haab object.
   * Does not take wildcards into account.
   * @param {Haab} new_haab
   * @return {boolean}
   */
  equal(new_haab) {
    return (this.coeff === new_haab.coeff) &&
      (this.name === new_haab.name);
  }

  /**
   * Ensure this Haab object has a matching configuration as another Haab object.
   * Takes wildcards into account.
   * @param {Haab} new_haab
   * @return {boolean}
   */
  match(new_haab) {
    return (
      (this.coeff === wildcard || new_haab.coeff === wildcard) ?
        true :
        (this.coeff === new_haab.coeff)
    ) && (
      (this.month === wildcard || new_haab.month === wildcard) ?
        true :
        (this.name === new_haab.name)
    );
  }

  /**
   * Return a string representation of the Haab month name
   * @returns {string|Wildcard}
   */
  get name() {
    if (this.month === wildcard) {
      return this.month;
    }
    return this.month.name;
  }

  /**
   *
   * @param {number} incremental
   */
  shift(incremental) {
    let new_date = this.clone();
    while (incremental > 0) {
      let month_length = (new_date.name === this.month.months[19]) ? 5 : 20;
      if (incremental + new_date.coeff >= month_length) {
        let distance_to_month_end = month_length - new_date.coeff;
        new_date.coeff = 0;
        new_date.month = new_date.month.shift(1);
        incremental -= distance_to_month_end;
      } else {
        new_date.coeff += incremental;
        incremental = 0;
      }
    }
    new_date.validate();
    return new_date;
  }

  /**
   * Render the Haab date as a string
   * @returns {string}
   */
  toString(is_numeric) {
    if (is_numeric) {
      return `${this.coeff}:${this.month.month_position}`;
    }
    return `${this.coeff} ${this.name}`;
  }

  /**
   * Return a brand new object with the same configuration as this object.
   * @return {Haab}
   */
  clone() {
    return new Haab(
      this.coeff,
      this.month
    );
  }

}

/**
 * Describes only the month component of a Haab date
 */
class HaabMonth {
  /**
   * @param {string} name - Name of the Haab month
   */
  constructor(name) {

    /**
     * @type {string[]}
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
    ];

    if (typeof name === 'number') {
      name = this.months[name];
    }

    /**
     * Name of the Haab month
     * @type {string}
     */
    this.name = name;

    /**
     * @type {number}
     */
    this.month_position = this.months.findIndex(
      m => m === this.name);
  }

  /**
   * Return the next month in the Haab cycle
   * @returns {HaabMonth}
   */
  next() {
    return this.shift(1);
  }

  /**
   * Ensure a Haab month name is defined, and that the month name is within the
   * set of allowable values.
   */
  validate() {
    if (this.name === undefined) {
      throw 'Haab\' month name must be provided';
    }
    if (!this.months.includes(this.name)) {
      throw `Haab' day (${this.name}) must be in ${this.months}`;
    }
  }

  /**
   * Shift a HaabMonth date forward through time. Does not modify this
   * object and will return a new object.
   * @param {number} increment - Number of months to move forward
   * @return {HaabMonth}
   */
  shift(increment) {
    let new_incremental = (this.month_position + increment) % 19;
    new_incremental = (new_incremental === 0) ? 19 : new_incremental;
    return new HaabMonth(new_incremental);
  }
}

module.exports = {
  'Haab': Haab,
  'HaabMonth': HaabMonth,
};
