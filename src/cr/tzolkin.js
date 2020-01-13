/** @ignore */
const wildcard = require('../wildcard');
const getTzolkinDay = require('./tzolkin-day');

const singleton = {};

function getTzolkin(coeff, day) {
  const monthName = `${coeff} ${day}`;
  // const monthName = (typeof name === 'number') ? months[name] : name;
  if (singleton[monthName] === undefined) {
    singleton[monthName] = new Tzolkin(coeff, day);
  }
  return singleton[monthName];
}

/**
 * Describes a fullDate in the 260-day cycle with a position and a day
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
  constructor(newCoeff, newDay) {
    let coeff = newCoeff;
    if (coeff !== undefined) {
      if (coeff === '*') {
        coeff = wildcard;
      } else if (coeff !== wildcard) {
        coeff = parseInt(coeff, 10);
      }
    }
    let day = newDay;
    if (day !== undefined) {
      if (typeof day === 'string') {
        if (day === '*') {
          day = wildcard;
        } else {
          day = getTzolkinDay(day);
        }
      }
    }
    /**
     * @type {TzolkinDay}
     */
    this.day = day;
    /**
     * @type {number}
     */
    this.coeff = coeff;

    this.private_next = undefined;

    this.validate();
  }

  /**
   * Return the next day in the 260-day cycle
   * @returns {Tzolkin}
   */
  next() {
    return this.shift(1);
  }

  /**
   * Ensure the Tzolkin's coefficients are within range and the day is defined
   * @return {boolean}
   */
  validate() {
    if (this.coeff > 13 || this.coeff < 1) {
      throw new Error('Tzolk\'in coefficient must inclusively between 1 and 13.');
    }
    if (this.day === undefined) {
      throw new Error('Tzolk\'in day must be provided');
    }
    if (this.day !== wildcard) {
      this.day.validate();
    }
    return true;
  }

  /**
   *
   * @param {Number} incremental
   * @return {Tzolkin}
   */
  shift(newIncremental) {
    const incremental = newIncremental % 260;
    if (this.private_next === undefined) {
      let newCoeff = (this.coeff + 1) % 13;
      newCoeff = (newCoeff % 13) === 0 ? 13 : newCoeff;
      const newDay = this.day.shift(1);
      this.private_next = getTzolkin(newCoeff, newDay);
    }
    if (incremental === 0) {
      return this;
    }
    return this.private_next.shift(incremental - 1);
  }

  /**
   * Ensure this Tzolkin object has the same configuration as another Tzolkin
   * object. Does not take wildcards into account.
   * @param {Tzolkin} newTzolkin
   * @return {boolean}
   */
  equal(newTzolkin) {
    return (this.coeff === newTzolkin.coeff)
      && (this.name === newTzolkin.name);
  }

  /**
   * Ensure this Tzolkin object has a matching configuration as another Tzolkin
   * object. Takes wildcards into account.
   * @param {Tzolkin} newTzolkin
   * @return {boolean}
   */
  match(newTzolkin) {
    if (this === newTzolkin) {
      return true;
    }
    return (
      (this.coeff === wildcard || newTzolkin.coeff === wildcard)
        ? true
        : (this.coeff === newTzolkin.coeff)
    ) && (
      (this.day === wildcard || newTzolkin.day === wildcard)
        ? true
        : (this.name === newTzolkin.name)
    );
  }

  /**
   * Return a string representation of the 260-day cycle name
   * @returns {string}
   */
  get name() {
    if (this.day === wildcard) {
      return this.day;
    }
    return this.day.name;
  }

  /**
   * Render the 260-day cycle fullDate as a string
   * @returns {string}
   */
  toString(isNumeric) {
    if (isNumeric) {
      return `${this.coeff}:${this.day.day_position}`;
    }
    return `${this.coeff} ${this.name}`;
  }
}


module.exports = {
  getTzolkinDay,
  getTzolkin,
};
