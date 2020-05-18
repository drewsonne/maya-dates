"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LordOfNight {
    constructor(id) {
        this.id = id;
    }
    toString() {
        return `G${this.id}`;
    }
}
class LordsOfTheNight {
    constructor() {
        this.G1 = new LordOfNight(1);
        this.G2 = new LordOfNight(2);
        this.G3 = new LordOfNight(3);
        this.G4 = new LordOfNight(4);
        this.G5 = new LordOfNight(5);
        this.G6 = new LordOfNight(6);
        this.G7 = new LordOfNight(7);
        this.G8 = new LordOfNight(8);
        this.G9 = new LordOfNight(9);
        this.lookup = {
            'G1': this.G1,
            'G2': this.G2,
            'G3': this.G3,
            'G4': this.G4,
            'G5': this.G5,
            'G6': this.G6,
            'G7': this.G7,
            'G8': this.G8,
            'G9': this.G9
        };
    }
    get(id) {
        return this.lookup[id];
    }
}
exports.default = new LordsOfTheNight();
//# sourceMappingURL=lord-of-night.js.map