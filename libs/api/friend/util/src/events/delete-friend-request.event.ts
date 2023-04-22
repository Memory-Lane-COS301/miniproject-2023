import { IFriendRequest } from '../interfaces';

export class DeleteFriendRequestEvent {
  constructor(public readonly friendRequest: IFriendRequest) {}
}
