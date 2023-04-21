import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { IProfile, IGetProfileRequest } from "@mp/api/profiles/util"
import { CreateCommentRequest, GetCommentsRequest, GetProfileRequest, ReviveMemory, SetProfileView } from "@mp/app/profile-view/util"
import { Injectable } from '@angular/core';
import { AuthState } from '@mp/app/auth/data-access';
import { SetError } from '@mp/app/errors/util';
import { ProfileViewApi } from './profile-view.api';
import produce from 'immer';
import { IMemory } from '@mp/api/memories/util';
import { IComment } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';
import { ReviveMemoryApi } from './revive-memory.api';

export interface ReviveMemoryStateModel {
    memory: IMemory;
}

@State<ReviveMemoryStateModel>({
    name: 'reviveMemory',
    defaults: {
        memory: {
            userId: null,
            memoryId: null,
            username: null,
            title: null,
            description: null,
            imgUrl: null,
            profileImgUrl: null,
            created: null,
            commentsCount: null,
            remainingTime: null,
            alive: false,
            comments: []
        }
    },
})

@Injectable()
export class ReviveMemoryState {
    constructor(
        private readonly reviveMemoryApi: ReviveMemoryApi,
        private readonly store: Store
    ){}

    @Selector()
    static reviveMemory(state: ReviveMemoryStateModel) {
        return state.memory;
    }

    // @Action(GetProfileRequest)
    // async getProfileRequest(ctx: StateContext<ReviveMemoryStateModel>) {
    //     try {
    //         const state = ctx.getState();
    //         const _userId = state.memory.userId;
    //         const _username = state.memory.username;
    //         const _title = state.memory.title;
    //         const _description = state.memory.description;
    //         const _imgUrl = state.memory.imgUrl;

    //         const request: IGetProfileRequest = {
    //             user: {
    //                 userId: _userId,
    //                 username: _username
    //             }
    //         }
    //         const responseRef = await this.profileViewApi.getUserProfile(request);
    //         const response = responseRef.data;
    //         return ctx.dispatch(new SetProfileView(response.profile.userId, response.profile));
    //     }
    //     catch(error){
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }
    // @Action(ReviveMemory)
    // async reviveMemory(ctx: StateContext<ReviveMemoryStateModel>, { memory } : ReviveMemory) {
    //     try {
    //         const _userId = memory.userId;
    //         const _title = memory.title;
    //         const _description = memory.description;
    //         const _imgUrl = memory.imgUrl;
    //         const _alive = memory.alive;

    //         const request: IReviveMemoryRequest = {
    //             memory: {
    //                 userId: _userId,
    //                 title: _title,
    //                 description: _description,
    //                 imgUrl: _imgUrl,
    //                 alive: _alive,
    //             }
    //         }
    //         const responseRef = await this.reviveMemoryApi.reviveMemory(request);
    //         const response = responseRef.data;
    //         return ctx.dispatch(
    //             new SetProfileView(response.memory?.userId ?? '', undefined, response.memory)
    //         );
    //     }
    //     catch(error){
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }




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
}
