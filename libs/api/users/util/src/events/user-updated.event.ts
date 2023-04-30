import { IUser } from '../interfaces';

export class UserUpdatedEvent {
  constructor(public readonly user: IUser) {}
}
