import FullDateFactory from "../factory/full-date";
import FullDate from "../full-date";
import LongCountFactory from "../factory/long-count";
import CalendarRoundFactory from "../factory/calendar-round";
import 'mocha'
import {expect} from 'chai'

it('full date rendering', () => {
  const fullDate = new FullDateFactory()
    .parse('1Ok * * 9.*.10.10.10');
  expect(`${fullDate}`).to.equal('1 Ok * *  9. *.10.10.10');
});

describe('FullDate equality', () => {
  it('equal full dates should return true', () => {
    const fd1 = new FullDateFactory().parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
    const fd2 = new FullDateFactory().parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
    expect(fd1.equal(fd2)).to.be.true;
    expect(fd2.equal(fd1)).to.be.true;
  });

  it('different calendar rounds should return false', () => {
    const fd1 = new FullDateFactory().parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
    const fd2 = new FullDateFactory().parse('5 Imix 9 Kumk\'u 9.17.0.0.0');
    expect(fd1.equal(fd2)).to.be.false;
  });

  it('different long counts should return false', () => {
    const fd1 = new FullDateFactory().parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
    const fd2 = new FullDateFactory().parse('4 Ajaw 8 Kumk\'u 9.17.0.0.1');
    expect(fd1.equal(fd2)).to.be.false;
  });

  it('non-FullDate should return false', () => {
    const fd1 = new FullDateFactory().parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
    const lc = new LongCountFactory().parse('9.17.0.0.0');
    expect(fd1.equal(lc)).to.be.false;
  });

  it('wildcard dates should compare correctly', () => {
    const fd1 = new FullDateFactory().parse('4 Ajaw * Kumk\'u 9.17.0.0.*');
    const fd2 = new FullDateFactory().parse('4 Ajaw * Kumk\'u 9.17.0.0.*');
    // These should be equal because both CR and LC use equal() which handles wildcards
    expect(fd1.equal(fd2)).to.be.true;
  });
});

it('isPartial should detect wildcards', () => {
  const fd1 = new FullDateFactory().parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
  const fd2 = new FullDateFactory().parse('4 Ajaw * Kumk\'u 9.17.0.0.0');
  const fd3 = new FullDateFactory().parse('4 Ajaw 8 Kumk\'u 9.17.0.0.*');
  const fd4 = new FullDateFactory().parse('4 Ajaw * Kumk\'u 9.17.0.0.*');

  expect(fd1.isPartial()).to.be.false;
  expect(fd2.isPartial()).to.be.true;
  expect(fd3.isPartial()).to.be.true;
  expect(fd4.isPartial()).to.be.true;
});
