import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { IComment, IMemory } from '@mp/api/memories/util';
import { IUser } from '@mp/api/users/util';
import { NotificationPageApi } from './notification-page.api';
import {
    SetNotificationPage,
    AddNewFriendRequest,
    UpdateFriendRequest,
    AddNewComment,
    DeleteFriendRequest,
    GetAllPendingFriendRequests,
    SetNotificationAmount,
    SetCommentsNotificationAmount
} from '@mp/app/notification-page/util';
import { FriendRequestStatus, IDeleteFriendRequest, IGetPendingFriendRequest, IUpdateFriendRequest } from '@mp/api/friend/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { ToastController } from '@ionic/angular';
import { freemem } from 'os';
import { Auth } from 'firebase-admin/auth';
import { AuthState } from '@mp/app/auth/data-access';

export interface NotificationPageStateModel {
    friendsRequests: IUser[] | null | undefined;
    commentNotifications: IComment[] | null | undefined,
    notificationAmount: number,
    commentsAmount: number
}

@State<NotificationPageStateModel>({
    name: 'NotificationPage',
    defaults: {
        friendsRequests: [],
        commentNotifications: [],
        notificationAmount: 0,
        commentsAmount: 0
    }
})

@Injectable()
export class NotificationPageState {
    
    constructor(
        private readonly notificationPageApi: NotificationPageApi,
        private readonly store: Store,
        private readonly toastController: ToastController
    ) {}

    @Selector()
    static friendRequests(state: NotificationPageStateModel) {
        return state.friendsRequests;
    }

    @Selector()
    static comments(state: NotificationPageStateModel) {
        return state.commentNotifications;
    }

    @Selector()
    static notificationAmount(state: NotificationPageStateModel) {
        return state.notificationAmount;
    }

    @Selector()
    static commentsAmount(state: NotificationPageStateModel) {
        return state.commentsAmount;
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

    @Action(SetNotificationAmount)
    setNotificationAmount(ctx: StateContext<NotificationPageStateModel>, { newAmount }: SetNotificationAmount) {
        return ctx.setState(
            produce((draft) => {
                draft.notificationAmount = newAmount
            })
        );
    }

    @Action(SetCommentsNotificationAmount)
    setCommentsNotificationAmount(ctx: StateContext<NotificationPageStateModel>, { newAmount }: SetCommentsNotificationAmount) {
        return ctx.setState(
            produce((draft) => {
                draft.commentsAmount = newAmount
            })
        );
    }

    // @Action(AddNewFriendRequest) 
    // async addNewFriendRequest(ctx: StateContext<NotificationPageStateModel>, { friend } : AddNewFriendRequest) {
    //     try{
            // const user = this.store.selectSnapshot(ProfileState.user);

            // if (!user || !user.userId) return this.store.dispatch(new SetError('User not set [Notification-page]'));

            // const request : IUpdateFriendRequest = {
            //     friendRequest: {
            //         senderId: user?.userId,
            //         receiverUsername: friend.username
            //     }
            // }

    //         const responseRef = this.notificationPageApi.createFriendRequest(request);

    //         return ctx.dispatch(new SetNotificationPage(state.friendsRequests, state.commentNotifications));
    //     }
    //     catch (error) {
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    @Action(UpdateFriendRequest) 
    async updateFriendRequest(ctx: StateContext<NotificationPageStateModel>, { friend } : UpdateFriendRequest) {
        try{
            const user = this.store.selectSnapshot(ProfileState.user);

            if (!user || !user.userId) return this.store.dispatch(new SetError('User not set [Notification-page]'));

            // const request : IUpdateFriendRequest = {
            //     friendRequest: {
            //         senderId: user?.userId,
            //         receiverUsername: friend.username,
            //         status: FriendRequestStatus.ACCEPTED
            //     }
            // }

            const request : IUpdateFriendRequest = {
                friendRequest: {
                    senderId: user.userId,
                    receiverUsername: friend.username,
                    status: FriendRequestStatus.ACCEPTED
                }
            }
            
            const responseRef = await this.notificationPageApi.updateFriendRequest(request);
            const response = responseRef.data;
            
            if (response.status === 'success') {
                const toast = await this.toastController.create({
                    message: friend.username + " is now your friend",
                    color: 'success',
                    duration: 1500,
                    position: 'bottom',
                });
              
                toast.present();

                //remove friend request
                return ctx.setState(prevState => ({
                    ...prevState,
                    friendsRequests: prevState.friendsRequests?.filter((old_friend) => {
                    return old_friend.userId !== friend.userId;
                    })
                }));
            }  
            else {
                return this.store.dispatch(new SetError('Unable to accept friend request'));
            }
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(DeleteFriendRequest) 
    async DeleteFriendRequest(ctx: StateContext<NotificationPageStateModel>, { friend } : DeleteFriendRequest) {
        try{
            const user = this.store.selectSnapshot(ProfileState.user);

            if (!user || !user.userId) return this.store.dispatch(new SetError('User not set [Notification-page]'));

            const request : IDeleteFriendRequest = {
                friendRequest: {
                    senderId: user?.userId,
                    receiverUsername: friend.username
                }
            }

            const responseRef = this.notificationPageApi.deleteFriendRequest(request);

            ctx.setState(prevState => ({
                ...prevState,
                friendsRequests: prevState.friendsRequests?.filter((old_friend) => {
                  return old_friend.userId !== friend.userId;
                })
            }));
            
            const state = ctx.getState();

            return this.store.dispatch(new SetNotificationPage(state.friendsRequests, state.commentNotifications));
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    // @Action(AddNewComment) 
    // async addNewComment(ctx: StateContext<NotificationPageStateModel>, { comment } : AddNewComment) {
    //     try{
    //         const state = ctx.getState();

    //         state.commentNotifications?.unshift(comment);

    //         return ctx.dispatch(new SetNotificationPage(state.friendsRequests, state.commentNotifications));
    //     }
    //     catch (error) {
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    @Action(GetAllPendingFriendRequests)
    async getAllPendingFriendRequests(ctx: StateContext<NotificationPageStateModel>) {
        try{
            const profile = this.store.selectSnapshot(AuthState.user);

            if(!profile) return this.store.dispatch(new SetError('Profile not set'));

            const request : IGetPendingFriendRequest = {
                user: {
                    senderId: '',
                    receiverId: profile.uid
                }
            }

            const responseRef = await this.notificationPageApi.getAllPendingFriendRequestsFor(request);
            const response = responseRef.data;

            return ctx.setState(
                produce((draft) => {
                    draft.friendsRequests = response.profiles.map(profile => profile.user as IUser);
                })
            )
        }
        catch (error) {
            return this.store.dispatch(new SetError('Failed to get all pending requests'));
        }
    }
}