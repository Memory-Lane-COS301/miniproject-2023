import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { IProfile, IGetProfileRequest } from "@mp/api/profiles/util"
import { AddNewMemory, ChangeProfileViewImage, CreateCommentRequest, GetCommentsRequest, GetProfileRequest, SetProfileView, SubscribeToProfile, UpdateCommentRequest } from "@mp/app/profile-view/util"
import { Injectable } from '@angular/core';
import { AuthState } from '@mp/app/auth/data-access';
import { SetError } from '@mp/app/errors/util';
import { ProfileViewApi } from './profile-view.api';
import produce from 'immer';
import { ICreateCommentRequest, IGetCommentsRequest, IMemory, IUpdateCommentRequest } from '@mp/api/memories/util';
import { IComment } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';
import { user } from '@angular/fire/auth';
import { tap } from 'rxjs';
import { SetViewedComments } from '@mp/app/view-comments/util';
import { SetProfile } from '@mp/app/profile/util';
import { IUser } from '@mp/api/users/util';

export interface ProfileViewStateModel {
    profile: IProfile;
}

@State<ProfileViewStateModel>({
    name: 'profileView',
    defaults: {
        profile: {
            user: null,
            memories: [],

            userId: '',
            accountDetails: null,
            personalDetails:null,
            contactDetails: null,
            addressDetails: null,
            occupationDetails: null,
            status: null,
            created: null,

        }
    },
})

@Injectable()
export class ProfileViewState {
    constructor(
        private readonly profileViewApi: ProfileViewApi,
        private readonly store: Store
    ){}

    @Selector()
    static profileView(state: ProfileViewStateModel) {
        return state.profile;
    }

