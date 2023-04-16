import { IComment } from "@mp/api/memories/util";
import { IProfile } from "@mp/api/profiles/util";
import { IUser } from "@mp/api/users/util";

export interface UserViewStateModel {
    userProfile: IProfile;
}

export class GetUserProfileRequest {
    static readonly type = '[UserView] GetUserProfileRequest';
    constructor(public readonly user: UserViewStateModel) {}
}

export class SetUserView {
    static readonly type = '[UserView] SetUserView';
    constructor(public readonly profile: IProfile) {}
}

export class CreateFriendRequest {
    static readonly type = '[UserView] CreateFriendRequest';
    constructor(public readonly sender: IUser, receiver: IUser) {}
}

// export class UpdateFriendRequest {
//     static readonly type = '[UserView] UpdateFriendRequest';
//     constructor(public readonly status: string) {}
// }