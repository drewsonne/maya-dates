"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const full_date_1 = require("../factory/full-date");
require("mocha");
const chai_1 = require("chai");
it('full date rendering', () => {
    const fullDate = new full_date_1.default()
        .parse('1Ok * * 9.*.10.10.10');
    chai_1.expect(`${fullDate}`).to.equal('1 Ok * *  9. *.10.10.10');
});
//# sourceMappingURL=full-date.spec.js.map