import { IFriendRequest } from '../interfaces';

export class IncreaseFriendCountEvent {
  constructor(public readonly request: IFriendRequest) {}
}
