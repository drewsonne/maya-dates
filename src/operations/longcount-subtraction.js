class LongcountSubtraction {
    constructor(lcClass, a, b) {
        this.a = a;
        this.b = b;
        this.LcClass = lcClass;
    }
    equals() {
        const aLen = this.a.parts.length;
        const bLen = this.b.parts.length;
        const length = Math.max(aLen, bLen);
        const aParts = this.a.parts.concat(new Array(length - aLen).fill(0));
        const bParts = this.b.parts.concat(new Array(length - bLen).fill(0));
        const isInverted = this.a.lt(this.b);
        const newParts = aParts.map((p, i) => (isInverted ? (bParts[i] - p) : (p - bParts[i])));
        let carry = 0;
        let i = 0;
        while (i < newParts.length || carry < 0) {
            newParts[i] += carry;
            carry = 0;
            while (newParts[i] < 0) {
                carry -= 1;
                const nextPositionMonthLength = (i === 1) ? 15 : 20;
                newParts[i] += nextPositionMonthLength;
            }
            i += 1;
        }
        for (i = newParts.length - 1; i > 0; i -= 1) {
            if (newParts[i] === 0) {
                newParts.pop();
            }
            else {
                i = 0;
            }
        }
        const newLC = new this.LcClass(...newParts);
        newLC.isPositive = !isInverted;
        return newLC;
    }
}
module.exports = LongcountSubtraction;
//# sourceMappingURL=longcount-subtraction.js.map