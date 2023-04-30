import { IFriendRequest } from '../interfaces';

export class UpdateAcceptFriendRequestEvent {
  constructor(public readonly friendRequest: IFriendRequest) {}
}
