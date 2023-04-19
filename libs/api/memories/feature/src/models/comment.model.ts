import { Timestamp } from 'firebase-admin/firestore';
import { CommentCreatedEvent, IComment } from '@mp/api/memories/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Comment extends AggregateRoot implements IComment {
  constructor(
    public userId?: string | null | undefined,
    public memoryId?: string | null | undefined,
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
      comment.memoryId,
      comment.commentId,
      comment.username,
      comment.profileImgUrl,
      comment.text,
      comment.created,
    );
    return instance;
  }

  create() {
    this.apply(new CommentCreatedEvent(this.toJSON()));
  }

  toJSON(): IComment {
    return {
      userId: this.userId,
      memoryId: this.memoryId,
      commentId: this.commentId,
      username: this.username,
      profileImgUrl: this.profileImgUrl,
      text: this.text,
      created: this.created,
    };
  }
  
}
