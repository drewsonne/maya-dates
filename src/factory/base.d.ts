export default abstract class Factory {
    pattern: RegExp;
    constructor();
    split(raw: string): string[];
}
