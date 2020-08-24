export class Comment {
  content: string;

  constructor(content: string) {
    this.content = content
  }

  merge(other: Comment): Comment {
    return new Comment(`${this} ${other}`)
  }

  toString(): string {
    return this.content
  }
}

export function isComment(c: any): c is Comment {
  return c instanceof Comment
}
