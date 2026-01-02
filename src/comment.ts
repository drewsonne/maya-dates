/**
 * Represents a free form comment that can be attached to many structures.
 */
export class Comment {
  /** Raw text content. */
  content: string;

  /**
   * Create a new comment.
   *
   * @param content - Initial comment text.
   */
  constructor(content: string) {
    this.content = content
  }

  /**
   * Merge this comment with another, returning a new comment instance.
   */
  merge(other: Comment): Comment {
    return new Comment(`${this} ${other}`)
  }

  /**
   * Determine whether the comment is empty.
   */
  empty(): boolean {
    return this.content.length == 0
  }

  /**
   * Compare two comments by their text content.
   */
  equals(otherComment: Comment): boolean {
    return this.content === otherComment.content;
  }

  /**
   * Convert the comment to a plain string.
   */
  toString(): string {
    return this.content
  }
}

/**
 * Type guard to check if a value is a {@link Comment} instance.
 */
export function isComment(c: unknown): c is Comment {
  return c instanceof Comment
}
