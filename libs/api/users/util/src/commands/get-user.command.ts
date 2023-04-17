import { IGetUserRequest } from '../requests';

export class GetUserCommand {
  constructor(public readonly request: IGetUserRequest) {}
}
