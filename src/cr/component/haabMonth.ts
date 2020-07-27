import HashMap from "../../structs/hashMap";
import {Cycle, singletonGenerator} from "./cycle";
import {Wildcard} from "../../wildcard";

const months: HashMap = new HashMap([
  undefined,
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
  'Wayeb'
]);

export const getHaabMonth = singletonGenerator<(HaabMonth | Wildcard)>(
  months,
  (name: string) => (name == '*') ? new Wildcard() : new HaabMonth(name)
);

/**
 * Describes only the month component of a Haab fullDate
 */
export class HaabMonth extends Cycle<(HaabMonth | Wildcard)> {

  /**
   * @param {string} raw - Name of the Haab month
   */
  constructor(raw: string | Wildcard) {
    super(raw, months, getHaabMonth);
  }

  /**
   * Ensure a Haab month name is defined, and that the month name is within the
   * set of allowable values.
   */
  validate(): boolean {
    if (!(this.value instanceof Wildcard)) {
      if (this.value === undefined) {
        throw new Error('Haab\' month name must be provided');
      }
      if (!months.includes(this.value)) {
        throw new Error(`Haab' month (${this.value}) must be in ${months}`);
      }
    }
    return true
  }
}
