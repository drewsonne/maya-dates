import { Wildcard } from "../wildcard";
export default class DistanceNumber {
    parts: (number | Wildcard)[];
    datePattern: RegExp;
    sign: number;
    constructor(...cycles: (number | Wildcard)[]);
    get isPositive(): boolean;
    get isNegative(): boolean;
    set isPositive(newPositive: boolean);
    set isNegative(newNegative: boolean);
    equal(other: DistanceNumber): boolean;
    exactlyEqual(other: DistanceNumber): boolean;
    get sigParts(): (number | Wildcard)[];
    clone(): DistanceNumber;
    getDateSections(index: number): number | Wildcard;
    setDateSections(index: number, newValue: number | Wildcard): this;
    map(fn: (lcPart: (number | Wildcard), lcPartIndex: number) => any): any[];
    lt(newLongCount: DistanceNumber): boolean;
    gt(newLongCount: DistanceNumber): boolean;
    set kIn(newKIn: number | Wildcard);
    get kIn(): number | Wildcard;
    set winal(newWinal: number | Wildcard);
    get winal(): number | Wildcard;
    set tun(newTun: number | Wildcard);
    get tun(): number | Wildcard;
    set kAtun(newKAtun: number | Wildcard);
    get kAtun(): number | Wildcard;
    set bakTun(newBakTun: number | Wildcard);
    get bakTun(): number | Wildcard;
    set piktun(newBakTun: number | Wildcard);
    get piktun(): number | Wildcard;
    set kalabtun(newBakTun: number | Wildcard);
    get kalabtun(): number | Wildcard;
    set kinchiltun(newBakTun: number | Wildcard);
    get kinchiltun(): number | Wildcard;
    isValid(): boolean;
    isPartial(): boolean;
    getPosition(): number;
    plus(newLc: DistanceNumber): LongcountAddition;
    minus(newLc: DistanceNumber): LongcountSubtraction;
    normalise(): DistanceNumber;
    toString(): string;
}