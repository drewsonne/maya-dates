import {Wildcard, isWildcard} from "../../wildcard";
import {Cycle} from "./cycle";
import {HashMap} from "../../structs/hashMap";

const months = [
  'Pop',
  'Wo',
  'Sip',
  'Sotz\'',
  'Sek',
  'Xul',
  'Yaxk\'in',
  'Mol',
  'Ch\'en',
  'Yax',
  'Sak',
  'Keh',
  'Mak',
  'K\'ank\'in',
  'Muwan',
  'Pax',
  'K\'ayab',
  'Kumk\'u',
  'Wayeb',
];

/**
 * Haab month component of a Calendar Round date.
 */
export class HaabMonth extends Cycle {
  /**
   * @param {string | number | Wildcard} value - Name or position of the Haab month
   */
  constructor(value: string | number | Wildcard) {
    super(
      value,
      new HashMap<string, number>(
        months.map((name, i) => [name, i]),
      ),
    );
  }

  /**
   * Return the next month in the cycle.
   * @return {HaabMonth}
   */
  next(): HaabMonth {
    return new HaabMonth(super.next().value);
  }

  /**
   * Ensure the Haab month name is valid.
   * @return {boolean}
   */
  validate(): boolean {
    if (!isWildcard(this.value)) {
      if (this.value === undefined) {
        throw new Error('Haab\' month name must be provided');
      }
      // Note: typeof check removed as it's unreachable - the Cycle constructor
      // ensures value is never undefined (throws error), and if it's not a Wildcard,
      // it must be a string by type definition
      if (!months.includes(this.value)) {
        throw new Error(`Haab' month (${this.value}) must be in ${months}`);
      }
    }
    return true
  }
}
