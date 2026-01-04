import {getTzolkin, Tzolkin} from './tzolkin';
import {getHaab, Haab} from './haab';
import DistanceNumber from '../lc/distance-number';
import {getHaabMonth, HaabMonth} from "./component/haabMonth";
import {getTzolkinDay, TzolkinDay, TzolkinDays} from "./component/tzolkinDay";
import NumberCoefficient from "./component/numberCoefficient";
import {isWildcard, Wildcard} from "../wildcard";
import WildcardCoefficient from "./component/wildcardCoefficient";
import {IPart} from '../i-part';
import {CommentWrapper} from "../comment-wrapper";

/** @ignore */
const singleton: { [key: string]: CalendarRound } = {};

/**
 * Return a comparable instance of a Calendar Round.
 */
export function getCalendarRound(
  tzolkin: Tzolkin,
  haab: Haab
): CalendarRound {
  const crId = `${tzolkin} ${haab}`;
  if (singleton[crId] === undefined) {
    singleton[crId] = new CalendarRound(tzolkin, haab);
  }
  return singleton[crId];
}

// @ts-ignore
/**
 * A combination of 260-day cycles and the Haab cycle. This class should not
 * be instantiated directly, and should be accessed through getCalendarRound.
 * @see {getCalendarRound}
 * @example
 *  let cr = new CalendarRound(4, "Ajaw", 8, "Kumk'u");
 */
export class CalendarRound extends CommentWrapper implements IPart {
  tzolkin: Tzolkin;
  haab: Haab;

  constructor(tzolkin: Tzolkin, haab: Haab) {
    super();
    /**
     * 260-day cycle component of the Calendar Round
     */
    this.tzolkin = tzolkin;
    /**
     * Haab cycle component of the Calendar Round
     */
    this.haab = haab;

    this.validate();
  }

