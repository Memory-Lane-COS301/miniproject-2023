import { IGetUserRequest } from '../requests';

export class GetUserQuery {
  constructor(public readonly request: IGetUserRequest) {}
}
