import { IUser } from '@mp/api/users/util';

export class Logout {
  static readonly type = '[Profile] Logout';
}

export class SubscribeToUser {
  static readonly type = '[Profile] SubscribeToUser';
}

export class SetUser {
  static readonly type = '[Profile] SetUser';
  constructor(public readonly user: IUser | null) {}
}
export class SetUserDetailsForm {
  static readonly type = '[Profile] SetUserDetailsForm';
  constructor(public readonly user: IUser | null) {}
}

export class UpdateUserDetails {
  static readonly type = '[Profile] UpdateUserDetails';
}
