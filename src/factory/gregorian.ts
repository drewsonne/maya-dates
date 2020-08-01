import GregorianCalendarDate from "../lc/western/gregorian";

export default class GregorianFactory {

  parse(gregorian: string): GregorianCalendarDate {
    let result: GregorianCalendarDate = new GregorianCalendarDate(10);
    return result
  }
}
