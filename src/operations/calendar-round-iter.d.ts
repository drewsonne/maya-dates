import { CalendarRound } from "../cr/calendar-round";
export default class CalendarRoundIterator {
    fullDate: CalendarRound;
    current: CalendarRound;
    isFirst: boolean;
    constructor();
    reset(): void;
    next(): {
        value: CalendarRound;
        done: boolean;
    };
}
