import FullDateFactory from "../../factory/full-date";
import {Wildcard} from "../../wildcard";

import {expect} from 'chai'
import 'mocha'
import FullDateWildcard from "../../operations/fulldate-wildcard";
import NumberCoefficient from "../../cr/component/numberCoefficient";

describe('complex wildcard parsing', () => {
  const partialDates: string[] = [
    '1 Ok * * 9.*.10.10.10',
    '1Ok * * 9.*.10.10.10',
    '1 Ok ** 9.*.10.10.10',
    '1Ok ** 9.*.10.10.10',
  ];
  partialDates.forEach((partialDate) => {
    it(`${partialDate}`, () => {
      const fullDate = new FullDateFactory().parse(
        partialDate,
      );
      expect(fullDate.cr.tzolkin.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (fullDate.cr.tzolkin.coeff instanceof NumberCoefficient) {
        expect(fullDate.cr.tzolkin.coeff.value).to.eq(1);
      }
      expect(fullDate.cr.tzolkin.name).to.eq('Ok');
      expect(fullDate.cr.haab.coeff).to.be.an.instanceOf(Wildcard);
      expect(fullDate.cr.haab.month).to.be.an.instanceOf(Wildcard);
      expect(fullDate.lc.kIn).to.eq(10);
      expect(fullDate.lc.winal).to.eq(10);
      expect(fullDate.lc.tun).to.eq(10);
      expect(fullDate.lc.kAtun).to.be.an.instanceOf(Wildcard);
      expect(fullDate.lc.bakTun).to.eq(9);
    })
  });
});

describe('complex wildcard inference', () => {
  const partialDates: [string, number][] = [
    ['11 Ok 18 Muwan 9.*.*.*.10', 7],
    ['* Ok * Mak 9.*.10.10.10', 2],
    ['1 Ok 13 * 9.*.10.10.10', 1],
    ['* * 18 Muwan 9.*.*.10.10', 6],
  ];
  partialDates.forEach((args) => {
    let [partialDate, expected] = args
    it(`len(${partialDate}) = ${expected}`, () => {
      const fullDatePartial = new FullDateFactory().parse(
        partialDate,
      );
      const potentialDates = new FullDateWildcard(fullDatePartial).run();
      expect(potentialDates).to.have.lengthOf(expected);
    })
  });
});

describe('single cr alignment', () => {
  const fullDates: [string, [number, string, number, string]][] = [
    ['* Imix 9 K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
    ['* * 9 K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
    ['* * * K\'ank\'in 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
    ['* * * * 13.0.7.2.1', [4, 'Imix', 9, 'K\'ank\'in']],
  ];
  fullDates.forEach((args) => {
    let [raw, expected] = args
    it(`${raw} -> ${expected}`, () => {
      const fdFactory = new FullDateFactory();
      const potentialDates = new FullDateWildcard(
        fdFactory.parse(raw),
      ).run();

      expect(potentialDates).to.have.lengthOf(1);

      expect(potentialDates[0].cr.tzolkin.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (potentialDates[0].cr.tzolkin.coeff instanceof NumberCoefficient) {
        expect(potentialDates[0].cr.tzolkin.coeff.value).to.eq(expected[0]);
      }
      expect(potentialDates[0].cr.tzolkin.name).to.eq(expected[1]);

      expect(potentialDates[0].cr.haab.coeff).to.be.an.instanceOf(NumberCoefficient)
      if (potentialDates[0].cr.haab.coeff instanceof NumberCoefficient) {
        expect(potentialDates[0].cr.haab.coeff.value).to.eq(expected[2]);
      }
      expect(potentialDates[0].cr.haab.name).to.eq(expected[3]);
    });
  });
});
