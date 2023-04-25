import { IUpdateUserRequest } from '../requests';

export class UpdateUserCommand {
  constructor(public readonly request: IUpdateUserRequest) {}
}
