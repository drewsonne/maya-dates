declare class LordOfNight {
    id: number;
    constructor(id: number);
    toString(): string;
}
declare class LordsOfTheNight {
    G1: LordOfNight;
    G2: LordOfNight;
    G3: LordOfNight;
    G4: LordOfNight;
    G5: LordOfNight;
    G6: LordOfNight;
    G7: LordOfNight;
    G8: LordOfNight;
    G9: LordOfNight;
    lookup: {
        [key: string]: LordOfNight;
    };
    constructor();
    get(id: string): LordOfNight;
}
declare const _default: LordsOfTheNight;
export default _default;
