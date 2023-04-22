import { IUser } from "@mp/api/users/util";

export class SetEditProfileImageUserId {
    static readonly type = '[EditProfileImage] SetEditProfileImageUserId';
    constructor(public readonly userId: string) {}
}

export class SetEditProfileImageState {
    static readonly type = '[EditProfileImage] SetEditProfileImageState';
    constructor(public readonly user: IUser) {}
}

export class SetEditProfileImagePhoto{
    static readonly type = '[EditProfileImage] SetEditProfileImagePhoto';
    constructor(public readonly imgUrl: string | null | undefined) {}
}