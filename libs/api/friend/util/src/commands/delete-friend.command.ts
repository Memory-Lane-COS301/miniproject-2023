import { IDeleteFriendRequest } from '../requests';

export class DeleteFriendCommand {
  constructor(public readonly request: IDeleteFriendRequest) {}
}
