import FullDate from '../full-date';
import GregorianCalendarDate from './western/gregorian';
import JulianCalendarDate from './western/julian';
import DistanceNumber from './distance-number';
import { LordOfTheNight } from "./night/lord-of-night";
import { Wildcard } from "../wildcard";
import { CorrelationConstant } from "./correlation-constant";
export default class LongCount extends DistanceNumber {
    private correlationConstant;
    constructor(...cycles: (number | Wildcard)[]);
    setCorrelationConstant(newConstant: CorrelationConstant): this;
    get julianDay(): any;
    get gregorian(): GregorianCalendarDate;
    get julian(): JulianCalendarDate;
    clone(): LongCount;
    get lordOfNight(): LordOfTheNight;
    buildCalendarRound(): import("../cr/calendar-round").CalendarRound;
    buildFullDate(): FullDate;
    plus(newLc: LongCount): LongcountAddition;
    minus(newLc: LongCount): LongcountSubtraction;
    asDistanceNumber(): DistanceNumber;
}
