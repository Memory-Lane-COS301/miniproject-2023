import { ICreateFriendRequest } from '../requests';

export class CreateFriendCommand {
  constructor(public readonly request: ICreateFriendRequest) {}
}
