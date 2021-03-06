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
  parse(raw: string) {
    raw = raw.replace('**', '* *');
    const cr = new CalendarRoundFactory().parse(raw);
    const lc = new LongCountFactory().parse(raw);
    return new FullDate(
      cr,
      lc
    );
  }
}
