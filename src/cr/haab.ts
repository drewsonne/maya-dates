/** @ignore */
import {getHaabMonth, HaabMonth, HaabMonths} from "./component/haabMonth";
import {isWildcard, Wildcard} from "../wildcard";
import NumberCoefficient from "./component/numberCoefficient";
import {coefficientParser as _} from "./component/coefficient";
import ICoefficient from "./component/iCoefficient";
import {IPart} from "../i-part";
import {CommentWrapper} from "../comment-wrapper";

const singleton: { [key: string]: Haab } = {};

/**
 * Return a comparable HaabMonth instantiation.
 * @param {number} coeff
 * @param {HaabMonth|string} month
 * @return {Haab}
 */
export function getHaab(coeff: ICoefficient, month: Wildcard | HaabMonth): Haab {
  const monthName = `${coeff} ${month}`;
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
export class Haab extends CommentWrapper implements IPart {
  coeff: ICoefficient;
  month: Wildcard | HaabMonth;
  private nextHolder: null | Haab;

  /**
   * Constructor
   * @param {number|Wildcard|string} coeff - The position in the Haab month for this date
   * @param {string|HaabMonth|Wildcard} month
   */
  constructor(coeff: ICoefficient, month: Wildcard | HaabMonth) {
    super();
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
    this.nextHolder = null;

    this.validate();
  }

  /**
   * Ensure the Haab's coefficients are within range and the month is defined
   * @return {boolean}
   */
  validate(): boolean {
    if (this.coeff instanceof NumberCoefficient) {
      if (this.coeff.value > 19 || this.coeff.value < 0) {
        throw new Error('Haab\' coefficient must inclusively between 0 and 19.');
      }
      if (this.month === getHaabMonth(HaabMonths.WAYEB)) {
        if (this.coeff.value > 4) {
          throw new Error('Haab\' coefficient for Wayeb must inclusively between 0 and 4.');
        }
      }
    }

    if (this.month === undefined) {
      throw new Error('Haab\' month must be provided');
    }
    if (!(isWildcard(this.month))) {
      this.month.validate();
    }

    return true;
  }

  /**
   * Return the next day in the Haab cycle
   * @returns {Haab}
   */
  next(): Haab {
    return this.shift(1);
  }

  /**
   * Ensure this Haab object has a matching configuration as another Haab object.
   * Takes wildcards into account.
   */
  match(otherHaab: Haab): boolean {
    return (
      this.coeff.match(otherHaab.coeff)
    ) && (
      (isWildcard(this.month) || isWildcard(otherHaab.month))
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
    if (!isWildcard(this.month)) {
      if (this.coeff instanceof NumberCoefficient) {
        const incremental = numDays % 365;
        if (incremental === 0) {
          return this;
        }

        return this.nextCalculator().shift(incremental - 1);
      } else {
        throw new Error("Coefficient is not an integer")
      }
    } else {
      throw new Error("Can not shift Haab date with wildcard")
    }
  }

  private nextCalculator(): Haab {
    if (this.nextHolder === null) {
      const wayeb = getHaabMonth(19)
      const isWayeb = this.month === wayeb
      const monthLength = (isWayeb) ? 5 : 20;
      if (this.coeff instanceof NumberCoefficient) {
        if (1 + this.coeff.value >= monthLength) {
          if (this.month instanceof HaabMonth) {
            const newMonth = this.month.shift(1);
            if (newMonth instanceof HaabMonth) {
              this.nextHolder = getHaab(_(0), newMonth);
            } else {
              throw new Error("Unexpected HaabMonth type")
            }
          } else {
            throw new Error("Month must not be wildcard to shift")
          }
        } else {
          this.nextHolder = getHaab(this.coeff.increment(), this.month);
        }
      } else {
        throw new Error("Month Coefficient must not be a wildcard to shift")
      }
    }
    return this.nextHolder
  }

  /**
   * Render the Haab fullDate as a string
   * @returns {string}
   */
  toString() {
    return `${this.coeff} ${this.name}`;
  }

  equal(other: IPart): boolean {
    if (other instanceof Haab) {
      return other === this
    }
    return false;
  }
}

