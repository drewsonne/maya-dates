import {Wildcard} from "../wildcard";
import LongCount from "../lc/long-count";

export default interface ILongcount {
  new (...cycles: (number | Wildcard)[]): LongCount
}