  /**
   * Validate that the Calendar Round has a correct 260-day and Haab
   * configuration using both mathematical and enumeration checks.
   * 
   * Per spec [R7], a Calendar Round exists iff the full cycle residues satisfy:
   * r365 ≡ r260 (mod 5), where gcd(365, 260) = 5
   * 
   * @throws {Error} If the Calendar Round is invalid.
   */
  validate() {
    // First, perform mathematical compatibility check per spec [R7]
    // Calculate full cycle positions relative to the epoch
    if (this.haab.coeff instanceof NumberCoefficient && 
        this.tzolkin.coeff instanceof NumberCoefficient &&
        this.haab.month instanceof HaabMonth &&
        this.tzolkin.day instanceof TzolkinDay) {
      
      // Calculate which day of the year (0-364) this Haab' date represents
      const haabDayOfYear = this.haab.coeff.value + 20 * (this.haab.month.position - 1);
      
      // Haab' epoch is 8 Kumk'u. With standard Haab' ordering, Kumk'u has position = 18,
      // so the raw epoch position is: 8 + 20 * (18 - 1) = 348
      // haabDaysSinceEpoch is "days since 8 Kumk'u" modulo 365
      const HAAB_EPOCH_OFFSET = 8 + 20 * (18 - 1); // 348
      const haabDaysSinceEpoch = ((haabDayOfYear - HAAB_EPOCH_OFFSET) % 365 + 365) % 365;
      
      // Calculate tzolkinDayOfCycle: Which day of the 260-day cycle is this Tzolk'in date?
      // 
      // The Tzolk'in has two interlocking cycles: numbers 1-13 and 20 day names.
      // A given Tzolk'in date like "7 Manik'" appears only once every 260 days.
      // We need to find which position (0-259) in that 260-day cycle corresponds
      // to this particular number+day combination.
      //
      // Think of it like asking: "If we started counting from day 0, which day
      // number would have this specific number and day name together?"
      const tzolkinNumber = this.tzolkin.coeff.value; // 1-13
      const tzolkinDayIndex = this.tzolkin.day.position; // 1-20
      const tzolkinCoeffZeroBased = tzolkinNumber - 1; // Convert to 0-based for calculation
      const tzolkinDayZeroBased = tzolkinDayIndex - 1; // Convert to 0-based for calculation
      
      // Use a mathematical formula (Chinese Remainder Theorem) to solve:
      // "Which position d gives us this number (when divided by 13) and this day (when divided by 20)?"
      // The formula uses 17 because it's the magic number that makes the math work for 13 and 20
      const tzolkinDayOfCycle = (
        tzolkinCoeffZeroBased + 13 * (((17 * (tzolkinDayZeroBased - tzolkinCoeffZeroBased)) % 20 + 20) % 20)
      ) % 260;
      
      // Now calculate tzolkinDaysSinceEpoch: How many days since the Calendar Round origin date?
      //
      // The Maya Calendar Round starts at "4 Ajaw 8 Kumk'u" (the creation date).
      // tzolkinDaysSinceEpoch tells us: "How many days have passed in the Tzolk'in cycle since 4 Ajaw?"
      // 
      // For example:
      // - If this IS "4 Ajaw", tzolkinDaysSinceEpoch = 0 (zero days since 4 Ajaw)
      // - If this is "5 Imix" (the next day), tzolkinDaysSinceEpoch = 1 (one day since 4 Ajaw)
      // - If this is "3 Kawak" (the day before), tzolkinDaysSinceEpoch = 259 (going backwards wraps to 259)
      //
      // First, we calculate where "4 Ajaw" falls in the 260-day cycle (= 159)
      const TZOLKIN_EPOCH_OFFSET = 159; // The position of "4 Ajaw" in the 260-day cycle
      
      // Then subtract that offset to get days elapsed since the origin
      const tzolkinDaysSinceEpoch = ((tzolkinDayOfCycle - TZOLKIN_EPOCH_OFFSET) % 260 + 260) % 260;
      
      // Check mathematical compatibility: residues must match mod gcd(365, 260) = 5
      // Both haabDaysSinceEpoch and tzolkinDaysSinceEpoch are now measured from the same epoch day
      if (haabDaysSinceEpoch % 5 !== tzolkinDaysSinceEpoch % 5) {
        throw new Error(
          `Calendar Round compatibility failed: Haab' residue ${haabDaysSinceEpoch} (${this.haab}) ` +
          `and Tzolk'in residue ${tzolkinDaysSinceEpoch} (${this.tzolkin}) must satisfy ` +
          `${haabDaysSinceEpoch} ≡ ${tzolkinDaysSinceEpoch} (mod 5) per [R7]`
        );
      }
    }
    
    // Second, perform detailed enumeration check (original validation logic)
    // This provides more specific error messages for known day combinations
    let validHaabCoeffs: number[] = [];
    if ([
      TzolkinDays.KABAN, TzolkinDays.IK, TzolkinDays.MANIK, TzolkinDays.EB,
    ].map(d => `${d}`).includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [0, 5, 10, 15];
    } else if ([
      TzolkinDays.ETZ_NAB, TzolkinDays.AK_BAL, TzolkinDays.LAMAT, TzolkinDays.BEN,
    ].map(d => `${d}`).includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [1, 6, 11, 16];
    } else if ([
      TzolkinDays.KAWAK, TzolkinDays.K_AN, TzolkinDays.MULUK, TzolkinDays.IX,
    ].map(d => `${d}`).includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [2, 7, 12, 17];
    } else if ([
      TzolkinDays.AJAW, TzolkinDays.CHIKCHAN, TzolkinDays.OK, TzolkinDays.MEN,
    ].map(d => `${d}`).includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [3, 8, 13, 18];
    } else if ([
      TzolkinDays.IMIX, TzolkinDays.KIMI, TzolkinDays.CHUWEN, TzolkinDays.KIB,
    ].map(d => `${d}`).includes(`${this.tzolkin.day}`)) {
      validHaabCoeffs = [4, 9, 14, 19];
    } else {
      validHaabCoeffs = Array.from(Array(19).keys());
    }

    if (this.haab.coeff !== undefined) {
      if (!this.haab.coeff.isIn(validHaabCoeffs)) {
        throw new Error(
          `${this} should have Haab coeff in ${validHaabCoeffs} for day ${this.tzolkin.name}`
        );
      }
    }
  }


