import { IFriendRequest } from '../interfaces';

export class DeleteFriendEvent {
  constructor(public readonly friendRequest: IFriendRequest) {}
}
