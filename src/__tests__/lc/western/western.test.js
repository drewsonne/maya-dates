"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const { getCorrelationConstant } = index_1.default.lc;
const { LongCountFactory } = index_1.default.factory;
class MockDateCorrelation {
    constructor(lc, gregorian, julian, jday, mayaDay) {
        this.lc = lc;
        this.gregorian = gregorian;
        this.julian = julian;
        this.jday = jday;
        this.maya_day = mayaDay;
    }
}
describe('long-count to gregorian/julian', () => {
    const corr = getCorrelationConstant('GMT');
    const lcFactory = new LongCountFactory();
    const dates = [
        ['13.4.8.8.18', '13/3/2100 CE', '28/2/2100 CE', 2488141, 1903858],
        ['13.4.8.8.6', '1/3/2100 CE', '16/2/2100 CE', 2488129, 1903846],
        ['13.4.8.8.5', '28/2/2100 CE', '15/2/2100 CE', 2488128, 1903845],
        ['13.1.1.1.1', '23/9/2033 CE', '10/9/2033 CE', 2463864, 1879581],
        ['12.14.5.9.16', '28/2/1900 CE', '16/2/1900 CE', 2415079, 1830796],
        ['12.14.5.9.17', '1/3/1900 CE', '17/2/1900 CE', 2415080, 1830797],
        ['12.9.4.1.13', '1/3/1800 CE', '18/2/1800 CE', 2378556, 1794273],
        ['12.9.4.1.12', '28/2/1800 CE', '17/2/1800 CE', 2378555, 1794272],
        ['12.4.2.11.9', '1/3/1700 CE', '19/2/1700 CE', 2342032, 1757749],
        ['12.4.2.11.8', '28/2/1700 CE', '18/2/1700 CE', 2342031, 1757748],
        ['12.1.1.1.1', '21/6/1639 CE', '11/6/1639 CE', 2319864, 1735581],
        ['11.20.1.1.1', '4/10/1619 CE', '24/9/1619 CE', 2312664, 1728381],
        ['11.18.3.9.18', '15/10/1582 CE*', '15/10/1582 CE*', 2299161, 1714878],
        ['11.18.3.9.17', '4/10/1582 CE*', '4/10/1582 CE*', 2299160, 1714877],
        ['11.17.10.1.1', '28/6/1569 CE', '18/6/1569 CE', 2294304, 1710021],
        ['11.16.1.1.1', '27/11/1540 CE', '17/11/1540 CE', 2283864, 1699581],
        ['11.15.1.1.1', '12/3/1521 CE', '2/3/1521 CE', 2276664, 1692381],
        ['11.13.19.13.10', '11/3/1500 CE', '1/3/1500 CE', 2268993, 1684710],
        ['11.13.19.13.9', '10/3/1500 CE', '29/2/1500 CE', 2268992, 1684709],
        ['11.13.19.13.8', '9/3/1500 CE', '28/2/1500 CE', 2268991, 1684708],
        ['11.10.1.1.1', '18/8/1422 CE', '9/8/1422 CE', 2240664, 1656381],
        ['11.8.18.5.6', '11/3/1400 CE', '1/3/1400 CE', 2232469, 1648186],
        ['11.8.18.5.5', '10/3/1400 CE', '29/2/1400 CE', 2232468, 1648185],
        ['11.8.18.5.4', '9/3/1400 CE', '28/2/1400 CE', 2232467, 1648184],
        ['11.1.1.1.1', '18/3/1245 CE', '11/3/1245 CE', 2175864, 1591581],
        ['10.10.1.1.1', '15/5/1028 CE', '10/5/1028 CE', 2096664, 1512381],
        ['10.1.1.1.1', '14/12/850 CE', '10/12/850 CE', 2031864, 1447581],
        ['9.1.1.1.1', '10/9/456 CE', '9/9/456 CE', 1887864, 1303581],
        ['8.1.1.1.1', '8/6/62 CE', '10/6/62 CE', 1743864, 1159581],
        ['7.1.1.1.1', '5/3/333 BCE', '10/3/333 BCE', 1599864, 1015581],
        ['6.1.1.1.1', '1/12/728 BCE', '9/12/728 BCE', 1455864, 871581],
        ['6.0.0.0.0', '28/2/748 BCE', '8/3/748 BCE', 1448283, 864000],
    ].map((args) => new MockDateCorrelation(...args));
    it.each(dates.map((d) => [d.lc, d.gregorian, d.jday]))('lc(%s) -> g(%s: %s)', (lcRaw, gregorian) => {
        const lc = lcFactory.parse(lcRaw).setCorrelationConstant(corr);
        expect(`${lc.gregorian}`).toBe(gregorian);
    });
    it.each(dates.map((d) => [d.lc, d.julian, d.jday]))('lc(%s) -> j(%s: %s)', (lcRaw, julian) => {
        const lc = lcFactory.parse(lcRaw).setCorrelationConstant(corr);
        expect(`${lc.julian}`).toBe(julian);
    });
    it.each(dates.map((d) => [d.lc, d.jday]))('lc(%s) -> jday(%s)', (lcRaw, jday) => {
        const lc = lcFactory.parse(lcRaw).setCorrelationConstant(corr);
        expect(lc.julianDay).toBe(jday);
    });
    it.each(dates.map((d) => [d.lc, d.maya_day]))('lc(%s) -> mayaDay(%s)', (lcRaw, mayaNumber) => {
        const lc = lcFactory.parse(lcRaw).setCorrelationConstant(corr);
        expect(lc.getPosition()).toBe(mayaNumber);
    });
});
//# sourceMappingURL=western.test.js.map