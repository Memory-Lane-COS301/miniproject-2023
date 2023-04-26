import { IGetPendingFriendRequest } from '../requests';

export class GetPendingFriendsQuery {
  constructor(public readonly request: IGetPendingFriendRequest) {}
}
