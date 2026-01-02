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
  /**
   * Tzolk'in epoch constants per spec [R1] §4.2:
   * The Long Count epoch (13.0.0.0.0) is Tzolk'in 4 Ajaw
   */
  private static readonly EPOCH_NUMBER = 4;
  private static readonly EPOCH_NAME_INDEX = 20; // Ajaw is day 20
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
   * Create a Tzolk'in date from a day number (days since epoch) using direct formula per [R1] §4.4.
   * 
   * Formula: 
   * - adjmod(x, n) = ((x − 1) mod n) + 1
   * - number = adjmod(d + tzEpochNumber, 13)
   * - nameIndex = adjmod(d + tzEpochName, 20)
   * 
   * @param {number} dayNumber - Days since epoch (MDN)
   * @return {Tzolkin}
   */
  static fromDayNumber(dayNumber: number): Tzolkin {
    // Adjusted modulus per spec [R1]: adjmod(x, n) = ((x − 1) mod n) + 1
    const adjMod = (x: number, n: number) => ((x - 1) % n) + 1;
    
    const number = adjMod(dayNumber + Tzolkin.EPOCH_NUMBER, 13);
    const nameIndex = adjMod(dayNumber + Tzolkin.EPOCH_NAME_INDEX, 20);
    
    return getTzolkin(
      new NumberCoefficient(number),
      new TzolkinDay(nameIndex)
    );
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
   * Shift this Tzolk'in date forward by a number of days using direct formula per [R1].
   * 
   * Uses the adjusted modulus formula from spec §4.3-4.4:
   * - adjmod(x, n) = ((x − 1) mod n) + 1
   * - number = adjmod(currentNumber + days, 13)
   * - nameIndex = adjmod(currentNameIndex + days, 20)
   * 
   * @param {Number} newIncremental - Number of days to shift forward
   * @return {Tzolkin}
   */
  shift(newIncremental: number): Tzolkin {
    if (
      !(isWildcard(this.day)) &&
      !(this.coeff instanceof WildcardCoefficient) &&
      this.coeff instanceof NumberCoefficient &&
      this.day instanceof TzolkinDay
    ) {
      const incremental = newIncremental % 260;
      if (incremental === 0) {
        return this;
      }
      
      // Direct formula per spec [R1] §4.4
      // adjmod(x, n) = ((x − 1) mod n) + 1
      const adjMod = (x: number, n: number) => ((x - 1) % n) + 1;
      
      const newCoeff = adjMod(this.coeff.value + incremental, 13);
      const newDayPosition = adjMod(this.day.position + incremental, 20);
      
      return getTzolkin(
        new NumberCoefficient(newCoeff),
        this.day.generator(newDayPosition) as TzolkinDay
      );
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

