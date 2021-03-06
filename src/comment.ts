export class Comment {
  content: string;

  constructor(content: string) {
    this.content = content
  }

  merge(other: Comment): Comment {
    return new Comment(`${this} ${other}`)
  }

  empty(): boolean {
    return this.content.length == 0
  }

  equals(otherComment: Comment): boolean {
    return this.content === otherComment.content;
  }

  toString(): string {
    return this.content
  }
}

export function isComment(c: any): c is Comment {
  return c instanceof Comment
}
