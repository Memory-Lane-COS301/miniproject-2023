import { Timestamp } from 'firebase-admin/firestore';
import { IComment } from '@mp/api/comments/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Comment extends AggregateRoot implements IComment {
  constructor(
    public userId: string | null | undefined,
    public displayName: string | null | undefined,
    public imgUrl: string | null | undefined,
    public text: string | null | undefined,
    public created: Timestamp | null | undefined,
  ) {
    super();
  }

  static fromData(comment: IComment): Comment {
    const instance = new Comment(comment.userId, comment.displayName, comment.imgUrl, comment.text, comment.created);
    return instance;
  }

  toJSON(): IComment {
    return {
      userId: this.userId,
      displayName: this.displayName,
      imgUrl: this.imgUrl,
      text: this.text,
      created: this.created,
    };
  }
}