  /**
   * Increment both the Haab and 260-day cycle to the next day in the Calendar Round
   * @returns {CalendarRound}
   */
  next(): CalendarRound {
    return this.shift(1);
  }

  /**
   * Return a long count date representing the difference between two dates.
   */
  minus(targetCr: CalendarRound): DistanceNumber {
    /** @ignore */
    let foundOrigin: boolean = false;
    let foundTarget: boolean = false;
    let current: CalendarRound = this;
    let count: number = 0;
    let cycleCount: number = 0;
    let result: DistanceNumber | null = null;
    while (!foundTarget) {
      if (current === targetCr) {
        result = new DistanceNumber(
          foundOrigin
            ? -(18979 - cycleCount - count)
            : count,
        ).normalise();
        foundTarget = true;
      } else if (current === origin) {
        foundOrigin = true;
        cycleCount = count;
        count = 0;
      } else {
        count += 1;
      }
      current = current.next();
    }
    if (result instanceof DistanceNumber) {
      return result;
    } else {
      throw new Error("Could not assign a DistanceNumber")
    }
  }

  /**
   * Check that this Calendar Round matches another CalendarRound. If one CR has
   * wildcards and the other does not, this function will return true.
   */
  match(newCr: CalendarRound): boolean {
    return this.haab.match(newCr.haab) &&
      this.tzolkin.match(newCr.tzolkin);
  }

  /**
   * Shift a CalendarRound forward through time. Does not modify this
   * object and will return a new object.
   */
  shift(increment: number): CalendarRound {
    return getCalendarRound(
      this.tzolkin.shift(increment),
      this.haab.shift(increment)
    );
  }

  /**
   * Return true, if this function has any wildcard portions.
   */
  isPartial(): boolean {
    return isWildcard(this.tzolkin.day)
      || (this.tzolkin.coeff instanceof WildcardCoefficient)
      || isWildcard(this.haab.month)
      || (this.haab.coeff instanceof WildcardCoefficient);
  }

  /**
   * Render the CalendarRound cycle fullDate as a string
   */
  toString(): string {
    return `${this.tzolkin} ${this.haab}`;
  }

  equal(other: IPart): boolean {
    if (other instanceof CalendarRound) {
      return this === other
    }
    return false;
  }
}

/**
 * The Calendar Round base date: 4 Ajaw 8 Kumk'u.
 * 
 * This corresponds to the Maya creation-era base date 13.0.0.0.0 in the Long Count,
 * which serves as "day zero" (Maya Day Number (MDN) = 0) for all calendrical calculations per [R1, R2].
 * MDN is analogous to Julian Day Number, but for the Maya calendar system.
 * 
 * **Scholarly Rationale:**
 * - This epoch is explicitly documented in Reingold, Dershowitz, & Clamen (1993) [R1] and 
 *   Martin & Skidmore (2012) [R2] as the standard anchor for Maya calendar calculations
 * - The date represents the completion of the 13th bak'tun at the beginning of the 
 *   current era in Maya cosmology
 * - Using this epoch ensures compatibility with correlation constants (GMT family: 
 *   584283, 584285, 584286) which all anchor to this same date
 * 
 * **Alternative Epochs:**
 * While historical dates like royal coronations could theoretically serve as alternative
 * anchors, changing the epoch would:
 * 1. Break compatibility with all published correlation constants
 * 2. Require recalculation of all Haab'/Tzolk'in offset formulas
 * 3. Diverge from established scholarly practice
 * 
 * For these reasons, this implementation follows the standard epoch per academic literature.
 * 
 * @see Reingold, Dershowitz, & Clamen (1993) - Calendrical Calculations, II [R1]
 * @see Martin & Skidmore (2012) - Exploring the 584286 Correlation [R2]
 */
export const origin = getCalendarRound(
  getTzolkin(
    new NumberCoefficient(4), getTzolkinDay('Ajaw')),
  getHaab(
    new NumberCoefficient(8), getHaabMonth('Kumk\'u')
  )
);

