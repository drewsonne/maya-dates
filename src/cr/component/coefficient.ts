import {isWildcard, Wildcard} from "../../wildcard";
import WildcardCoefficient from "./wildcardCoefficient";
import NumberCoefficient from "./numberCoefficient";
import ICoefficient from "./iCoefficient";


const coefficientNumberCoefficient: { [key: string]: ICoefficient } = {}

function coefficientParser(rawCoefficient: number | string | Wildcard): ICoefficient {
  const hash = `${rawCoefficient}`
  if (coefficientNumberCoefficient[hash] === undefined) {
    if (isWildcard(rawCoefficient)) {
      coefficientNumberCoefficient[hash] = new WildcardCoefficient()
    } else if (typeof rawCoefficient == 'number') {
      coefficientNumberCoefficient[hash] = new NumberCoefficient(rawCoefficient)
    } else {
      if (rawCoefficient == '*') {
        coefficientNumberCoefficient[hash] = new WildcardCoefficient()
      } else if (!isNaN(+rawCoefficient)) {
        coefficientNumberCoefficient[hash] = new NumberCoefficient(+rawCoefficient)
      } else {
        throw new Error("String coefficient is neither wildcard nor numeric")
      }
    }
  }
  return coefficientNumberCoefficient[hash]
}

export {
  coefficientParser
}
