/** @ignore */
import {getHaabMonth, HaabMonth} from "./component/haabMonth";
import {Wildcard} from "../wildcard";
import NumberCoefficient from "./component/numberCoefficient";
import {coefficientParser as _} from "./component/coefficient";

const singleton: { [key: string]: Haab } = {};

/**
 * Return a comparable HaabMonth instantiation.
 * @param {number} coeff
 * @param {HaabMonth|string} month
 * @return {Haab}
 */
export function getHaab(coeff: ICoefficient, month: Wildcard | HaabMonth): Haab {
  const monthName = `${coeff} ${month}`;
  // const monthName = (typeof name === 'number') ? months[name] : name;
  if (singleton[monthName] === undefined) {
    // eslint-disable-next-line no-use-before-define
    const newMonth = (typeof month === 'string') ? getHaabMonth(month) : month;
    singleton[monthName] = new Haab(coeff, newMonth);
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
export class Haab {
  coeff: ICoefficient;
  month: Wildcard | HaabMonth;
  privateNext: Haab;

  /**
   * Constructor
   * @param {number|Wildcard|string} coeff - The position in the Haab month for this date
   * @param {string|HaabMonth|Wildcard} month
   */
  constructor(coeff: ICoefficient, month: Wildcard | HaabMonth) {
    /**
     * @type {HaabMonth|Wildcard}
     */
    this.month = month;
    /**
     * @type {number|Wildcard}
     */
    this.coeff = coeff;

    /**
     * Lazy loaded instance of the next Haab date in the cycle
     * @type {Haab}
     */
    this.privateNext = undefined;

    this.validate();
  }

  /**
   * Ensure the Haab's coefficients are within range and the month is defined
   * @return {boolean}
   */
  validate() {
    if (this.coeff instanceof NumberCoefficient) {
      if (this.coeff.value > 19 || this.coeff.value < 0) {
        throw new Error('Haab\' coefficient must inclusively between 0 and 19.');
      }
      if (this.coeff.value > 4 && this.month === getHaabMonth('Wayeb')) {
        throw new Error('Haab\' coefficient for Wayeb must inclusively between 0 and 4.');
      }
    }

    if (this.month === undefined) {
      throw new Error('Haab\' month must be provided');
    }
    if (!(this.month instanceof Wildcard)) {
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
   */
  equal(otherHaab: Haab): boolean {
    return this === otherHaab;
  }

  /**
   * Ensure this Haab object has a matching configuration as another Haab object.
   * Takes wildcards into account.
   */
  match(otherHaab: Haab): boolean {
    return (
      this.coeff.match(otherHaab.coeff)
    ) && (
      (this.month instanceof Wildcard || otherHaab.month instanceof Wildcard)
        ? true
        : (this.name === otherHaab.name)
    );
  }

  /**
   * Return a string representation of the Haab month name
   * @returns {string|Wildcard}
   */
  get name(): string {
    return `${this.month}`;
  }

  /**
   * Move this date through the Haab cycle.
   * @param {number} numDays
   * @return {Haab}
   */
  shift(numDays: number): Haab {
    if (
      !(this.month instanceof Wildcard)
    ) {
      if (this.coeff instanceof NumberCoefficient) {
        const incremental = numDays % 365;
        if (incremental === 0) {
          return this;
        }
        if (this.privateNext === undefined) {
          const monthLength = (this.month === getHaabMonth(19)) ? 5 : 20;
          if (1 + this.coeff.value >= monthLength) {
            const newMonth = this.month.shift(1);
            this.privateNext = getHaab(_(0), newMonth);
          } else {
            this.privateNext = getHaab(this.coeff.increment(), this.month);
          }
        }
        return this.privateNext.shift(incremental - 1);
      } else {
        throw new Error("Coefficient is not an integer")
      }
    } else {
      throw new Error("Can not shift Haab date with wildcard")
    }
  }

  get coeffValue(): Wildcard | number {
    if (this.coeff instanceof NumberCoefficient) {
      return this.coeff.value
    }
    return this.coeff
  }

  /**
   * Render the Haab fullDate as a string
   * @returns {string}
   */
  toString() {
    return `${this.coeffValue} ${this.name}`;
  }
}
