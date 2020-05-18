import 'mocha'
import {expect} from 'chai'
import Base from "../../../cr/component/base";
import {Wildcard} from "../../../wildcard";

it('object creation', () => {
  class Mock extends Base {
  }

  const mock = new Mock(new Wildcard());
  expect(mock.isWildcard()).to.be.true
});
