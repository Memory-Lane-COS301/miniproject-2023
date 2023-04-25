import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { IComment } from '@mp/api/memories/util';
import { IUser } from '@mp/api/users/util';
import { NotificationPageApi } from './notification-page.api';
import {
    SetNotificationPage,
    AddNewFriendRequest,
    UpdateFriendRequest,
    AddNewComment,
    DeleteFriendRequest
} from '@mp/app/notification-page/util';

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

    @Selector()
    static friendRequests(state: NotificationPageStateModel) {
        return state.friendsRequests;
    }

    @Selector()
    static comments(state: NotificationPageStateModel) {
        return state.commentNotifications;
    }

    @Action(SetNotificationPage)
    setNotificationPage(ctx: StateContext<NotificationPageStateModel>, { friendRequests, comments }: SetNotificationPage) {
        return ctx.setState(
            produce((draft) => {
                draft.friendsRequests = friendRequests,
                draft.commentNotifications = comments
            })
        );
    }

    @Action(AddNewFriendRequest) 
    async addNewFriendRequest(ctx: StateContext<NotificationPageStateModel>, { friend } : AddNewFriendRequest) {
        try{
            const state = ctx.getState();

            state.friendsRequests?.unshift(friend);

            return ctx.dispatch(new SetNotificationPage(state.friendsRequests, state.commentNotifications));
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(UpdateFriendRequest) 
    async updateFriendRequest(ctx: StateContext<NotificationPageStateModel>, { friend } : UpdateFriendRequest) {
        try{
            const state = ctx.getState();

            state.friendsRequests = state.friendsRequests?.map((old_friend) => {
                if (old_friend.userId === friend.userId) {
                    return friend;
                }

                return old_friend;
            })

            return this.store.dispatch(new SetNotificationPage(state.friendsRequests, state.commentNotifications));
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(DeleteFriendRequest) 
    async DeleteFriendRequest(ctx: StateContext<NotificationPageStateModel>, { friend } : DeleteFriendRequest) {
        try{
            const state = ctx.getState();

            state.friendsRequests = state.friendsRequests?.filter((old_friend) => {
                return old_friend.userId != friend.userId;
            })

            return this.store.dispatch(new SetNotificationPage(state.friendsRequests, state.commentNotifications));
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(AddNewComment) 
    async addNewComment(ctx: StateContext<NotificationPageStateModel>, { comment } : AddNewComment) {
        try{
            const state = ctx.getState();

            state.commentNotifications?.unshift(comment);

            return ctx.dispatch(new SetNotificationPage(state.friendsRequests, state.commentNotifications));
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }
}