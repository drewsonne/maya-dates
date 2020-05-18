import WesternCalendar from './western';
export default class JulianCalendarDate extends WesternCalendar {
    get offset(): 1 | 0 | -1 | -13 | -12 | -11 | -10;
}
