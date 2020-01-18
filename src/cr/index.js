/** @ignore */
const getCalendarRound = require('./calendar-round');
/** @ignore */
const tzolkin = require('./tzolkin');
/** @ignore */
const haab = require('./haab');

/** @ignore */
const origin = getCalendarRound(
  4, 'Ajaw',
  8, 'Kumk\'u'
);

module.exports = {
  getCalendarRound,
  tzolkin,
  haab,
  origin
};
