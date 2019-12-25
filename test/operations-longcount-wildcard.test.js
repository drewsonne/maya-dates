const mayadates = require('../src/index')

test('compute missing wildcard', () => {
  let lc = new mayadates.factory.LongCountFactory().parse(
    '1.2.3.4.5')
  let potential_lcs = new mayadates.op.LongCountWildcard(lc).run()
  expect(potential_lcs.length).toBe(1)
})

test('compute long single wildcard', () => {
  let lc = new mayadates.factory.LongCountFactory().parse(
    '1.2.*.4.5')
  let potential_lcs = new mayadates.op.LongCountWildcard(lc).run()
  expect(potential_lcs.length).toBe(20)
})

test('compute short single wildcard', () => {
  let lc = new mayadates.factory.LongCountFactory().parse(
    '1.2.3.*.5')
  let potential_lcs = new mayadates.op.LongCountWildcard(lc).run()
  expect(potential_lcs.length).toBe(15)
})

test('compute double wildcard', () => {
  let lc = new mayadates.factory.LongCountFactory().parse(
    '1.2.*.*.5')
  let potential_lcs = new mayadates.op.LongCountWildcard(lc).run()
  expect(potential_lcs.length).toBe(300)
})
