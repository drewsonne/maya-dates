import {Wildcard} from "../../wildcard";
import WildcardCoefficient from "./wildcardCoefficient";
import NumberCoefficient from "./numberCoefficient";
import ICoefficient from "./iCoefficient";

function coefficientParser(rawCoefficient: number | string | Wildcard): ICoefficient {
  if (rawCoefficient instanceof Wildcard) {
    return new WildcardCoefficient()
  } else if (typeof rawCoefficient == 'number') {
    return new NumberCoefficient(rawCoefficient)
  } else if (typeof rawCoefficient == 'string') {
    if (rawCoefficient == '*') {
      return new WildcardCoefficient()
    } else if (!isNaN(+rawCoefficient)) {
      return new NumberCoefficient(+rawCoefficient)
    } else {
      throw new Error("String coefficient is neither wildcard nor numeric")
    }
  } else {
    throw new Error("Unexpected coefficient type")
  }
}

export {
  coefficientParser
}
