import { IComment } from '@mp/api/memories/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Comment extends AggregateRoot implements IComment {
  constructor(public userId: string, public username: string, public profileImgUrl: string, public comment: string) {
    super();
  }

  static fromData(comment: IComment): Comment {
    const instance = new Comment(comment.userId, comment.username, comment.profileImgUrl, comment.comment);
    return instance;
  }

  toJSON(): IComment {
    return {
      userId: this.userId,
      username: this.username,
      profileImgUrl: this.profileImgUrl,
      comment: this.comment,
    };
  }
}
