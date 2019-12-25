const mayadates = require('../src/index')

test('compute missing single wildcard', () => {
  let cr = new mayadates.factory.CalendarRoundFactory().
    parse('12Imix * Pop')
  let potential_crs = new mayadates.op.CalendarRoundWildcard(cr).
    run()
  expect(potential_crs.length).toBe(4)
})

test('partial matcher', () => {
  
})
