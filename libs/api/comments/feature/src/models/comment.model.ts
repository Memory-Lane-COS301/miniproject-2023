import { Timestamp } from 'firebase-admin/firestore';
import { IComment } from '@mp/api/comments/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Comment extends AggregateRoot implements IComment {
  constructor(
    public userId?: string | null | undefined,
    public commentId?: string | null | undefined,
    public username?: string | null | undefined,
    public profileImgUrl?: string | null | undefined,
    public text?: string | null | undefined,
    public created?: Timestamp | null | undefined,
  ) {
    super();
  }

  static fromData(comment: IComment): Comment {
    const instance = new Comment(
      comment.userId,
      comment.commentId,
      comment.username,
      comment.profileImgUrl,
      comment.text,
      comment.created
    );
    return instance;
  }

  toJSON(): IComment {
    return {
      userId: this.userId,
      commentId: this.userId,
      username: this.username,
      profileImgUrl: this.profileImgUrl,
      text: this.text,
      created: this.created,
    };
  }
}
