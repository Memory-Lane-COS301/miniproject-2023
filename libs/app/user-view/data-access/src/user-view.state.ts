import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { IProfile, IGetProfileRequest } from '@mp/api/profiles/util';
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { UserViewApi } from './user-view.api';
import { CreateFriendRequest, DeleteFriend, DeleteFriendRequest, GetUserProfileRequest, SetUserView, CheckUserFriendStatus } from '@mp/app/user-view/util';
import produce from 'immer';
import { IMemory } from '@mp/api/memories/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { IDeleteFriendRequest, IUpdateFriendRequest } from '@mp/api/friend/util';

export interface UserViewStateModel {
  userProfile: IProfile;
  friendRequest_btn_text: string;
}

@State<UserViewStateModel>({
  name: 'userview',
  defaults: {
    userProfile: {
      user: null,
      memories: [],

      userId: '',
      accountDetails: null,
      personalDetails: null,
      contactDetails: null,
      addressDetails: null,
      occupationDetails: null,
      status: null,
      created: null,
    },
    friendRequest_btn_text: 'Send friend request'
  },
})
@Injectable()
export class UserViewState {
  constructor(private readonly userViewApi: UserViewApi, private readonly store: Store) {}

  @Selector()
  static userView(state: UserViewStateModel) {
    return state.userProfile;
  }

  @Selector()
  static btn_text(state: UserViewStateModel) {
    return state.friendRequest_btn_text;
  }

  @Action(GetUserProfileRequest) //GetUserProfileRequest is the same as the GetProfileRequest
  async getUserProfileRequest(ctx: StateContext<UserViewStateModel>, { user }: GetUserProfileRequest) {
    try {
      const _userId = user.userId;
      const _username = user.username;

      const request: IGetProfileRequest = {
        user: {
          userId: _userId,
          username: _username,
        },
      };
      const responseRef = await this.userViewApi.getUserProfile(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetUserView(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(SetUserView)
  setUserView(ctx: StateContext<UserViewStateModel>, { profile } : SetUserView) {
    ctx.setState(
      produce((draft) => {
          draft.userProfile = profile;
      })
  );
  }

  @Action(CreateFriendRequest) 
    async createFriendRequest(ctx: StateContext<UserViewStateModel>, { friend } : CreateFriendRequest) {
        try{
            const user = this.store.selectSnapshot(ProfileState.user);

            if (!user || !user.userId) return this.store.dispatch(new SetError('User not set [Notification-page]'));

            const request : IUpdateFriendRequest = {
                friendRequest: {
                    senderId: user?.userId,
                    receiverUsername: friend.username
                }
            }

            const responseRef = this.userViewApi.createFriendRequest(request);

            return ctx.setState(prevState => ({
              ...prevState,
              friendRequest_btn_text: 'Waiting for acceptance'
          }));
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

  @Action(DeleteFriendRequest) 
    async DeleteFriendRequest(ctx: StateContext<UserViewStateModel>, { friend } : DeleteFriendRequest) {
        try{
            const user = this.store.selectSnapshot(ProfileState.user);

            if (!user || !user.userId) return this.store.dispatch(new SetError('User not set [UserView page]'));

            const request : IDeleteFriendRequest = {
                friendRequest: {
                    senderId: user?.userId,
                    receiverUsername: friend.username
                }
            }

            const responseRef = this.userViewApi.deleteFriendRequest(request);

            return ctx.setState(prevState => ({
                ...prevState,
                friendRequest_btn_text: 'Send friend request'
            }));
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(DeleteFriend) 
    async DeleteFriend(ctx: StateContext<UserViewStateModel>, { friend } : DeleteFriend) {
        try{
            const user = this.store.selectSnapshot(ProfileState.user);

            if (!user || !user.userId) return this.store.dispatch(new SetError('User not set [UserView page]'));

            const request : IDeleteFriendRequest = {
                friendRequest: {
                    senderId: user?.userId,
                    receiverUsername: friend.username
                }
            }

            const responseRef = this.userViewApi.deleteFriend(request);

            return ctx.setState(prevState => ({
                ...prevState,
                friendRequest_btn_text: 'Send friend request'
            }));
        }
        catch (error) {
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(CheckUserFriendStatus)
    async checkUserFriendStatus(ctx: StateContext<UserViewStateModel>, { user }: CheckUserFriendStatus) {
      try {
        //get friends and map through it to check for a match Id in OUR list of friends -- You are friends
          // const friendsResponseRef = this.store.dispatch();

        //else map thorough this user's list of pending requests to check for a match of OUR userId -- waiting for acceptance
        //else we are not friends -- Send friend request
        return;
      }
      catch (error) {
        return this.store.dispatch(new SetError('Unable to get all friends [UserView].'));
      }
    }
}
