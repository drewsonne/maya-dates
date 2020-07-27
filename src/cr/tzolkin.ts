/** @ignore */
import {TzolkinDay} from "./component/tzolkinDay";
import {Wildcard} from "../wildcard";
import NumberCoefficient from "./component/numberCoefficient";

const singleton: { [key: string]: Tzolkin } = {};

/**
 * Return a comparable instance of a Tzolkin date.
 * @param {number} coeff
 * @param {TzolkinDay|string} day
 * @return {Tzolkin}
 */
export function getTzolkin(coeff: ICoefficient, day: TzolkinDay | Wildcard): Tzolkin {
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
  day: TzolkinDay | Wildcard;
  coeff: ICoefficient;
  privateNext: Tzolkin;

  /**
   * Constructor
   * @param {number} newCoeff - The position in the 260-day cycle
   * @param {string|TzolkinDay} newDay
   */
  constructor(newCoeff: ICoefficient, newDay: TzolkinDay | Wildcard) {
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
    this.coeff.validate()
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
        if (this.coeff instanceof NumberCoefficient) {
          let newCoeff = (this.coeff.value + 1) % 13;
          newCoeff = (newCoeff % 13) === 0 ? 13 : newCoeff;
          this.privateNext = getTzolkin(
            new NumberCoefficient(newCoeff),
            (this.day.shift(1) as TzolkinDay)
          );
        } else {
          throw new Error('this.coeff is not a NumberCoefficient')
        }
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
  equal(newTzolkin: Tzolkin) {
    return (this.coeff.equal(newTzolkin.coeff))
      && (this.name === newTzolkin.name);
  }

  /**
   * Ensure this Tzolkin object has a matching configuration as another Tzolkin
   * object. Takes wildcards into account.
   * @param {Tzolkin} newTzolkin
   * @return {boolean}
   */
  match(newTzolkin: Tzolkin): boolean {
    if (this === newTzolkin) {
      return true;
    }
    return (
      this.coeff.match(newTzolkin.coeff)
    ) && (
      (this.day instanceof Wildcard || newTzolkin.day instanceof Wildcard)
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

