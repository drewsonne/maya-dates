"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DistanceNumber {
    constructor(...cycles) {
        this.parts = cycles;
        this.datePattern = /([\d*]+\.?)+/;
        this.sign = (this.parts[this.parts.length - 1] < 0) ? -1 : 1;
        if (this.isNegative) {
            this.parts[this.parts.length - 1] = -1
                * this.parts[this.parts.length - 1];
        }
    }
    get isPositive() {
        return this.sign === 1;
    }
    get isNegative() {
        return this.sign === -1;
    }
    set isPositive(newPositive) {
        this.sign = newPositive === true ? 1 : -1;
    }
    set isNegative(newNegative) {
        this.isPositive = !newNegative;
    }
    equal(other) {
        const thisMinParts = this.sigParts;
        const otherMinParts = other.sigParts;
        const signEqual = this.sign === other.sign;
        const lengthEqual = thisMinParts.length === otherMinParts.length;
        const partsEqual = thisMinParts.every((e, i) => e === otherMinParts[i]);
        return signEqual && lengthEqual && partsEqual;
    }
    exactlyEqual(other) {
        const signsEqual = (this.sign === other.sign);
        const lengthEqual = (this.parts.length === other.parts.length);
        const partsEqual = this.parts.every((e, i) => e === other.parts[i]);
        return signsEqual && lengthEqual && partsEqual;
    }
    get sigParts() {
        let sigParts = [];
        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i] === 0) {
                i = this.parts.length;
            }
            else {
                sigParts.push(this.parts[i]);
            }
        }
        return sigParts;
    }
    clone() {
        return new DistanceNumber(...this.parts);
    }
    getDateSections(index) {
        const part = this.parts[index];
        if (part === undefined) {
            return 0;
        }
        return part;
    }
    setDateSections(index, newValue) {
        this.parts[index] = newValue;
        return this;
    }
    map(fn) {
        return this.parts.map(fn);
    }
    lt(newLongCount) {
        return this.getPosition() < newLongCount.getPosition();
    }
    gt(newLongCount) {
        return this.getPosition() > newLongCount.getPosition();
    }
    set kIn(newKIn) {
        this.setDateSections(0, newKIn);
    }
    get kIn() {
        return this.getDateSections(0);
    }
    set winal(newWinal) {
        this.setDateSections(1, newWinal);
    }
    get winal() {
        return this.getDateSections(1);
    }
    set tun(newTun) {
        this.setDateSections(2, newTun);
    }
    get tun() {
        return this.getDateSections(2);
    }
    set kAtun(newKAtun) {
        this.setDateSections(3, newKAtun);
    }
    get kAtun() {
        return this.getDateSections(3);
    }
    set bakTun(newBakTun) {
        this.setDateSections(4, newBakTun);
    }
    get bakTun() {
        return this.getDateSections(4);
    }
    set piktun(newBakTun) {
        this.setDateSections(5, newBakTun);
    }
    get piktun() {
        return this.getDateSections(5);
    }
    set kalabtun(newBakTun) {
        this.setDateSections(6, newBakTun);
    }
    get kalabtun() {
        return this.getDateSections(6);
    }
    set kinchiltun(newBakTun) {
        this.setDateSections(7, newBakTun);
    }
    get kinchiltun() {
        return this.getDateSections(7);
    }
    isValid() {
        return this.datePattern.test(this.toString());
    }
    isPartial() {
        return this.parts.some((part) => part === wildcard);
    }
    getPosition() {
        if (this.isPartial()) {
            throw new Error('Can not get position of fullDate dates');
        }
        return (this.kIn
            + this.winal * 20
            + this.tun * 360
            + this.kAtun * 7200
            + this.bakTun * 144000
            + this.piktun * 2880000
            + this.kalabtun * 57600000
            + this.kinchiltun * 1152000000) * this.sign;
    }
    plus(newLc) {
        return new LongcountAddition(DistanceNumber, this, newLc);
    }
    minus(newLc) {
        return new LongcountSubtraction(DistanceNumber, this, newLc);
    }
    normalise() {
        const totalKIn = this.getPosition();
        const norm = new DistanceNumber();
        norm.kIn = totalKIn % 20;
        norm.winal = (totalKIn - norm.getPosition()) / 20 % 18;
        norm.tun = (totalKIn - norm.getPosition()) / 360 % 20;
        norm.kAtun = (totalKIn - norm.getPosition()) / 7200 % 20;
        norm.bakTun = (totalKIn - norm.getPosition()) / 144000 % 20;
        norm.piktun = (totalKIn - norm.getPosition()) / 2880000 % 20;
        norm.kalabtun = (totalKIn - norm.getPosition()) / 57600000 % 20;
        norm.kinchiltun = (totalKIn - norm.getPosition()) / 1152000000 % 20;
        const foundNegative = norm.parts.reduce((found, part) => found || (part < 0), false);
        this.sign = foundNegative ? -1 : 1;
        this.parts = norm.parts.map((part) => Math.abs(part));
        return this;
    }
    toString() {
        let significantDigits = [];
        for (let i = this.parts.length - 1; i >= 0; i -= 1) {
            const part = this.parts[i];
            if (part !== 0) {
                significantDigits = this.parts.slice(0, i + 1).reverse();
                break;
            }
        }
        for (let i = 0; i < significantDigits.length; i += 1) {
            if (significantDigits[i] === undefined) {
                significantDigits[i] = '0';
            }
        }
        const dateLength = significantDigits.length;
        if (dateLength < 5) {
            significantDigits = significantDigits.reverse();
            for (let i = 0; i < 5 - dateLength; i += 1) {
                significantDigits.push(' 0');
            }
            significantDigits = significantDigits.reverse();
        }
        for (let i = 0; i < significantDigits.length; i += 1) {
            const part = significantDigits[i].toString();
            if (part.length < 2) {
                significantDigits[i] = ` ${part}`;
            }
        }
        return `${this.sign === -1 ? '-' : ''}${significantDigits.join('.')}`;
    }
}
exports.default = DistanceNumber;
//# sourceMappingURL=distance-number.js.map