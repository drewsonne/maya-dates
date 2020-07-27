declare class LordOfTheNight {
    id: number;
    constructor(id: number);
    toString(): string;
}
declare class _LordsOfTheNight {
    G1: LordOfTheNight;
    G2: LordOfTheNight;
    G3: LordOfTheNight;
    G4: LordOfTheNight;
    G5: LordOfTheNight;
    G6: LordOfTheNight;
    G7: LordOfTheNight;
    G8: LordOfTheNight;
    G9: LordOfTheNight;
    lookup: {
        [key: string]: LordOfTheNight;
    };
    constructor();
    get(id: string): LordOfTheNight;
}
declare const lords: _LordsOfTheNight;
export { lords, LordOfTheNight };
