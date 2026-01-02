import { expect } from 'chai';
import 'mocha';
import * as fs from 'fs';
import * as path from 'path';

describe('package.json exports validation', () => {
  let packageJson: any;

  before(() => {
    const packagePath = path.join(__dirname, '../../package.json');
    const packageContent = fs.readFileSync(packagePath, 'utf-8');
    packageJson = JSON.parse(packageContent);
  });

  it('should have exports field defined', () => {
    expect(packageJson).to.have.property('exports');
    expect(packageJson.exports).to.be.an('object');
  });

  it('should export main entry point', () => {
    expect(packageJson.exports).to.have.property('.');
    expect(packageJson.exports['.']).to.be.an('object');
    expect(packageJson.exports['.']).to.have.property('require');
    expect(packageJson.exports['.']).to.have.property('types');
    expect(packageJson.exports['.'].require).to.equal('./lib/index.js');
    expect(packageJson.exports['.'].types).to.equal('./lib/index.d.ts');
  });

  it('should export backwards-compatible lib/* subpath', () => {
    expect(packageJson.exports).to.have.property('./lib/*');
    expect(packageJson.exports['./lib/*']).to.equal('./lib/*');
  });

  it('should export package.json for tooling', () => {
    expect(packageJson.exports).to.have.property('./package.json');
    expect(packageJson.exports['./package.json']).to.equal('./package.json');
  });

  it('should have sideEffects set to false for tree-shaking', () => {
    expect(packageJson).to.have.property('sideEffects');
    expect(packageJson.sideEffects).to.be.false;
  });

  it('should have type set to commonjs', () => {
    expect(packageJson).to.have.property('type');
    expect(packageJson.type).to.equal('commonjs');
  });

  it('should have main and types fields for backwards compatibility', () => {
    expect(packageJson).to.have.property('main');
    expect(packageJson).to.have.property('types');
    expect(packageJson.main).to.equal('./lib/index.js');
    expect(packageJson.types).to.equal('./lib/index.d.ts');
  });
});

describe('module imports validation', () => {
  it('should be able to import from package root', async () => {
    // Import from the built index
    const { LongCountFactory, CalendarRoundFactory, FullDateFactory } = await import('../index');
    
    expect(LongCountFactory).to.exist;
    expect(CalendarRoundFactory).to.exist;
    expect(FullDateFactory).to.exist;
  });

  it('should be able to import factories from root', async () => {
    const { LongCountFactory, CalendarRoundFactory, FullDateFactory } = await import('../index');
    
    // Test that factories work
    const lcFactory = new LongCountFactory();
    expect(lcFactory).to.exist;
    expect(lcFactory.parse).to.be.a('function');
    
    const crFactory = new CalendarRoundFactory();
    expect(crFactory).to.exist;
    expect(crFactory.parse).to.be.a('function');
    
    const fdFactory = new FullDateFactory();
    expect(fdFactory).to.exist;
    expect(fdFactory.parse).to.be.a('function');
  });

  it('should be able to import utilities from root', async () => {
    const { Wildcard, isWildcard, getCalendarRound, LongCount, FullDate } = await import('../index');
    
    expect(Wildcard).to.exist;
    expect(isWildcard).to.be.a('function');
    expect(getCalendarRound).to.be.a('function');
    expect(LongCount).to.exist;
    expect(FullDate).to.exist;
  });

  it('should validate factory functionality from root import', async () => {
    const { LongCountFactory } = await import('../index');
    
    const lcFactory = new LongCountFactory();
    const lc = lcFactory.parse('9.17.0.0.0');
    
    expect(lc).to.exist;
    expect(lc.toString()).to.equal(' 9.17. 0. 0. 0');
  });
});
