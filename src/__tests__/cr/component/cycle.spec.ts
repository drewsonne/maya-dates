import 'mocha'
import {expect} from 'chai'
import {Cycle, singletonGenerator} from "../../../cr/component/cycle";
import HashMap from "../../../structs/hashMap";
import {Wildcard} from "../../../wildcard";

it('object creation', () => {
  const mockCycle = new HashMap([
    undefined,
    'hallo',
    'world',
    'mock',
    'foobar'
  ]);

  const getMockObject = singletonGenerator<MockCycle>(
    mockCycle,
    (name: string) => new MockCycle(name, mockCycle)
  );

  class MockCycle extends Cycle<MockCycle> {

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
  const first = mock.shift(1);
  const next = mock.next();
  const third = mock.shift(3);

  expect(mock.position).to.equal(3);
  expect(`${mock}`).to.equal('mock');
  expect(`${first}`).to.equal('foobar');
  expect(`${third}`).to.equal('world');
  expect(first).to.equal(next);
});
