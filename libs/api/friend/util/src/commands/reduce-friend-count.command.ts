import { IFriendRequest } from '../interfaces';

export class ReduceFriendCountCommand {
  constructor(public readonly request: IFriendRequest) {}
}
