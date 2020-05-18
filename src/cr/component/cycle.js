"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const wildcard_1 = require("../../wildcard");
function singletonGenerator(lookup, classGenerator) {
    const singleton = {};
    function cycleSingleton(newCycleName) {
        let cycleName = (typeof newCycleName === 'number') ? lookup.getValue(newCycleName) : newCycleName;
        if (cycleName === '*') {
            cycleName = new wildcard_1.Wildcard();
        }
        const cycleNameHash = `${cycleName}`;
        if (singleton[cycleNameHash] === undefined) {
            singleton[cycleNameHash] = classGenerator(cycleName);
        }
        return singleton[cycleNameHash];
    }
    return cycleSingleton;
}
exports.singletonGenerator = singletonGenerator;
class Cycle extends base_1.default {
    constructor(value, lookup, generator) {
        super((typeof value === 'number') ?
            lookup.getValue(value) :
            value);
        this.generator = generator;
        this.cycleLength = lookup.length;
        if (typeof this.value === 'string') {
            this.position = lookup.getIndex(this.value);
        }
    }
    next() {
        return this.shift(1);
    }
    shift(incremental) {
        if (incremental === 0) {
            return this;
        }
        if (this.privateNext === undefined) {
            let newPosition = (this.position + 1) % (this.cycleLength - 1);
            newPosition = (newPosition === 0) ? (this.cycleLength - 1) : newPosition;
            this.privateNext = this.generator(newPosition);
        }
        return this.privateNext.shift(incremental - 1);
    }
    toString() {
        return `${this.value}`;
    }
}
exports.Cycle = Cycle;
//# sourceMappingURL=cycle.js.map