import {Wildcard, isWildcard} from "../../wildcard";
import Cycle from "./cycle";
import HashMap from "../../structs/hashMap";
import {getI18nManager} from "../../i18n/i18n-manager";
import {Locale} from "../../i18n/types";

export enum HaabMonths {
  POP = 'Pop',
  WO = 'Wo',
  SIP = 'Sip',
  SOTZ = 'Sotz\'',
  SEK = 'Sek',
  XUL = 'Xul',
  YAXK_IN = 'Yaxk\'in',
  MOL = 'Mol',
  CH_EN = 'Ch\'en',
  YAX = 'Yax',
  SAK = 'Sak',
  KEH = 'Keh',
  MAK = 'Mak',
  K_ANK_IN = 'K\'ank\'in',
  MUWAN = 'Muwan',
  PAX = 'Pax',
  K_AYAB = 'K\'ayab',
  KUMK_U = 'Kumk\'u',
  WAYEB = 'Wayeb'
}

const months: HashMap = new HashMap([
  undefined,
  HaabMonths.POP,
  HaabMonths.WO,
  HaabMonths.SIP,
  HaabMonths.SOTZ,
  HaabMonths.SEK,
  HaabMonths.XUL,
  HaabMonths.YAXK_IN,
  HaabMonths.MOL,
  HaabMonths.CH_EN,
  HaabMonths.YAX,
  HaabMonths.SAK,
  HaabMonths.KEH,
  HaabMonths.MAK,
  HaabMonths.K_ANK_IN,
  HaabMonths.MUWAN,
  HaabMonths.PAX,
  HaabMonths.K_AYAB,
  HaabMonths.KUMK_U,
  HaabMonths.WAYEB
]);

const singleton: { [key: string]: (HaabMonth | Wildcard) } = {};

export function getHaabMonth(newCycleName: (string | number | Wildcard)): (HaabMonth | Wildcard) {
  if (typeof newCycleName === "number" || typeof newCycleName === "string") {
    let cycleName = (typeof newCycleName === 'number') ? months.getValue(newCycleName) : newCycleName;
    
    // Normalize using i18n if it's a string
    if (typeof cycleName === 'string') {
      cycleName = getI18nManager().normalizeHaabMonth(cycleName);
    }
    
    const cycleNameHash = `${cycleName}`;
    if (singleton[cycleNameHash] === undefined) {
      singleton[cycleNameHash] = (cycleNameHash == '*') ? new Wildcard() : new HaabMonth(cycleNameHash);
    }
    return singleton[cycleNameHash];
  } else {
    return newCycleName;
  }
}

/**
 * Haab month component of a Calendar Round date.
 */
export class HaabMonth extends Cycle {
  /**
   * @param {string} raw - Name of the Haab month
   */
  constructor(raw: string | Wildcard) {
    super(raw, months, getHaabMonth);
    this.validate();
  }

  /**
   * Render the month name using i18n for the specified locale
   * @param locale - Optional locale to use for rendering (defaults to active locale)
   * @returns The rendered month name
   */
  toLocaleString(locale?: Locale): string {
    if (typeof this.value === 'string') {
      return getI18nManager().renderHaabMonth(this.value, locale);
    }
    return `${this.value}`;
  }

  /**
   * Ensure a Haab month name is defined.
   * Note: Validation is now locale-agnostic to support first-class i18n.
   */
  validate(): boolean {
    if (!isWildcard(this.value)) {
      if (this.value === undefined) {
        throw new Error('Haab\' month name must be provided');
      }
      if (typeof this.value !== 'string') {
        throw new Error(`Haab' month must be a string, got ${typeof this.value}`);
      }
    }
    return true
  }
}
