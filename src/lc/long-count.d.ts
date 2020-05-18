import FullDate from '../full-date';
import GregorianCalendarDate from './western/gregorian';
import JulianCalendarDate from './western/julian';
import DistanceNumber from './distance-number';
export default class LongCount extends DistanceNumber {
    constructor(...cycles: any[]);
    setCorrelationConstant(newConstant: any): this;
    get julianDay(): any;
    get gregorian(): GregorianCalendarDate;
    get julian(): JulianCalendarDate;
    clone(): LongCount;
    get lordOfNight(): any;
    buildCalendarRound(): any;
    buildFullDate(): FullDate;
    plus(newLc: any): any;
    minus(newLc: any): any;
    asDistanceNumber(): DistanceNumber;
}
