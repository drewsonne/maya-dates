"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const long_count_1 = require("../../factory/long-count");
require("mocha");
const chai_1 = require("chai");
const long_count_2 = require("../../lc/long-count");
const wildcard_1 = require("../../wildcard");
const lord_of_night_1 = require("../../lc/night/lord-of-night");
describe('parse long-count fullDate', () => {
    const dates = [
        ['7.13', ' 0. 0. 0. 7.13'],
        ['9.16.19.17.19', ' 9.16.19.17.19'],
    ];
    const factory = new long_count_1.default();
    dates.forEach((args) => {
        const [date, expected] = args;
        it(`${date} -> ${expected}`, () => {
            const actual = factory.parse(date);
            chai_1.expect(`${actual}`).to.equal(expected);
        });
    });
});
it('fail longcount', () => {
    chai_1.expect(new long_count_1.default().parse('hello, world')).to.be.null;
});
describe('modify long-count fullDate', () => {
    const dates = [
        [
            [1, 2, 3, 4, 5, 6, 7, 8],
            ' 8. 7. 6. 5. 4. 3. 2. 1',
            [2, 17],
            ' 8. 7. 6. 5. 4.17. 2. 1',
        ],
        [
            [0, 0, 0, 17, 9, 0, 0, 0],
            ' 9.17. 0. 0. 0',
            [0, 10],
            ' 9.17. 0. 0.10',
        ],
    ];
    dates.forEach((args) => {
        const [numericDate, expected, modifiers, expectedModified] = args;
        it(`${numericDate} -> ${expected}; ${modifiers} -> ${expectedModified}`, () => {
            const date = new long_count_2.default(...numericDate);
            chai_1.expect(date.isValid()).to.be.true;
            chai_1.expect(date.kIn).to.equal(numericDate[0]);
            chai_1.expect(date.winal).to.equal(numericDate[1]);
            chai_1.expect(date.tun).to.equal(numericDate[2]);
            chai_1.expect(date.kAtun).to.equal(numericDate[3]);
            chai_1.expect(date.bakTun).to.equal(numericDate[4]);
            chai_1.expect(date.piktun).to.equal(numericDate[5]);
            chai_1.expect(date.kalabtun).to.equal(numericDate[6]);
            chai_1.expect(date.kinchiltun).to.equal(numericDate[7]);
            chai_1.expect(date.getDateSections(0)).to.equal(numericDate[0]);
            chai_1.expect(date.getDateSections(4)).to.equal(numericDate[4]);
            chai_1.expect(date.getDateSections(10)).to.equal(0);
            chai_1.expect(date.toString()).to.equal(expected);
            date.setDateSections(modifiers[0], modifiers[1]);
            chai_1.expect(date.toString()).to.equal(expectedModified);
        });
    });
});
it('set long count parts', () => {
    const date = new long_count_2.default(1, 2, 3, 4, 5);
    chai_1.expect(date.toString()).to.equal(' 5. 4. 3. 2. 1');
    date.kIn = 5;
    date.winal = 4;
    date.tun = 3;
    date.kAtun = 2;
    date.bakTun = 1;
    date.piktun = 10;
    chai_1.expect(date.toString()).to.equal('10. 1. 2. 3. 4. 5');
    date.kinchiltun = 12;
    chai_1.expect(date.toString()).to.equal('12. 0.10. 1. 2. 3. 4. 5');
    date.kalabtun = 11;
    chai_1.expect(date.toString()).to.equal('12.11.10. 1. 2. 3. 4. 5');
});
it('print short long-count fullDate', () => {
    const date = new long_count_2.default(1, 2);
    chai_1.expect(date.toString()).to.equal(' 0. 0. 0. 2. 1');
});
describe('test lord of night glyphs', () => {
    const dates = [
        ['9.16.19.17.19', lord_of_night_1.default.G8, 'G8'],
        ['9.17.0.0.0', lord_of_night_1.default.get('G9'), 'G9'],
        ['9.17.0.0.5', lord_of_night_1.default.G5, 'G5'],
        ['9.17.0.0.9', lord_of_night_1.default.G9, 'G9'],
        ['9.17.0.0.10', lord_of_night_1.default.get('G1'), 'G1'],
    ];
    const factory = new long_count_1.default();
    dates.forEach((args) => {
        const [date, lordOfNight, id] = args;
        it(`${date} -> ${lordOfNight} (${id})`, () => {
            const lc = factory.parse(date);
            chai_1.expect(lc.lordOfNight).to.equal(lordOfNight);
            chai_1.expect(lc.lordOfNight).not.to.be.undefined;
            chai_1.expect(`${lc.lordOfNight}`).to.equal(id);
        });
    });
});
describe('comparison', () => {
    [
        [[0, 1], [1], true],
    ].map((row) => [
        new long_count_2.default(...row[0]),
        new long_count_2.default(...row[1]),
        row[2],
    ]).forEach((args) => {
        const [a, b, aLtB] = args;
        it(`${a} > ${b} = ${aLtB}`, () => {
            chai_1.expect(a.gt(b) === aLtB).to.be.true;
            chai_1.expect(a.lt(b) === aLtB).to.be.true;
        });
    });
});
it('sign', () => {
    const lc = new long_count_2.default(1, 1, 1, 1, 1);
    chai_1.expect(lc.isPositive).to.be.true;
    chai_1.expect(lc.isNegative).to.be.false;
    lc.isNegative = true;
    chai_1.expect(lc.isPositive).to.be.false;
    chai_1.expect(lc.isNegative).to.be.true;
    lc.isPositive = true;
    chai_1.expect(lc.isPositive).to.be.true;
    chai_1.expect(lc.isNegative).to.be.false;
});
it('equality', () => {
    const lc1 = new long_count_2.default(1, 1, 1, 1, 1);
    const lc2 = new long_count_2.default(1, 1, 1, 1, 1);
    const lc3 = new long_count_2.default(2, 2, 2, 2, 2);
    const lc4 = new long_count_2.default(3, 3, 3, 3, 0);
    const lc5 = new long_count_2.default(3, 3, 3, 3);
    chai_1.expect(lc1.equal(lc1)).to.be.true;
    chai_1.expect(lc1.exactlyEqual(lc1)).to.be.true;
    chai_1.expect(lc1.equal(lc2)).to.be.true;
    chai_1.expect(lc1.exactlyEqual(lc2)).to.be.true;
    chai_1.expect(lc1.equal(lc3)).to.be.false;
    chai_1.expect(lc4.equal(lc5)).to.be.true;
    chai_1.expect(lc4.exactlyEqual(lc5)).to.be.false;
});
it('wildcard position failure', () => {
    const lc = new long_count_2.default(1, 1, new wildcard_1.Wildcard(), 1, 1);
    chai_1.expect(() => lc.getPosition()).to.throw('Can not get position of fullDate dates');
});
it('significant digits', () => {
    chai_1.expect(new long_count_2.default(1, 1, 1, 1, 0, 0, 0).sigParts).to.eql([1, 1, 1, 1]);
});
//# sourceMappingURL=long-count.spec.js.map