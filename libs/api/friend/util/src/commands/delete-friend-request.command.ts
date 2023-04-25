import { IDeleteFriendRequest } from '../requests';

export class DeleteFriendRequestCommand {
  constructor(public readonly request: IDeleteFriendRequest) {}
}
