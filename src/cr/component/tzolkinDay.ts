import HashMap from "../../structs/hashMap";
import {Cycle, singletonGenerator} from "./cycle";
import {Wildcard} from "../../wildcard";

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

export const getTzolkinDay = singletonGenerator<(TzolkinDay | Wildcard)>(
  days,
  (name: string) => (name === '*') ? new Wildcard() : new TzolkinDay(name)
);

/**
 * Describes only the day component of a 260-day cycle
 */
export class TzolkinDay extends Cycle<(TzolkinDay|Wildcard)> {

  value: string | Wildcard;

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
}

