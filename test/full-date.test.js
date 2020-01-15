const mayadate = require('../src/index');

test('full date rendering', () => {
  const fullDate = new mayadate.factory.FullDateFactory()
    .parse('1Ok * * 9.*.10.10.10');
  expect(`${fullDate}`).toBe('1 Ok * *  9. *.10.10.10');
});
