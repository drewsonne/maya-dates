import * as moonbeams from "moonbeams";
import GregorianCalendarDate from "../lc/western/gregorian";

export default class GregorianFactory {

  parse(gregorian: string, expectedJDay: number): GregorianCalendarDate {
    let isBCE: boolean = false
    let searchString: string = ''
    if (gregorian.includes('BCE')) {
      isBCE = true
      searchString = 'BCE'
    } else if (gregorian.includes('CE')) {
      isBCE = false
      searchString = 'CE'
    }
    let cleanedGregorian = gregorian.replace(` ${searchString}`, '').replace(searchString, '').replace('*', '')
    let dateParts: number[] = cleanedGregorian.split('/').map((part) => +part)
    if (isBCE) {
      dateParts[2] = -dateParts[2]
    }
    let jday = Math.ceil(moonbeams.calendarToJd(dateParts[2], dateParts[1], dateParts[0]))
    let expectedOffset = expectedJDay - jday
    let offset: number = this.offset(jday)
    console.log(`${gregorian}, ${jday}, ${expectedJDay}, ${offset}, ${expectedOffset}`)
    return new GregorianCalendarDate(jday + offset);
  }

  offset(julianDay: number): number {
    if (julianDay > 2294314) {
      return 0;
    } else if (julianDay >= 2269001) {
      return -10;
    } else if (julianDay >= 2232476) {
      return -9;
    } else if (julianDay >= 2175871) {
      return -7;
    } else if (julianDay >= 2096670) {
      return -6;
    } else if (julianDay >= 2031868) {
      return -4;
    } else if (julianDay >= 1887865) {
      return -1;
    } else if (julianDay >= 1743862) {
      return 2;
    } else {
      return 0;
    }
  }
}
