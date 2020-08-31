/** @ignore */
import {TzolkinDay} from "./component/tzolkinDay";
import {Wildcard} from "../wildcard";
import NumberCoefficient from "./component/numberCoefficient";
import WildcardCoefficient from "./component/wildcardCoefficient";
import ICoefficient from "./component/iCoefficient"
import {IPart} from "../i-part";
import {Comment, isComment} from "../comment";
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
export class Tzolkin extends CommentWrapper implements IPart {
  day: TzolkinDay | Wildcard;
  coeff: ICoefficient;
  _privateNext: Tzolkin | null;

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
    this._privateNext = null;

    this.validate();
  }

  setComment(comment: Comment): Tzolkin {
    this.comment = comment
    return this;
  }

  appendComment(comment: Comment): Tzolkin {
    if (isComment(this.comment)) {
      this.comment = this.comment.merge(comment)
    } else {
      this.setComment(comment)
    }
    return this
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
      !(this.coeff instanceof WildcardCoefficient)
    ) {
      const incremental = newIncremental % 260;
      if (incremental === 0) {
        return this;
      }
      return this.privateNext.shift(incremental - 1);
    } else {
      throw new Error("Tzolkin must not have wildcards to shift")
    }
  }

  get privateNext(): Tzolkin {
    if (this._privateNext === null) {
      if (this.coeff instanceof NumberCoefficient) {
        let newCoeff = (this.coeff.value + 1) % 13;
        newCoeff = (newCoeff % 13) === 0 ? 13 : newCoeff;
        if (this.day instanceof TzolkinDay) {
          this._privateNext = getTzolkin(
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
    return this._privateNext
  }

  /**
   * Ensure this Tzolkin object has the same configuration as another Tzolkin
   * object. Does not take wildcards into account.
   * @param {Tzolkin} newTzolkin
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

