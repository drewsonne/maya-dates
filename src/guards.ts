/**
 * Determine if a value is a number primitive.
 *
 * @param x - Value to test.
 */
export function isNumberPrimitive(x: unknown): x is number {
  return typeof x === "number";
}

/**
 * Determine if a value is a string primitive.
 *
 * @param x - Value to test.
 */
export function isStringPrimitive(x: unknown): x is string {
  return typeof x === "string";
}
