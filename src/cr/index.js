/** @ignore */
const getCalendarRound = require('./calendar-round');
const tzolkin = require('./tzolkin');
const haab = require('./haab');

const origin = getCalendarRound(
  4, 'Ajaw',
  8, 'Kumk\'u',
);

module.exports = {
  getCalendarRound,
  tzolkin,
  haab,
  origin,
};
