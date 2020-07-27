import {Wildcard} from "../wildcard";
import DistanceNumber from "../lc/distance-number";

export default interface ILongcount {
  new (...cycles: (number | Wildcard)[]): DistanceNumber
}
