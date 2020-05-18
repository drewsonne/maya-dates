"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const base_1 = require("../../../cr/component/base");
const wildcard_1 = require("../../../wildcard");
it('object creation', () => {
    class Mock extends base_1.default {
    }
    const mock = new Mock(new wildcard_1.Wildcard());
    chai_1.expect(mock.isWildcard()).to.be.true;
});
//# sourceMappingURL=base.spec.js.map