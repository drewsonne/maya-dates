/**
 * Determine if a value is a number primitive.
 *
 * @param x - Value to test.
 */
export function isNumberPrimitive(x: any): x is number {
  return typeof x === "number";
}

/**
 * Determine if a value is a string primitive.
 *
 * @param x - Value to test.
 */
export function isStringPrimitive(x: any): x is string {
  return typeof x === "string";
}
