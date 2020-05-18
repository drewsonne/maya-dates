"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
test('compute missing wildcard', () => {
    const lc = new index_1.default.factory.LongCountFactory().parse('1.2.3.4.5');
    const potentialLcs = new index_1.default.op.LongCountWildcard(lc).run();
    expect(potentialLcs).toHaveLength(1);
});
test('compute long single wildcard', () => {
    const lc = new index_1.default.factory.LongCountFactory().parse('1.2.*.4.5');
    const potentialLcs = new index_1.default.op.LongCountWildcard(lc).run();
    expect(potentialLcs).toHaveLength(20);
});
test('compute short single wildcard', () => {
    const lc = new index_1.default.factory.LongCountFactory().parse('1.2.3.*.5');
    const potentialLcs = new index_1.default.op.LongCountWildcard(lc).run();
    expect(potentialLcs).toHaveLength(15);
});
test('compute double wildcard', () => {
    const lc = new index_1.default.factory.LongCountFactory().parse('1.2.*.*.5');
    const potentialLcs = new index_1.default.op.LongCountWildcard(lc).run();
    expect(potentialLcs).toHaveLength(300);
});
//# sourceMappingURL=operations-longcount-wildcard.test.js.map