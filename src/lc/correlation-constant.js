"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CorrelationConstant {
    constructor(value, name) {
        this.value = value;
        this.name = name;
    }
}
const correlationConstants = [[394483, 'Bowditch'],
    [489138, 'Makesom'],
    [489384, 'Spinden'],
    [584281, 'Martinéz-Hernando'],
    [584283, 'GMT'],
    [584285, 'Astronomical'],
    [584286, 'Martin-Skidmore'],
    [660208, 'Wells, Fuls'],
].reduce((obj, n) => {
    const corr = new CorrelationConstant(...n);
    const newObj = obj;
    newObj[corr.name] = corr;
    newObj[corr.value] = corr;
    return newObj;
});
function getCorrelationConstant(id, name) {
    if (id in correlationConstants) {
        return correlationConstants[id];
    }
    if (name === undefined) {
        throw new Error(`Could not find ${id} in defaults, and 'name' was not provided for new Correlation Constant`);
    }
    const newCorrConst = new CorrelationConstant(id, name);
    correlationConstants[newCorrConst.name] = newCorrConst;
    correlationConstants[newCorrConst.value] = newCorrConst;
    return newCorrConst;
}
exports.default = getCorrelationConstant;
//# sourceMappingURL=correlation-constant.js.map