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
    // moonbeams.calendarToJd returns a julian day for the Gregorian calendar
    // We need to convert this to the equivalent Julian calendar julian day
    // by subtracting the offset that GregorianCalendarDate would apply
    let gregorianJd = Math.ceil(moonbeams.calendarToJd(dateParts[2], dateParts[1], dateParts[0]))
    // The expectedJDay is the actual julian day we want
    // Calculate the offset needed to get from gregorianJd to expectedJDay
    let offset = expectedJDay - gregorianJd
    return new GregorianCalendarDate(gregorianJd + offset);
  }
}
