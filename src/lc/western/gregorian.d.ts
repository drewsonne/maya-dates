import WesternCalendar from './western';
export default class GregorianCalendarDate extends WesternCalendar {
    get offset(): 1 | 0 | 4 | 6 | 7 | 10 | -8 | -5 | -2 | 9;
}
