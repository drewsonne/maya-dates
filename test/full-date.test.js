import mayadate from '../src/index';

test('full date rendering', () => {
  const fullDate = new mayadate.factory.FullDateFactory()
    .parse('1Ok * * 9.*.10.10.10');
  expect(`${fullDate}`).toBe('1 Ok * *  9. *.10.10.10');
});

// const stream = [
//   new Text('13Imix'),
//   new Text('4Muwan'),
//   new Numeric('1.1.2.1')
// ];


test('full date equlaity', () => {
  const fullDates = [
    [
      '13 Imix 4 Muwan 1.1.2.1',
    ]
  ]
})
