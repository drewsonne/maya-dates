/** @ignore */
import {TzolkinDay} from "./component/tzolkinDay";
import Coefficient from "./component/coefficient";
import {Wildcard} from "../wildcard";

const singleton: { [key: string]: Tzolkin } = {};

/**
 * Return a comparable instance of a Tzolkin date.
 * @param {number} coeff
 * @param {TzolkinDay|string} day
 * @return {Tzolkin}
 */
export function getTzolkin(coeff: number | Wildcard, day: TzolkinDay): Tzolkin {
  const monthName = `${coeff} ${day}`;
  // const monthName = (typeof name === 'number') ? months[name] : name;
  if (singleton[monthName] === undefined) {
    // eslint-disable-next-line no-use-before-define
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
export class Tzolkin {
  day: TzolkinDay;
  coeff: Coefficient;
  privateNext: Tzolkin;

  /**
   * Constructor
   * @param {number} newCoeff - The position in the 260-day cycle
   * @param {string|TzolkinDay} newDay
   */
  constructor(newCoeff: number | Wildcard, newDay: TzolkinDay) {
    /**
     * @type {TzolkinDay}
     */
    this.day = newDay;
    /**
     * @type {number}
     */
    this.coeff = newCoeff;

    /**
     * Lazy loaded instance of the next Tzolkin date in the cycle
     * @type {Tzolkin}
     */
    this.privateNext = undefined;

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
    if (!(this.day instanceof Wildcard)) {
      this.day.validate();
    }
    return true;
  }

  /**
   *
   * @param {Number} newIncremental
   * @return {Tzolkin}
   */
  shift(newIncremental: number): Tzolkin {
    if (
      !(this.day instanceof Wildcard) &&
      !(this.coeff instanceof Wildcard)
    ) {
      const incremental = newIncremental % 260;
      if (this.privateNext === undefined) {
        let newCoeff = (this.coeff.value + 1) % 13;
        newCoeff = (newCoeff % 13) === 0 ? 13 : newCoeff;
        this.privateNext = getTzolkin(
          new Coefficient(newCoeff),
          (this.day.shift(1) as TzolkinDay)
        );
      }
      if (incremental === 0) {
        return this;
      }
      return this.privateNext.shift(incremental - 1);
    }
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
  get name(): string | Wildcard {
    if (this.day instanceof Wildcard) {
      return this.day;
    }
    return `${this.day}`;
  }

  /**
   * Render the 260-day cycle fullDate as a string
   * @returns {string}
   */
  toString() {
    return `${this.coeff} ${this.name}`;
  }
}

