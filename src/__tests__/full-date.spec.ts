import FullDateFactory from "../factory/full-date";
import 'mocha'
import {expect} from 'chai'

it('full date rendering', () => {
  const fullDate = new FullDateFactory()
    .parse('1Ok * * 9.*.10.10.10');
  expect(`${fullDate}`).to.equal('1 Ok * *  9. *.10.10.10');
});
