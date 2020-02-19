import CalendarRoundFactory from './calendar-round';
import LongCountFactory from './long-count';
import FullDate from '../full-date';

/**
 * Given a fullDate composed of a Long Count and a Calendar Round, create a
 * {FullDate} object.
 * @extends {Factory}
 */
export default class FullDateFactory {
  /**
   *
   * @param {String} raw
   * @return {FullDate}
   */
  // eslint-disable-next-line class-methods-use-this
  parse(raw) {
    const cleanedRaw = raw.replace('**', '* *');
    const cr = new CalendarRoundFactory().parse(cleanedRaw);
    const lc = new LongCountFactory().parse(cleanedRaw);
    return new FullDate(
      cr,
      lc
    );
  }
}
