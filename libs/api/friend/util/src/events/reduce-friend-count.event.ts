import { IFriendRequest } from '../interfaces';

export class ReduceFriendCountEvent {
  constructor(public readonly request: IFriendRequest) {}
}
