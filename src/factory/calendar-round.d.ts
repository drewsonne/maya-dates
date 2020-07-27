import Factory from './base';
import { CalendarRound } from '../cr/calendar-round';
export default class CalendarRoundFactory extends Factory {
    pattern: RegExp;
    constructor();
    parse(raw: string): CalendarRound;
    isNumberString(potentialNumber: string): boolean;
}
