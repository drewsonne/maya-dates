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
  /**
   * Haab' epoch constants per spec [R1] §3.2:
   * The Long Count epoch (13.0.0.0.0) is Haab' 8 Kumk'u
   */
  private static readonly EPOCH_DAY = 8;
  private static readonly EPOCH_MONTH_INDEX = 18; // Kumk'u is month 18
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
   * Create a Haab' date from a day number (days since epoch) using direct formula per [R1] §3.3.
   * 
   * Formula:
   * - H = (d + haabEpochDay + 20·(haabEpochMonth − 1)) mod 365
   * - monthIndex = ⌊H / 20⌋ + 1
   * - day = H mod 20
   * 
   * @param {number} dayNumber - Days since epoch (MDN)
   * @return {Haab}
   */
  static fromDayNumber(dayNumber: number): Haab {
    // Calculate day-of-year index per spec [R1] §3.3
    // Use ((x % n) + n) % n to ensure result is always in [0, n-1] for negative dayNumbers
    const H = ((dayNumber + Haab.EPOCH_DAY + 20 * (Haab.EPOCH_MONTH_INDEX - 1)) % 365 + 365) % 365;
    
    const monthIndex = Math.floor(H / 20) + 1;
    const day = H % 20;
    
    // Validate Wayeb' (month 19 only has days 0-4)
    if (monthIndex === 19 && day > 4) {
      throw new Error(`Invalid Haab' date: Wayeb' (month 19) only has days 0-4, got ${day}`);
    }
    
    return getHaab(
      new NumberCoefficient(day),
      getHaabMonth(monthIndex)
    );
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
   * Move this date through the Haab cycle using direct formula per [R1] §3.3.
   * 
   * Formula:
   * - H = (currentH + days) mod 365, where currentH is the day-of-year index
   * - monthIndex = ⌊H / 20⌋ + 1
   * - day = H mod 20
   * 
   * @param {number} numDays - Number of days to shift forward
   * @return {Haab}
   */
  shift(numDays: number): Haab {
    if (!isWildcard(this.month) && this.coeff instanceof NumberCoefficient && this.month instanceof HaabMonth) {
      const incremental = numDays % 365;
      if (incremental === 0) {
        return this;
      }

      // Calculate current day-of-year index
      const currentH = this.coeff.value + 20 * (this.month.position - 1);
      
      // Apply shift using direct formula per spec [R1] §3.3
      // Use ((x % n) + n) % n to ensure result is always in [0, n-1] for negative increments
      const newH = ((currentH + incremental) % 365 + 365) % 365;
      const newMonthIndex = Math.floor(newH / 20) + 1;
      const newDay = newH % 20;
      
      // Validate Wayeb' (month 19 only has days 0-4)
      if (newMonthIndex === 19 && newDay > 4) {
        throw new Error(`Invalid Haab' date: Wayeb' (month 19) only has days 0-4, got ${newDay}`);
      }
      
      return getHaab(
        new NumberCoefficient(newDay),
        getHaabMonth(newMonthIndex)
      );
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

