"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const cycle_1 = require("../../../cr/component/cycle");
const hashMap_1 = require("../../../structs/hashMap");
it('object creation', () => {
    const mockCycle = new hashMap_1.default([
        undefined,
        'hallo',
        'world',
        'mock',
        'foobar'
    ]);
    const getMockObject = cycle_1.singletonGenerator(mockCycle, (name) => new MockCycle(name, mockCycle));
    class MockCycle extends cycle_1.Cycle {
        constructor(value, lookup) {
            super(value, lookup, getMockObject);
        }
        validate() {
            return false;
        }
    }
    const mock = getMockObject('mock');
    const first = mock.shift(1);
    const next = mock.next();
    const third = mock.shift(3);
    chai_1.expect(mock.position).to.equal(3);
    chai_1.expect(`${mock}`).to.equal('mock');
    chai_1.expect(`${first}`).to.equal('foobar');
    chai_1.expect(`${third}`).to.equal('world');
    chai_1.expect(first).to.equal(next);
});
//# sourceMappingURL=cycle.spec.js.map