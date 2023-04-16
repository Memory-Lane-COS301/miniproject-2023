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