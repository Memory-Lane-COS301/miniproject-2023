import { IFriendRequest } from '../interfaces';

export class UpdateRejectFriendRequestEvent {
  constructor(public readonly friendRequest: IFriendRequest) {}
}
