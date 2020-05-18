export default class WesternCalendar {
    constructor(julianDay: any);
    get year(): any;
    get month(): any;
    get day(): number;
    get era(): "BCE" | "CE";
    isThreshold(): boolean;
    toString(): string;
}
