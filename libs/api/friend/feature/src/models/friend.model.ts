import { IFriend, FriendCreatedEvent } from '@mp/api/friend/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class Friend extends AggregateRoot implements IFriend {
  constructor(public userId1?: string, public userId2?: string, public created?: Timestamp) {
    super();
  }

  static fromData(friend: IFriend): Friend {
    const instance = new Friend(friend.userId1, friend.userId2, friend.created);
    return instance;
  }

  create() {
    this.apply(new FriendCreatedEvent(this.toJSON()));
  }

  toJSON(): IFriend {
    return {
      userId1: this.userId1,
      userId2: this.userId2,
      created: this.created,
    };
  }
}
