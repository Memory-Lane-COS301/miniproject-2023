import { IFriend } from '../interfaces';

export class FriendCreatedEvent {
  constructor(public readonly friend: IFriend) {}
}
