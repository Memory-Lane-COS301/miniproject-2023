import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { IProfile, IGetProfileRequest } from "@mp/api/profiles/util"
import { CreateCommentRequest, GetCommentsRequest, GetProfileRequest, SetProfileView, SubscribeToProfile } from "@mp/app/profile-view/util"
import { Injectable } from '@angular/core';
import { AuthState } from '@mp/app/auth/data-access';
import { SetError } from '@mp/app/errors/util';
import { ProfileViewApi } from './profile-view.api';
import produce from 'immer';
import { IMemory } from '@mp/api/memories/util';
import { IComment } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';
import { user } from '@angular/fire/auth';
import { tap } from 'rxjs';

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
            window.alert(_userId);
            const _username = state.profile?.accountDetails?.displayName;

            const request: IGetProfileRequest = {
                user: {
                    userId: _userId,
                    username: _username
                }
            }
            const responseRef = await this.profileViewApi.getUserProfile(request);
            const response = responseRef.data;
            return ctx.dispatch(new SetProfileView(response.profile.userId, response.profile));
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(SetProfileView)
    setProfile(ctx: StateContext<ProfileViewStateModel>, { id, _profile, memory, imageUrl }: SetProfileView) {
        const state = ctx.getState();
        const profile = state.profile;

        if (_profile && !memory && !imageUrl) {
            return ctx.setState(
                produce((draft) => {
                    draft.profile = {
                    ...profile,
                    userId: id,
                    };
                })
            );
        }
        else if (_profile && memory && !imageUrl) {
            if (memory) {
                profile.memories?.push(memory);
                return ctx.setState(
                    produce((draft) => {
                        draft.profile = {
                        ...profile,
                        userId: id,
                        memories: profile.memories
                        };
                    })
                );
            }
            else return ctx.dispatch('Memory is undefined');
        }
        else if (_profile && !memory && imageUrl) {
            if (imageUrl) {
                return ctx.setState(                    
                    produce((draft) => {
                        draft.profile = {
                        ...profile,
                        userId: id,
                        user: {...user, userId: id, profileImgUrl: imageUrl }
                        };
                    })
                );
            }
            else return ctx.dispatch('Image url is undefined');
        }
        else if (_profile && memory && imageUrl) {
            if (imageUrl) {                
                profile.memories?.push(memory);
                return ctx.setState(                    
                    produce((draft) => {
                        draft.profile = {
                        ...profile,
                        userId: id,
                        memories: profile.memories,
                        user: {...user, userId: id, profileImgUrl: imageUrl }
                        };
                    })
                );
            }
            else return ctx.dispatch('Memory is undefined');
        }
        else {
            return ctx.dispatch(new SetError('Profile not set'));
        }
    }




    // @Action(GetCommentsRequest)
    // getCommentsRequest(ctx: StateContext<ProfileViewStateModel>) {
    //     try {
    //         const state = ctx.getState();
    //         const _userId = state.profile.userId;
    //         const _memories = state.profile?.memories;
            
    //         let _memory: IMemory;
    //         _memories?.map((m)=>{
    //             if (m.userId === _userId){
    //                 _memory = m;
    //             }
    //             return m;
    //         });

    //         const _memoryId = _memory.memoryId;

    //         const request: IGetCommentsRequest = {
    //             memory: {
    //                 userId: _userId,
    //                 memoryId: _memoryId
    //             }
    //         }
    //         const responseRef = await this.profileViewApi.getComments(request);
    //         const response = responseRef.data;
    //         return ctx.dispatch(new SetProfileView(response.profile));
    //     }
    //     catch(error){
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    // @Action(CreateCommentRequest) 
    // async createCommentRequest(ctx: StateContext<ProfileViewStateModel>, action: CreateCommentRequest) {
    //     try{
    //         const state = ctx.getState();

    //         const request : IComment = { //data needs to be added
    //             userId: '',
    //             commentId: '',
    //             username: '',
    //             profileImgUrl: '',
    //             text: '',
    //             created: new Timestamp(0,0)
    //         }

    //         const responseRef = this.profileViewApi.createComment(request);
    //         const response = response.data;
    //         return ctx.dispatch(new SetProfileView(response.profile));
    //     }
    //     catch (error) {
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    // @Action(UpdateCommentRequest) 
    // async updateCommentRequest(ctx: StateContext<ProfileViewStateModel>, action: UpdateCommentRequest) {
    //     try{
    //         const state = ctx.getState();

    //         const request : IComment = { //data needs to be added
    //             userId: '',
    //             commentId: '',
    //             username: '',
    //             profileImgUrl: '',
    //             text: '',
    //             created: new Timestamp(0,0)
    //         }

    //         const responseRef = this.profileViewApi.updateComment(request);
    //         const response = response.data;
    //         return ctx.dispatch(new SetProfileView(response.profile));
    //     }
    //     catch (error) {
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

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
