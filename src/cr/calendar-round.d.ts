import { Tzolkin } from './tzolkin';
import { Haab } from './haab';
import DistanceNumber from '../lc/distance-number';
export declare function getCalendarRound(tzolkin: Tzolkin, haab: Haab): CalendarRound;
export declare class CalendarRound {
    tzolkin: Tzolkin;
    haab: Haab;
    constructor(tzolkin: Tzolkin, haab: Haab);
    validate(): void;
    next(): CalendarRound;
    equal(newCr: CalendarRound): boolean;
    minus(targetCr: CalendarRound): DistanceNumber;
    match(newCr: CalendarRound): boolean;
    shift(increment: number): CalendarRound;
    isPartial(): boolean;
    toString(): string;
}
export declare const origin: CalendarRound;
