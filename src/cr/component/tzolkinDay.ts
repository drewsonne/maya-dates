import HashMap from "../../structs/hashMap";
import {Wildcard} from "../../wildcard";
import Cycle from "./cycle";

export enum TzolkinDays {
  IMIX = 'Imix',
  IK = 'Ik\'',
  AK_BAL = 'Ak\'bal',
  K_AN = 'K\'an',
  CHIKCHAN = 'Chikchan',
  KIMI = 'Kimi',
  MANIK = 'Manik\'',
  LAMAT = 'Lamat',
  MULUK = 'Muluk',
  OK = 'Ok',
  CHUWEN = 'Chuwen',
  EB = 'Eb',
  BEN = 'Ben',
  IX = 'Ix',
  MEN = 'Men',
  KIB = 'Kib',
  KABAN = 'Kaban',
  ETZ_NAB = 'Etz\'nab',
  KAWAK = 'Kawak',
  AJAW = 'Ajaw',
}

const days: HashMap = new HashMap([
  undefined,
  TzolkinDays.IMIX,
  TzolkinDays.IK,
  TzolkinDays.AK_BAL,
  TzolkinDays.K_AN,
  TzolkinDays.CHIKCHAN,
  TzolkinDays.KIMI,
  TzolkinDays.MANIK,
  TzolkinDays.LAMAT,
  TzolkinDays.MULUK,
  TzolkinDays.OK,
  TzolkinDays.CHUWEN,
  TzolkinDays.EB,
  TzolkinDays.BEN,
  TzolkinDays.IX,
  TzolkinDays.MEN,
  TzolkinDays.KIB,
  TzolkinDays.KABAN,
  TzolkinDays.ETZ_NAB,
  TzolkinDays.KAWAK,
  TzolkinDays.AJAW,
]);

const singleton: { [key: string]: TzolkinDay } = {};

export function getTzolkinDay(name: string | number | Wildcard): (TzolkinDay | Wildcard) {

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

}

