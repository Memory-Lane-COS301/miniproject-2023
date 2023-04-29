import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { IProfile, IGetProfileRequest } from '@mp/api/profiles/util';
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { UserViewApi } from './user-view.api';
import { 
  CreateFriendRequest,
  DeleteFriend,
  DeleteFriendRequest,
  GetUserProfileRequest,
  SetUserView,
  CheckUserFriendStatus,
  GetFriends,
  SetUserViewBooleans
} from '@mp/app/user-view/util';
import produce from 'immer';
import { IMemory } from '@mp/api/memories/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { IDeleteFriendRequest, IGetFriendsRequest, IUpdateFriendRequest } from '@mp/api/friend/util';
import { ProfileViewState } from '@mp/app/profile-view/data-access';
import { AuthState } from '@mp/app/auth/data-access';
import { GetProfileRequest } from '@mp/app/profile-view/util';

export interface UserViewStateModel {
  userProfile: IProfile;
  isFriends: boolean;
  isWaitingRequest: boolean;
  isNotFriends: boolean;
  friends: IProfile[];
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
    isFriends: false,
    isWaitingRequest: false,
    isNotFriends: false,
    friends: []
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
  static isFriends(state: UserViewStateModel) {
    return state.isFriends;
  }

  @Selector()
  static isWaitingRequest(state: UserViewStateModel) {
    return state.isWaitingRequest;
  }

  @Selector()
  static isNotFriends(state: UserViewStateModel) {
    return state.isNotFriends;
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
      ctx.dispatch(new SetUserView(response.profile));
      return ctx.dispatch(new GetFriends());
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

  @Action(SetUserViewBooleans)
  setUserViewBooleans(ctx: StateContext<UserViewStateModel>, { _isFriends, _isWaitingRequest, _isNotFriends } : SetUserViewBooleans) {
    ctx.setState(
      produce((draft) => {
          draft.isFriends = _isFriends;
          draft.isWaitingRequest = _isWaitingRequest;
          draft.isNotFriends = _isNotFriends;
      })
    );
  }

  @Action(CreateFriendRequest) 
  async createFriendRequest(ctx: StateContext<UserViewStateModel>, { friend } : CreateFriendRequest) {
      try{
          const user = this.store.selectSnapshot(ProfileState.user);

          if (!user || !user.userId) return this.store.dispatch(new SetError('User not set [UserView]'));

          const request : IUpdateFriendRequest = {
              friendRequest: {
                  senderId: user?.userId,
                  receiverUsername: friend.username
              }
          }

          const responseRef = this.userViewApi.createFriendRequest(request);

          return ctx.setState(prevState => ({
            ...prevState,
            isFriends: false,
            isWaitingRequest: true,
            isNotFriends: false
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
              isFriends: false,
              isWaitingRequest: false,
              isNotFriends: true
          }));
      }
      catch (error) {
          return ctx.dispatch(new SetError((error as Error).message));
      }
  }

  @Action(DeleteFriend) 
  async DeleteFriend(ctx: StateContext<UserViewStateModel>, { friend } : DeleteFriend) {
      try{
          let user = this.store.selectSnapshot(ProfileState.user);

          if (!user || !user.userId) return this.store.dispatch(new SetError('User not set [UserView page]'));

          const request : IDeleteFriendRequest = {
              friendRequest: {
                  senderId: user?.userId,
                  receiverUsername: friend.username
              }
          }

          const responseRef = this.userViewApi.deleteFriend(request);

          ctx.setState(prevState => ({
              ...prevState,
              isFriends: false,
              isWaitingRequest: false,
              isNotFriends: true
          }));

          const userViewState = ctx.getState()
          user = userViewState.userProfile;
          ctx.dispatch(new GetProfileRequest())
          return ctx.dispatch(new GetUserProfileRequest({ userId: user.userId, username: user.username }));
      }
      catch (error) {
          return ctx.dispatch(new SetError((error as Error).message));
      }
  }

  @Action(CheckUserFriendStatus)
  async checkUserFriendStatus(ctx: StateContext<UserViewStateModel>, { user }: CheckUserFriendStatus) {
    try {
      //get friends and map through it to check for a match Id in OUR list of friends
      const friends = ctx.getState().friends;
      const authState = this.store.selectSnapshot(AuthState);
      let calledSet = false;

      // if (!friends) return this.store.dispatch(new SetError('User friends not'));

      friends.map((friend) => {
        if (friend.userId === authState.user.uid) {
          console.log('inside isFriends');
          console.log('friendId: ' + friend.userId);
          ctx.setState(prevState => ({
            ...prevState,
            isFriends: true,
            isWaitingRequest: false,
            isNotFriends: false,
          }));
        calledSet = true;
        }
      });

      if (calledSet) {
        return;
      }
      else {
        //else map thorough this user's list of pending requests to check for a match of OUR userId
        console.log(`UserId: ${user.userId}`)
        const request : IGetFriendsRequest = {
          user: {
            // senderId: user.userId
            senderId: authState.user.uid
          }
        }
        const responseRef = await this.userViewApi.getAllPendingFriendRequests(request);
        const response = responseRef.data;

        console.log('Inside checkStatus');
        console.log(response.profiles);

        response.profiles.map((friend) => {
          if (friend.userId === user.userId) {
            calledSet = true;
            console.log('inside waiting');
            console.log('friendId: ' + friend.userId);
            console.log('userId: ' + user.userId);
            ctx.setState(prevState => ({
              ...prevState,
              isFriends: false,
              isWaitingRequest: true,
              isNotFriends: false,
          }));
          }
        });

        if (calledSet) {
          return;
        }
        else {
          //else not friends
            console.log('inside not friends');
            console.log('userId: ' + user.userId);
          return ctx.setState(prevState => ({
            ...prevState,
            isFriends: false,
            isWaitingRequest: false,
            isNotFriends: true,
          }));
        }
      }
    }
    catch (error) {
      return this.store.dispatch(new SetError('Unable to get all friends [UserView].'));
    }
  }

  @Action(GetFriends)
  async getFriends(ctx: StateContext<UserViewStateModel>) {
    try {
      const user = this.store.selectSnapshot(UserViewState.userView);

      if (!user) return this.store.dispatch(new SetError('User not set'));
      
      const request : IGetFriendsRequest = {
        user: {
          senderId: user?.userId
        }
      }
      const responseRef = await this.userViewApi.getFriends(request);
      const response = responseRef.data;

     ctx.setState(
          produce((draft) => {
              draft.friends = response.profiles;
          })
      );

      return ctx.dispatch(new CheckUserFriendStatus(user));
    }
    catch (error) {
      return ctx.dispatch(new SetError('Unable to fetch friends [ProfileView]'));
    }
  }
}
