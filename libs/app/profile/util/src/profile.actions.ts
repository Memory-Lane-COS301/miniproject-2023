import { IProfile } from '@mp/api/profiles/util';
import { IUser } from '@mp/api/users/util';

export class Logout {
  static readonly type = '[Profile] Logout';
}

export class SubscribeToProfile {
  static readonly type = '[Profile] SubscribeToProfile';
}

export class SubscribeToUser {
  static readonly type = '[Profile] SubscribeToUser';
}

export class SetProfile {
  static readonly type = '[Profile] SetProfile';
  constructor(public readonly profile: IProfile | null) {}
}

export class SetUser {
  static readonly type = '[Profile] SetUser';
  constructor(public readonly user: IUser | null) {}
}

export class UpdateUserDetails {
  static readonly type = '[Profile] UpdateUserDetails';
}
export class UpdateAccountDetails {
  static readonly type = '[Profile] UpdateAccountDetails';
}

export class UpdateAddressDetails {
  static readonly type = '[Profile] UpdateAddressDetails';
}

export class UpdateContactDetails {
  static readonly type = '[Profile] UpdateContactDetails';
}

export class UpdateOccupationDetails {
  static readonly type = '[Profile] UpdateOccupationDetails';
}

export class UpdatePersonalDetails {
  static readonly type = '[Profile] UpdatePersonalDetails';
}
