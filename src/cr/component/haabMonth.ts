import HashMap from "../../structs/hashMap";
import {Wildcard} from "../../wildcard";
import Cycle from "./cycle";

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


export function getHaabMonth(newCycleName: (string | number | Wildcard)): (HaabMonth | Wildcard) {
  const singleton: { [key: string]: (HaabMonth | Wildcard) } = {};

  if (typeof newCycleName === "number" || typeof newCycleName === "string") {

    let cycleName = (typeof newCycleName === 'number') ? months.getValue(newCycleName) : newCycleName;
    const cycleNameHash = `${cycleName}`;
    if (singleton[cycleNameHash] === undefined) {
      singleton[cycleNameHash] = (cycleNameHash == '*') ? new Wildcard() : new HaabMonth(cycleNameHash)
    }

    return singleton[cycleNameHash];
  } else {
    return newCycleName
  }
}

/**
 * Describes only the month component of a Haab fullDate
 */
export class HaabMonth extends Cycle {

  /**
   * @param {string} raw - Name of the Haab month
   */
  constructor(raw: string | Wildcard) {
    super(raw, months, getHaabMonth);
    this.validate()
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

  equal(otherMonth: any): boolean {
    return this.position === otherMonth.position
  }
}
