import { IComment } from "@mp/api/memories/util";
import { IProfile } from "@mp/api/profiles/util";
import { IUser } from "@mp/api/users/util";

export class GetProfileRequest {
    static readonly type = '[ProfileView] GetProfileRequest';
}

export class SetProfileView {
    static readonly type = '[ProfileView] SetProfileView';
    constructor(public readonly profile: IProfile) {}
}

export class GetCommentsRequest {
    static readonly type = '[ProfileView] GetCommentsRequest';
}

export class CreateCommentRequest {
    static readonly type = '[ProfileView] CreateCommentRequest';
    constructor(public readonly comment: IComment) {}
}

export class UpdateCommentRequest {
    static readonly type = '[ProfileView] UpdateCommentRequest';
    constructor(public readonly comment: IComment) {}
}

export class CreateFriendRequest {
    static readonly type = '[ProfileView] CreateFriendRequest';
    constructor(public readonly friend: IUser) {}
}

export class UpdateFriendRequest {
    static readonly type = '[ProfileView] UpdateFriendRequest';
    constructor(public readonly friend: IUser) {}
}

export class SubscribeToProfile {
    static readonly type = '[ProfileView] SubscribeToProfile';
}