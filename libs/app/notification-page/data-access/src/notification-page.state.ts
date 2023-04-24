import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { IComment } from '@mp/api/memories/util';
import { IUser } from '@mp/api/users/util';
import { NotificationPageApi } from './notification-page.api';

export interface NotificationPageStateModel {
    friendsRequests: IUser[] | null | undefined;
    commentNotifications: IComment[] | null | undefined,
}

@State<NotificationPageStateModel>({
    name: 'NotificationPage',
    defaults: {
        friendsRequests: [],
        commentNotifications: []
    }
})

@Injectable()
export class NotificationPageState {
    
    constructor(
        private readonly notificationPageApi: NotificationPageApi,
        private readonly store: Store
    ) {}

    // @Action(SetProfileView)
    // setProfile(ctx: StateContext<ProfileViewStateModel>, { _profile }: SetProfileView) {
    //     return ctx.setState(
    //         produce((draft) => {
    //             draft.profile = _profile
    //         })
    //     );
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