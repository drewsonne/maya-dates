export default class HashMap {
    private valueToIndex;
    private indexToValue;
    constructor(raw: string[]);
    getValue(index: number): string;
    getIndex(value: string): number;
    includes(value: string): boolean;
    get length(): number;
    toString(): string;
}
