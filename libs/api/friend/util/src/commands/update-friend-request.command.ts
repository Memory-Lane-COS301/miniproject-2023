import { IUpdateFriendRequest } from '../requests';

export class UpdateFriendRequestCommand {
  constructor(public readonly request: IUpdateFriendRequest) {}
}
