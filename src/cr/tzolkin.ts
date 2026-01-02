/** @ignore */
import {TzolkinDay} from "./component/tzolkinDay";
import {isWildcard, Wildcard} from "../wildcard";
import NumberCoefficient from "./component/numberCoefficient";
import WildcardCoefficient from "./component/wildcardCoefficient";
import ICoefficient from "./component/iCoefficient"
import {IPart} from "../i-part";
import {CommentWrapper} from "../comment-wrapper";

const singleton: { [key: string]: Tzolkin } = {};

/**
 * Return a comparable instance of a Tzolkin date.
 * @param {number} coeff
 * @param {TzolkinDay|string} day
 * @return {Tzolkin}
 */
export function getTzolkin(coeff: ICoefficient, day: TzolkinDay | Wildcard): Tzolkin {
  const monthName = `${coeff} ${day}`;
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
export class Tzolkin extends CommentWrapper implements IPart {
  day: TzolkinDay | Wildcard;
  coeff: ICoefficient;
  private nextHolder: Tzolkin | null;

  /**
   * Constructor
   * @param {number} newCoeff - The position in the 260-day cycle
   * @param {string|TzolkinDay} newDay
   */
  constructor(newCoeff: ICoefficient, newDay: TzolkinDay | Wildcard) {
    super();
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
    this.nextHolder = null;

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
    // Validate Tzolk'in coefficient range (1-13) per spec [R1]
    if (this.coeff instanceof NumberCoefficient) {
      if (this.coeff.value > 13 || this.coeff.value < 1) {
        throw new Error('Tzolk\'in coefficient must be between 1 and 13 inclusive.');
      }
    }
    
    if (this.day === undefined) {
      throw new Error('Tzolk\'in day must be provided');
    }
    if (!isWildcard(this.day)) {
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
      !(isWildcard(this.day)) &&
      !(this.coeff instanceof WildcardCoefficient)
    ) {
      const incremental = newIncremental % 260;
      if (incremental === 0) {
        return this;
      }
      return this.nextCalculator().shift(incremental - 1);
    } else {
      throw new Error("Tzolkin must not have wildcards to shift")
    }
  }

  nextCalculator(): Tzolkin {
    if (this.nextHolder === null) {
      if (this.coeff instanceof NumberCoefficient) {
        let newCoeff = (this.coeff.value + 1) % 13;
        newCoeff = (newCoeff % 13) === 0 ? 13 : newCoeff;
        if (this.day instanceof TzolkinDay) {
          this.nextHolder = getTzolkin(
            new NumberCoefficient(newCoeff),
            (this.day.shift(1) as TzolkinDay)
          );
        } else {
          throw new Error("this.day must be a TzolkinDay to shift")
        }
      } else {
        throw new Error('this.coeff is not a NumberCoefficient')
      }
    }
    return this.nextHolder
  }

  /**
   * Ensure this Tzolkin object has the same configuration as another Tzolkin
   * object. Does not take wildcards into account.
   * @param {Tzolkin} other
   * @return {boolean}
   */
  equal(other: IPart): boolean {
    if (other instanceof Tzolkin) {
      return this === other
    }
    return false;
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
      (isWildcard(this.day) || isWildcard(newTzolkin.day))
        ? true
        : (this.name === newTzolkin.name)
    );
  }

  /**
   * Return a string representation of the 260-day cycle name
   * @returns {string}
   */
  get name(): string | Wildcard {
    if (isWildcard(this.day)) {
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

