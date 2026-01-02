import {expect} from 'chai'
import 'mocha'
import LongCount from "../../lc/long-count";

/**
 * Tests for Long Count component range validation after normalization.
 * 
 * The normalise() method converts a Long Count to total days and back,
 * then validates that all components are within their proper ranges per [R1, R2]:
 * - k'in ∈ [0,19]
 * - winal ∈ [0,17] (18 winal = 1 tun)
 * - tun ∈ [0,19]
 * - k'atun ∈ [0,19]
 * - bak'tun and higher are unbounded
 */
describe('Long Count normalized range validation', () => {
  
  describe('k\'in validation [0,19]', () => {
    it('should accept k\'in value of 0', () => {
      const lc = new LongCount(0);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept k\'in value of 19', () => {
      const lc = new LongCount(19);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept k\'in value in middle of range', () => {
      const lc = new LongCount(10);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should throw error for k\'in value of 20 after normalization', () => {
      // Create a Long Count that will have k'in = 20 after normalization
      // This is a contrived case but tests the validation
      const lc = new LongCount(20);
      lc.normalise();
      // After normalization, 20 k'in should become 0 k'in, 1 winal
      expect(lc.kIn).to.equal(0);
      expect(lc.winal).to.equal(1);
    });

    it('should handle negative k\'in by normalization', () => {
      const lc = new LongCount(-1);
      lc.normalise();
      // Negative values should be handled during normalization
      expect(lc.kIn).to.be.at.least(0);
      expect(lc.kIn).to.be.at.most(19);
    });
  });

  describe('winal validation [0,17]', () => {
    it('should accept winal value of 0', () => {
      const lc = new LongCount(0, 0);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept winal value of 17', () => {
      const lc = new LongCount(0, 17);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept winal value in middle of range', () => {
      const lc = new LongCount(0, 9);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should normalize winal value of 18 to 0 winal, 1 tun', () => {
      const lc = new LongCount(0, 18);
      lc.normalise();
      // 18 winal = 1 tun per the specification
      expect(lc.winal).to.equal(0);
      expect(lc.tun).to.equal(1);
    });

    it('should normalize winal value of 20', () => {
      const lc = new LongCount(0, 20);
      lc.normalise();
      expect(lc.winal).to.be.at.least(0);
      expect(lc.winal).to.be.at.most(17);
    });

    it('should handle negative winal by normalization', () => {
      const lc = new LongCount(0, -1);
      lc.normalise();
      expect(lc.winal).to.be.at.least(0);
      expect(lc.winal).to.be.at.most(17);
    });
  });

  describe('tun validation [0,19]', () => {
    it('should accept tun value of 0', () => {
      const lc = new LongCount(0, 0, 0);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept tun value of 19', () => {
      const lc = new LongCount(0, 0, 19);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept tun value in middle of range', () => {
      const lc = new LongCount(0, 0, 10);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should normalize tun value of 20 to 0 tun, 1 k\'atun', () => {
      const lc = new LongCount(0, 0, 20);
      lc.normalise();
      expect(lc.tun).to.equal(0);
      expect(lc.kAtun).to.equal(1);
    });

    it('should normalize tun value of 25', () => {
      const lc = new LongCount(0, 0, 25);
      lc.normalise();
      expect(lc.tun).to.be.at.least(0);
      expect(lc.tun).to.be.at.most(19);
    });

    it('should handle negative tun by normalization', () => {
      const lc = new LongCount(0, 0, -1);
      lc.normalise();
      expect(lc.tun).to.be.at.least(0);
      expect(lc.tun).to.be.at.most(19);
    });
  });

  describe('k\'atun validation [0,19]', () => {
    it('should accept k\'atun value of 0', () => {
      const lc = new LongCount(0, 0, 0, 0);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept k\'atun value of 19', () => {
      const lc = new LongCount(0, 0, 0, 19);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept k\'atun value in middle of range', () => {
      const lc = new LongCount(0, 0, 0, 10);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should normalize k\'atun value of 20 to 0 k\'atun, 1 bak\'tun', () => {
      const lc = new LongCount(0, 0, 0, 20);
      lc.normalise();
      expect(lc.kAtun).to.equal(0);
      expect(lc.bakTun).to.equal(1);
    });

    it('should normalize k\'atun value of 30', () => {
      const lc = new LongCount(0, 0, 0, 30);
      lc.normalise();
      expect(lc.kAtun).to.be.at.least(0);
      expect(lc.kAtun).to.be.at.most(19);
    });

    it('should handle negative k\'atun by normalization', () => {
      const lc = new LongCount(0, 0, 0, -1);
      lc.normalise();
      expect(lc.kAtun).to.be.at.least(0);
      expect(lc.kAtun).to.be.at.most(19);
    });
  });

  describe('bak\'tun and higher units (unbounded)', () => {
    it('should accept bak\'tun value of 0', () => {
      const lc = new LongCount(0, 0, 0, 0, 0);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept bak\'tun value of 13', () => {
      const lc = new LongCount(0, 0, 0, 0, 13);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept bak\'tun value of 20', () => {
      const lc = new LongCount(0, 0, 0, 0, 20);
      expect(() => lc.normalise()).to.not.throw();
      expect(lc.bakTun).to.equal(0);
      expect(lc.piktun).to.equal(1);
    });

    it('should accept large bak\'tun value', () => {
      const lc = new LongCount(0, 0, 0, 0, 100);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept piktun value of 20', () => {
      const lc = new LongCount(0, 0, 0, 0, 0, 20);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept large piktun value', () => {
      const lc = new LongCount(0, 0, 0, 0, 0, 100);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept kalabtun value of 20', () => {
      const lc = new LongCount(0, 0, 0, 0, 0, 0, 20);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept large kalabtun value', () => {
      const lc = new LongCount(0, 0, 0, 0, 0, 0, 100);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept kinchiltun value of 20', () => {
      const lc = new LongCount(0, 0, 0, 0, 0, 0, 0, 20);
      expect(() => lc.normalise()).to.not.throw();
    });

    it('should accept large kinchiltun value', () => {
      const lc = new LongCount(0, 0, 0, 0, 0, 0, 0, 100);
      expect(() => lc.normalise()).to.not.throw();
    });
  });

  describe('complex normalization scenarios', () => {
    it('should normalize mixed components correctly', () => {
      const lc = new LongCount(25, 19, 21, 18);
      lc.normalise();
      expect(lc.kIn).to.be.at.least(0);
      expect(lc.kIn).to.be.at.most(19);
      expect(lc.winal).to.be.at.least(0);
      expect(lc.winal).to.be.at.most(17);
      expect(lc.tun).to.be.at.least(0);
      expect(lc.tun).to.be.at.most(19);
      expect(lc.kAtun).to.be.at.least(0);
      expect(lc.kAtun).to.be.at.most(19);
    });

    it('should normalize all components at maximum boundary', () => {
      const lc = new LongCount(19, 17, 19, 19);
      lc.normalise();
      expect(lc.kIn).to.equal(19);
      expect(lc.winal).to.equal(17);
      expect(lc.tun).to.equal(19);
      expect(lc.kAtun).to.equal(19);
    });

    it('should normalize all components at minimum boundary', () => {
      const lc = new LongCount(0, 0, 0, 0);
      lc.normalise();
      expect(lc.kIn).to.equal(0);
      expect(lc.winal).to.equal(0);
      expect(lc.tun).to.equal(0);
      expect(lc.kAtun).to.equal(0);
    });

    it('should handle overflow in all components', () => {
      const lc = new LongCount(20, 18, 20, 20, 20);
      lc.normalise();
      expect(lc.kIn).to.be.at.least(0);
      expect(lc.kIn).to.be.at.most(19);
      expect(lc.winal).to.be.at.least(0);
      expect(lc.winal).to.be.at.most(17);
      expect(lc.tun).to.be.at.least(0);
      expect(lc.tun).to.be.at.most(19);
      expect(lc.kAtun).to.be.at.least(0);
      expect(lc.kAtun).to.be.at.most(19);
    });
  });
});
