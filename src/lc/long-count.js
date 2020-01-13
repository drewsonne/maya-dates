/** @ignore */
const wildcard = require('../wildcard');
/** @ignore */
const origin = require('../cr/index').origin;
/** @ignore */
const FullDate = require('../full-date');
/** @ignore */
const night = require('./night/lord-of-night');

/**
 * Long Count cycle
 */
class LongCount {
  /**
   * @param {...number|Wildcard} cycles - Components in the long count
   * (eg, K'in, Winal, Bak'tun, etc)
   */
  constructor(...cycles) {
    /**
     * Date Components
     * @type {number|Wildcard[]}
     */
    this.parts = cycles;

    /**
     * Pattern to validate the fullDate
     * @type {RegExp}
     */
    this.date_pattern = /([\d*]+\.?)+/;

    /**
     * Convert individual components to a single string
     * @type {string}
     */
    // this.raw = this.toString();
  }

  /**
   * Given two long count dates, check if they are equal
   * @param {LongCount} other
   * @return {boolean}
   */
  equal(other) {
    return `${this}` === `${other}`;
  }

  /**
   * Create a copy object of this long count fullDate
   * @returns {LongCount}
   */
  clone() {
    return new LongCount(...this.parts);
  }

  /**
   * Get specific column in Long Count fullDate
   * @param {number} index
   * @returns {number}
   */
  getDateSections(index) {
    const part = this.parts[index];
    if (part === undefined) {
      return 0;
    }
    return part;
  }

  /**
   * Set specific column in Long Count fullDate
   * @param {number} index
   * @param {number|wildcard} value
   * @returns {LongCount}
   */
  setDateSections(index, newValue) {
    this.parts[index] = (newValue !== wildcard) ? newValue : parseInt(newValue, 10);
    // this.raw = this.toString();
    return this;
  }

  /**
   * Return the number of positions in the long count
   * @returns {number}
   */
  get length() {
    return this.parts.length;
  }

  /**
   * Pass the filter down to the parts
   * @param fn
   * @return {T[]}
   */
  filter(fn) {
    return this.parts.filter(fn);
  }

  /**
   * Pass the map down to the parts
   * @param fn
   * @return {unknown[]}
   */
  map(fn) {
    return this.parts.map(fn);
  }

  /**
   * Set the k'in component of the fullDate
   * @returns {number}
   */
  set kIn(newKIn) {
    this.setDateSections(0, newKIn);
  }

  /**
   * Return the k'in component of the fullDate
   * @returns {number}
   */
  get kIn() {
    return this.getDateSections(0);
  }

  /**
   * Set the winal component of the fullDate
   * @returns {number}
   */
  set winal(newWinal) {
    this.setDateSections(1, newWinal);
  }

  /**
   * Return the winal component of the fullDate
   * @returns {number}
   */
  get winal() {
    return this.getDateSections(1);
  }

  /**
   * Set the tun component of the fullDate
   * @returns {number}
   */
  set tun(newTun) {
    this.setDateSections(2, newTun);
  }

  /**
   * Return the tun component of the fullDate
   * @returns {number}
   */
  get tun() {
    return this.getDateSections(2);
  }

  /**
   * Set the k'atun component of the fullDate
   * @returns {number}
   */
  set kAtun(newKAtun) {
    this.setDateSections(3, newKAtun);
  }

  /**
   * Return the k'atun component of the fullDate
   * @returns {number}
   */
  get kAtun() {
    return this.getDateSections(3);
  }

  /**
   * Set the bak'tun component of the fullDate
   * @returns {number}
   */
  set bakTun(newBakTun) {
    this.setDateSections(4, newBakTun);
  }

  /**
   * Return the bak'tun component of the fullDate
   * @returns {number}
   */
  get bakTun() {
    return this.getDateSections(4);
  }

  /**
   * Set the piktun component of the fullDate
   * @returns {number}
   */
  set piktun(newBakTun) {
    this.setDateSections(5, newBakTun);
  }

  /**
   * Return the piktun component of the fullDate
   * @returns {number}
   */
  get piktun() {
    return this.getDateSections(5);
  }

  /**
   * Set the kalabtun component of the fullDate
   * @returns {number}
   */
  set kalabtun(newBakTun) {
    this.setDateSections(6, newBakTun);
  }

  /**
   * Return the kalabtun component of the fullDate
   * @returns {number}
   */
  get kalabtun() {
    return this.getDateSections(6);
  }

  /**
   * Set the kinchiltun component of the fullDate
   * @returns {number}
   */
  set kinchiltun(newBakTun) {
    this.setDateSections(7, newBakTun);
  }

  /**
   * Return the kinchiltun component of the fullDate
   * @returns {number}
   */
  get kinchiltun() {
    return this.getDateSections(7);
  }

  /**
   *
   * @return {any}
   */
  get lordOfNight() {
    return night.get(
      `G${((this.getPosition() - 1) % 9) + 1}`,
    );
  }

  /**
   * Ensure the fullDate has only numbers and wildcards separated by points.
   * @returns {boolean}
   */
  isValid() {
    return this.date_pattern.test(this.toString());
  }

  /**
   * Returns true if any of the positions in the Long Count have been assigned
   * a {Wildcard} object.
   * @return {boolean}
   */
  isPartial() {
    return this.parts.some((part) => part === wildcard);
  }

  /**
   * Count the number of days since 0.0.0.0.0 for this LC.
   * @return {number}
   */
  getPosition() {
    if (this.isPartial()) {
      throw new Error('Can not get position of fullDate dates');
    }
    return this.kIn
      + this.winal * 20
      + this.tun * 360
      + this.kAtun * 7200
      + this.bakTun * 144000
      + this.piktun * 2880000
      + this.kalabtun * 57600000
      + this.kinchiltun * 1152000000;
  }

  /**
   *
   * @return {CalendarRound}
   */
  buildCalendarRound() {
    return origin.shift(
      this.getPosition(),
    );
  }

  /**
   *
   * @return {FullDate}
   */
  buildFullDate() {
    return new FullDate(
      this.buildCalendarRound(),
      this.clone(),
    );
  }

  /**
   * Convert the LongCount to a string and pad the sections of the fullDate
   * @returns {string}
   */
  toString() {
    let significantDigits = [];
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const part = this.parts[i];
      if (part !== 0) {
        significantDigits = this.parts.slice(0, i + 1).reverse();
        break;
      }
    }

    for (let i = 0; i < significantDigits.length; i++) {
      if (significantDigits[i] === undefined) {
        significantDigits[i] = '0';
      }
    }

    const dateLength = significantDigits.length;
    if (dateLength < 5) {
      significantDigits = significantDigits.reverse();
      for (let i = 0; i < 5 - dateLength; i++) {
        significantDigits.push(' 0');
      }
      significantDigits = significantDigits.reverse();
    }

    for (let i = 0; i < significantDigits.length; i++) {
      const part = significantDigits[i].toString();
      if (part.length < 2) {
        significantDigits[i] = ` ${part}`;
      }
    }
    return significantDigits.join('.');
  }
}

module.exports = LongCount;
