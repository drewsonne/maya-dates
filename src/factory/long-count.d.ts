import Factory from './base';
import LongCount from '../lc/long-count';
export default class LongCountFactory extends Factory {
    parse(raw: any): LongCount;
}
