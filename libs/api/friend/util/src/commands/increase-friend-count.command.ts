import { IFriendRequest } from '../interfaces';

export class IncreaseFriendCountCommand {
  constructor(public readonly request: IFriendRequest) {}
}
