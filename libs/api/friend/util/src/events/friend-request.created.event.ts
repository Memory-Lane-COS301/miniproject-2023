import { IFriendRequest } from '../interfaces';

export class FriendRequestCreatedEvent {
  constructor(public readonly friendRequest: IFriendRequest) {}
}