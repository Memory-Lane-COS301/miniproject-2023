import { IUser, UserCreatedEvent } from '@mp/api/users/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class User extends AggregateRoot implements IUser {
  constructor(
    public userId: string,
    public name?: string | null | undefined,
    public surname?: string | null | undefined,
    public username?: string | null | undefined,
    public email?: string | null | undefined,
    public profileImgUrl?: string | null | undefined,
    public bio?: string | null | undefined,
    public friendCount?: number | null | undefined,
    public memoryCount?: number | null | undefined,
    public accountTime?: number | null | undefined,
    public lastOnline?: Timestamp | null | undefined,
    public online?: boolean | null | undefined,
    public created?: Timestamp | null | undefined,
  ) {
    super();
  }

  static fromData(user: IUser): User {
    const instance = new User(
      user.userId,
      user.name,
      user.surname,
      user.username,
      user.email,
      user.profileImgUrl,
      user.bio,
      user.friendCount,
      user.memoryCount,
      user.accountTime,
      user.lastOnline,
      user.online,
      user.created,
    );
    return instance;
  }

  create() {
    this.apply(new UserCreatedEvent(this.toJSON()));
  }

  toJSON(): IUser {
    return {
      userId: this.userId,
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      profileImgUrl: this.profileImgUrl,
      bio: this.bio,
      friendCount: this.friendCount,
      memoryCount: this.memoryCount,
      accountTime: this.accountTime,
      lastOnline: this.lastOnline,
      online: this.online,
      created: this.created,
    };
  }
}
