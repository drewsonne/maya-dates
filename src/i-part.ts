
/**
 * Minimal interface used for equality comparison across calendar components.
 */
export interface IPart {
  /**
   * Compare this object with another for equality.
   */
  equal(other: unknown): boolean;
}

/**
 * Type guard to ensure a value implements {@link IPart}.
 *
 * @param o - Value to test.
 * @returns True if `o` implements `IPart`.
 */
export function isPart(o: unknown): o is IPart {
  return (typeof o === 'object' && o !== null && 'equal' in o && typeof (o as IPart).equal === 'function');
}
