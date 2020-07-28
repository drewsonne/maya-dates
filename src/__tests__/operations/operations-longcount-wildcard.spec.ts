import {expect} from 'chai'
import LongCountFactory from "../../factory/long-count";
import LongCountWildcard from "../../operations/longcount-wildcard";

it('compute missing wildcard', () => {
  const lc = new LongCountFactory().parse('1.2.3.4.5');
  const potentialLcs = new LongCountWildcard(lc).run();
  expect(potentialLcs).to.have.lengthOf(1);
});

it('compute long single wildcard', () => {
  const lc = new LongCountFactory().parse(
    '1.2.*.4.5',
  );
  const potentialLcs = new LongCountWildcard(lc).run();
  expect(potentialLcs).to.have.lengthOf(20);
});

it('compute short single wildcard', () => {
  const lc = new LongCountFactory().parse(
    '1.2.3.*.5',
  );
  const potentialLcs = new LongCountWildcard(lc).run();
  expect(potentialLcs).to.have.lengthOf(15);
});

it('compute double wildcard', () => {
  const lc = new LongCountFactory().parse(
    '1.2.*.*.5',
  );
  const potentialLcs = new LongCountWildcard(lc).run();
  expect(potentialLcs).to.have.lengthOf(300);
});
