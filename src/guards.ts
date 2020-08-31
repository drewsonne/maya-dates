export function isNumberPrimitive(x: any): x is number {
  return typeof x === "number";
}

export function isStringPrimitive(x: any): x is string {
  return typeof x === "string";
}
