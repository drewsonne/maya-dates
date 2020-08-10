import 'mocha'
import {expect} from 'chai'
import HashMap from "../../../structs/hashMap";
import {Wildcard} from "../../../wildcard";
import Cycle from "../../../cr/component/cycle";

it('cycle object creation', () => {
  const mockCycle = new HashMap([
    undefined,
    'hallo',
    'world',
    'mock',
    'foobar'
  ]);

  function getMockObject(cycleName: Wildcard | number | string): (Cycle | Wildcard) {
    return new MockCycle(cycleName, mockCycle)
  }

  class MockCycle extends Cycle {

    constructor(
      value: number | string | Wildcard,
      lookup: HashMap,
    ) {
      super(value, lookup, getMockObject)
    }

    validate(): boolean {
      return false;
    }
  }

  const mock = getMockObject('mock');
  expect(mock).to.be.an.instanceOf(MockCycle);
  if (mock instanceof MockCycle) {
    const first = mock.shift(1);
    const next = mock.next();
    const third = mock.shift(3);

    expect(mock.position).to.equal(3);
    expect(`${mock}`).to.equal('mock');
    expect(`${first}`).to.equal('foobar');
    expect(`${third}`).to.equal('world');
    expect(first).to.equal(next);
  }
});
