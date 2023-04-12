import { IUser } from '../interfaces';

export class UserDeletedEvent {
  constructor(public readonly user: IUser) {}
}
