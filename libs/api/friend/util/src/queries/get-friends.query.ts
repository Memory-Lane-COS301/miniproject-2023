import { IGetFriendsRequest } from '../requests';

export class GetFriendsQuery {
  constructor(public readonly request: IGetFriendsRequest) {}
}
