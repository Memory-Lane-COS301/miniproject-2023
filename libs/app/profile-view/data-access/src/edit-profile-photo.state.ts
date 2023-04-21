import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { IProfile, IGetProfileRequest } from "@mp/api/profiles/util"
import { CreateCommentRequest, GetCommentsRequest, GetProfileRequest, SetProfileView } from "@mp/app/profile-view/util"
import { Injectable } from '@angular/core';
import { AuthState } from '@mp/app/auth/data-access';
import { SetError } from '@mp/app/errors/util';
import { ProfileViewApi } from './profile-view.api';
import produce from 'immer';
import { IMemory } from '@mp/api/memories/util';
import { IComment } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';
import { EditProfilePhotoApi } from './edit-profile-photo.api';
import { IUser } from '@mp/api/users/util';

export interface EditProfilePhotoModel {
    user: IUser;
}

@State<EditProfilePhotoModel>({
    name: 'editProfilePhoto',
    defaults: {
        user: {
            userId: '',
            name: null,
            surname: null,
            username: null,
            email: null,
            profileImgUrl: null,
            bio: null,
            friendCount: null,
            memoryCount: null,
            accountTime: null,
            lastOnline: null,
            online: null, // requires clarification
            created: null,
        }
    },
})

@Injectable()
export class EditProfilePhotoState {
    constructor(
        private readonly editProfilePhotoApi: EditProfilePhotoApi,
        private readonly store: Store
    ){}

    @Selector()
    static editProfilePhoto(state: EditProfilePhotoModel) {
        return state.user;
    }

    @Action(GetProfileRequest)
    async getProfileRequest(ctx: StateContext<EditProfilePhotoModel>) {
        try {
            const state = ctx.getState();
            const _userId = state.user.userId;
            const _username = state.user.username;
            const _profileImgUrl = state.user.profileImgUrl;

            const request: IGetProfileRequest = {
                user: {
                    userId: _userId,
                    username: _username,
                    profileImgUrl: _profileImgUrl
                }
            }
            const responseRef = await this.editProfilePhotoApi.getUserProfile(request);
            const response = responseRef.data;
            return ctx.dispatch(new SetProfileView(response.profile.userId, undefined, undefined, response.profile.user?.profileImgUrl ?? ''));
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    // @Action(SetProfileView)
    // setProfile(ctx: StateContext<ProfileViewStateModel>, { id, _profile, memory }: SetProfileView) {
    //     const state = ctx.getState();
    //     const profile = state.profile;

    //     if (_profile && !memory) {
    //         return ctx.setState(
    //             produce((draft) => {
    //                 draft.profile = {
    //                 ...profile,
    //                 userId: id,
    //                 };
    //             })
    //         );
    //     }
    //     else {
    //         if (memory) {
    //             profile.memories?.push(memory);
    //             return ctx.setState(
    //                 produce((draft) => {
    //                     draft.profile = {
    //                     ...profile,
    //                     userId: id,
    //                     memories: profile.memories
    //                     };
    //                 })
    //             );
    //         }
    //         else return ctx.dispatch('Memory is undefined');
    //     }
    // }
}
