/** @ignore */
const wildcard = require('../wildcard');
// const {HaabMonth} = require('./haab-month');
const {getHaabMonth} = require('./haab-month');


const singleton = {};

function getHaab(coeff, month) {
  const monthName = `${coeff} ${month}`;
  // const monthName = (typeof name === 'number') ? months[name] : name;
  if (singleton[monthName] === undefined) {
    singleton[monthName] = new Haab(coeff, month);
  }
  return singleton[monthName];
}

/**
 * Describes a Haab fullDate with a position and a month
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
   * @param {number|Wildcard|string} coeff - The position in the Haab month for this fullDate
   * @param {string|HaabMonth|Wildcard} month
   */
  constructor(coeff, month) {
    let newCoeff = coeff;
    if (coeff === '*') {
      newCoeff = wildcard;
    } else if (coeff !== wildcard) {
      newCoeff = parseInt(newCoeff, 10);
    }
    let newMonth = month;
    if (typeof month === 'string') {
      if (month === '*') {
        newMonth = wildcard;
      } else {
        newMonth = getHaabMonth(month);
        // newMonth = new HaabMonth(month);
      }
    }
    /**
     * @type {HaabMonth|Wildcard}
     */
    this.month = newMonth;
    /**
     * @type {number|Wildcard}
     */
    this.coeff = newCoeff;

    this.private_next = undefined;

    this.validate();
  }

  /**
   * Ensure the Haab's coefficients are within range and the month is defined
   * @return {boolean}
   */
  validate() {
    if (this.coeff > 19 || this.coeff < 0) {
      throw new Error('Haab\' coefficient must inclusively between 0 and 19.');
    }
    if (this.month === getHaabMonth('Wayeb') && this.coeff > 4) {
      throw new Error('Haab\' coefficient for Wayeb must inclusively between 0 and 4.');
    }
    if (this.month === undefined) {
      throw new Error('Haab\' month must be provided');
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
   * @param {Haab} newHaab
   * @return {boolean}
   */
  equal(newHaab) {
    return this === newHaab;
  }

  /**
   * Ensure this Haab object has a matching configuration as another Haab object.
   * Takes wildcards into account.
   * @param {Haab} newHaab
   * @return {boolean}
   */
  match(newHaab) {
    return (
      (this.coeff === wildcard || newHaab.coeff === wildcard)
        ? true
        : (this.coeff === newHaab.coeff)
    ) && (
      (this.month === wildcard || newHaab.month === wildcard)
        ? true
        : (this.name === newHaab.name)
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
   * @param {number} newIncremental
   */
  shift(newIncremental) {
    const incremental = newIncremental % 365;
    if (this.private_next === undefined) {
      if (incremental > 0) {
        const monthLength = (this.month === getHaabMonth(19)) ? 5 : 20;
        if (1 + this.coeff >= monthLength) {
          const newMonth = this.month.shift(1);
          this.private_next = getHaab(0, newMonth);
        } else {
          this.private_next = getHaab(this.coeff + 1, this.month);
        }
      } else {
        return this;
      }
    }
    if (incremental === 0) {
      return this;
    }
    return this.private_next.shift(incremental - 1);
  }

  /**
   * Render the Haab fullDate as a string
   * @returns {string}
   */
  toString(isNumeric) {
    if (isNumeric) {
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
      this.month,
    );
  }
}


module.exports = {
  getHaab,
  getHaabMonth,
};
