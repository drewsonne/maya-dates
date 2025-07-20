
/**
 * Minimal interface used for equality comparison across calendar components.
 */
export interface IPart {
  /**
   * Compare this object with another for equality.
   */
  equal(other: any): boolean;
}

/**
 * Type guard to ensure a value implements {@link IPart}.
 *
 * @param o - Value to test.
 * @returns True if `o` implements `IPart`.
 */
export function isPart(o: any): o is IPart {
  return ((o as IPart).equal !== undefined)
}
