/** @ignore */
const CalendarRound = require('./calendar-round')
module.exports = {
  'CalendarRound': CalendarRound,
  'tzolkin': require('./tzolkin'),
  'haab': require('./haab'),
  'origin': new CalendarRound(
    4, 'Ajaw',
    8, 'Kumk\'u'),
}