    @Action(GetProfileRequest)
    async getProfileRequest(ctx: StateContext<ProfileViewStateModel>) {
        try {
            const state = ctx.getState();
            const _userId = state.profile?.userId;
            const _username = state.profile?.accountDetails?.displayName;

            const request: IGetProfileRequest = {
                user: {
                    userId: _userId,
                    username: _username
                }
            }
            const responseRef = await this.profileViewApi.getUserProfile(request);
            const response = responseRef.data;
            return ctx.dispatch(new SetProfileView(response.profile));
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(SetProfileView)
    setProfile(ctx: StateContext<ProfileViewStateModel>, { _profile }: SetProfileView) {
        return ctx.setState(
            produce((draft) => {
                draft.profile = _profile
            })
        );
    }

    @Action(AddNewMemory)
    async addNewMemory(ctx: StateContext<ProfileViewStateModel>, { memory } : AddNewMemory) {
        try {
            const state = ctx.getState();
            state.profile.memories?.unshift(memory);

            return this.store.dispatch(new SetProfileView(state.profile));
        }
        catch (error) {
            return this.store.dispatch(new SetError('Unabled to add new memory to Profile View page.'));
        }
    }

    @Action(ChangeProfileViewImage)
    async changeProfileViewImage(ctx: StateContext<ProfileViewStateModel>, { imageUrl, id } : ChangeProfileViewImage) {
        try {
            const state = ctx.getState();

            const updated_user : IUser = {
                userId: state.profile.userId,
                name: state.profile.user?.name,
                surname: state.profile.user?.surname,
                username: state.profile.user?.username,
                email: state.profile.user?.email,
                profileImgUrl: imageUrl,
                bio: state.profile.user?.bio,
                friendCount: state.profile.user?.friendCount,
                memoryCount: state.profile.user?.memoryCount,
                accountTime: state.profile.user?.accountTime,
                lastOnline: state.profile.user?.lastOnline,
                online: state.profile.user?.online,
                created: state.profile.user?.created
            }

            const response : IProfile = {
                userId: id,
                user: updated_user,
                memories: state.profile.memories
            }


            return this.store.dispatch(new SetProfileView(response));
        }
        catch (error) {
            return this.store.dispatch(new SetError('Unabled to add new memory to Profile View page.'));
        }
    }

    @Action(GetCommentsRequest)
    async getCommentsRequest(ctx: StateContext<ProfileViewStateModel>, { memory }: GetCommentsRequest) {
        try {
            const state = ctx.getState();
            const _userId = memory.userId;

            const _memoryId = memory.memoryId;

            const request: IGetCommentsRequest = {
                memory: {
                    userId: _userId,
                    memoryId: _memoryId
                }
            }
            const responseRef = await this.profileViewApi.getComments(request);
            const response : IMemory = {
                ...memory,
                comments: responseRef.data.comments
            };

            //we need to update the profile state's comments
            state.profile.memories?.map((mem) => {
                if (mem.memoryId === memory.memoryId) {
                    return {
                        ...mem,
                        comments: response.comments
                    }
                }
                return mem;
            });

            return ctx.dispatch([new SetProfileView(state.profile), new SetViewedComments(response)]);
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(CreateCommentRequest) 
    async createCommentRequest(ctx: StateContext<ProfileViewStateModel>, { memory }: GetCommentsRequest, action: CreateCommentRequest) {
        try{
            const state = ctx.getState();
            const _userId = memory.userId;
            const _memoryId = memory.memoryId;
            const _text = action.comment.text;

            const request : ICreateCommentRequest = {
                comment: {
                    userId: _userId,
                    memoryId: _memoryId,
                    text: _text
                }
            }

            const responseRef = await this.profileViewApi.createComment(request);
            memory.comments?.push(responseRef.data.comment);

            const response : IMemory = {
                ...memory,
                comments: memory.comments
            };

            state.profile.memories?.map((mem) => {
                if (mem.memoryId === memory.memoryId) {
                    return response;
                }
                return mem;
            });
            
            return ctx.dispatch([new SetProfileView(state.profile), new SetViewedComments(response)]);
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(UpdateCommentRequest) 
    async updateCommentRequest(ctx: StateContext<ProfileViewStateModel>, { memory }: GetCommentsRequest, action: UpdateCommentRequest) {
        try{
            const state = ctx.getState();
            const _userId = memory.userId;
            const _memoryId = memory.memoryId;
            const _text = action.comment.text;

            const request : IUpdateCommentRequest = {
                comment: {
                    userId: _userId,
                    memoryId: _memoryId,
                    text: _text
                }
            }

            const responseRef = await this.profileViewApi.updateComment(request);
            memory.comments?.push(responseRef.data.comment);

            const response : IMemory = {
                ...memory,
                comments: memory.comments
            };

            state.profile.memories?.map((mem) => {
                if (mem.memoryId === memory.memoryId) {
                    return response;
                }
                return mem;
            });
            
            return ctx.dispatch([new SetProfileView(state.profile), new SetViewedComments(response)]);
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    // @Action(CreateFriendRequest) 
    // async createFriendRequest(ctx: StateContext<ProfileViewStateModel>, action: CreateFriendRequest) {
    //     try{
    //         const state = ctx.getState();

    //         const request : IUser = { //data needs to be added
    //             userId: '',
    //         }

    //         const responseRef = this.profileViewApi.createFriendRequest(request);
    //         const response = response.data;
    //         return ctx.dispatch(new SetProfileView(response.profile));
    //     }
    //     catch (error) {
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    // @Action(UpdateFriendRequest) 
    // async updateFriendRequest(ctx: StateContext<ProfileViewStateModel>, action: UpdateFriendRequest) {
    //     try{
    //         const state = ctx.getState();

    //         const request : IUser = { //data needs to be added
    //             userId: '',
    //         }

    //         const responseRef = this.profileViewApi.updateFriendRequest(request);
    //         const response = response.data;
    //         return ctx.dispatch(new SetProfileView(response.profile));
    //     }
    //     catch (error) {
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    @Action(SubscribeToProfile)
    subscribeToProfile(ctx: StateContext<ProfileViewStateModel>) {
        const user = this.store.selectSnapshot(AuthState.user);
        if (!user) return ctx.dispatch(new SetError('User not set'));

        return this.profileViewApi
        .profileView$(user.uid)
        .pipe(tap((profile: IProfile) => ctx.dispatch(new SetProfileView(profile))));
    }
}
