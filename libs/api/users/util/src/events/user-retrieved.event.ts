import { IUser } from '../interfaces';

export class UserRetrievedEvent {
  constructor(public readonly user: IUser) {}
}
