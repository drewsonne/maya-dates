import HashMap from "../../structs/hashMap";
import {Wildcard} from "../../wildcard";
import Cycle from "./cycle";

const days: HashMap = new HashMap([
  undefined,
  'Imix',
  'Ik\'',
  'Ak\'bal',
  'K\'an',
  'Chikchan',
  'Kimi',
  'Manik\'',
  'Lamat',
  'Muluk',
  'Ok',
  'Chuwen',
  'Eb',
  'Ben',
  'Ix',
  'Men',
  'Kib',
  'Kaban',
  'Etz\'nab',
  'Kawak',
  'Ajaw',
]);


export function getTzolkinDay(name: string | number | Wildcard): (TzolkinDay | Wildcard) {
  const singleton: { [key: string]: TzolkinDay } = {};

  let cycleName = (typeof name === 'number') ? days.getValue(name) : name;
  const cycleNameHash = `${cycleName}`;
  if (cycleNameHash === '*') {
    return new Wildcard()
  }
  if (singleton[cycleNameHash] === undefined) {
    singleton[cycleNameHash] = new TzolkinDay(name)
  }
  return singleton[cycleNameHash];
}

/**
 * Describes only the day component of a 260-day cycle
 */
export class TzolkinDay extends Cycle {

  /**
   * @param {string|number} newName - Name or position of the 260-day cycle day
   */
  constructor(newName: number | string | Wildcard) {
    super(newName, days, getTzolkinDay);
  }

  /**
   * Ensure the Tzolk'in day name is defined and is within the list of
   * acceptable day names.
   */
  validate() {
    if (this.value === undefined) {
      throw new Error('Tzolk\'in day name must be provided');
    }
    if (typeof this.value === 'string') {
      if (!days.includes(this.value)) {
        throw new Error(`Tzolk'in day (${this.value}) must be in ${days}`);
      }
    }
    return true
  }

  equal(otherDay: any) {
    return otherDay === this
  }
}

