import LongCount from "./lc/long-count";
import { CalendarRound } from "./cr/calendar-round";
export default class FullDate {
    cr: CalendarRound;
    lc: LongCount;
    constructor(cr: CalendarRound, lc: LongCount);
    toString(): string;
}
