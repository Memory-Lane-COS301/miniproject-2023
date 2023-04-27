import { IComment } from '@mp/api/memories/util';
import { IProfile } from '@mp/api/profiles/util';
import { IUser } from '@mp/api/users/util';

export class GetUserProfileRequest {
  static readonly type = '[UserView] GetUserProfileRequest';
  constructor(public readonly user: IUser) {}
}

export class SetUserView {
  static readonly type = '[UserView] SetUserView';
  constructor(public readonly profile: IProfile) {}
}

export class CreateFriendRequest {
  static readonly type = '[UserView] CreateFriendRequest';
  constructor(public readonly friend: IUser) {}
}

export class DeleteFriendRequest {
  static readonly type = '[UserView] DeleteFriendRequest';
  constructor(public readonly friend: IUser) {}
}

export class DeleteFriend {
  static readonly type = '[UserView] DeleteFriend';
  constructor(public readonly friend: IUser) {}
}

export class CheckUserFriendStatus {
  static readonly type = '[UserView] CheckUserFriendStatus';
  constructor(public readonly user: IUser) {};
}

export class GetFriends {
  static readonly type = '[UserView] GetFriends';
}

export class SetUserViewBooleans {
  static readonly type = '[UserView] SetUserViewBooleans';
  constructor(public readonly _isFriends: boolean, public readonly _isWaitingRequest: boolean,public readonly _isNotFriends: boolean ) {}
}