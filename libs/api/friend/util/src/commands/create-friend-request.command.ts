import { ICreateFriendRequest } from '../requests';

export class CreateFriendRequestCommand {
  constructor(public readonly request: ICreateFriendRequest) {}
}
