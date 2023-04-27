import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {
  IUpdateUserRequest 
} from '@mp/api/users/util'
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    Logout,
    SetUser,
    SetUserDetailsForm,
    SubscribeToUser,
    UpdateUserDetails,
    DecrementUserTime,
    UpdateUser,
    SetTime
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs';
import { ProfilesApi } from './profiles.api';
import { IUser } from '@mp/api/users/util';
import { IProfile } from '@mp/api/profiles/util';
import { Timestamp } from '@angular/fire/firestore';

export interface ProfileStateModel {
  profile: IProfile | null;
  user: IUser | null;
  time: string;
  userDetailsForm: {
    model: {
      name: string | null | undefined;
      surname: string | null | undefined;
      username: string | null | undefined;
      email: string | null | undefined;
      bio: string | null | undefined;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null,
    user: null,
    time: '',
    userDetailsForm: {
      model: {
        name: null,
        surname: null,
        username: null,
        email: null,
        bio: null
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})

@Injectable()
export class ProfileState {
  private intervalId: any;

  constructor(
    private readonly profileApi: ProfilesApi,
    private readonly store: Store,
    private readonly toastController: ToastController
  ) {
    // this.startDecrement();
  }

  @Selector()
  static profile(state: ProfileStateModel) {
    return state.profile;
  }

  @Selector()
  static user(state: ProfileStateModel) {
    return state.user;
  }

  @Selector()
  static time(state: ProfileStateModel) {
    return state.time;
  }

  @Action(Logout)
  async logout(ctx: StateContext<ProfileStateModel>) {
    return ctx.dispatch(new AuthLogout());
  }

  @Action(SubscribeToUser)
  subscribeToUser(ctx: StateContext<ProfileStateModel>) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    return this.profileApi
      .user$(user.uid)
      .pipe(tap((user: IUser) => ctx.dispatch(new SetUser(user))));
  }

  @Action(SetUser)
  setUser(ctx: StateContext<ProfileStateModel>, { user }: SetUser) {
    ctx.setState(
      produce((draft) => {
        draft.user = user;
      })
    );

    return ctx.dispatch(new SetUserDetailsForm(user));
  }

  @Action(DecrementUserTime)
  decrementUserTime(ctx: StateContext<ProfileStateModel>) {
    ctx.setState(
      produce((draft) => {
        if (draft.user?.accountTime)
          draft.user.accountTime--;
      })
    );
  }

  @Action(SetUserDetailsForm)
  setUserDetailsForm(ctx: StateContext<ProfileStateModel>, { user }: SetUserDetailsForm) {
    return ctx.setState(
      produce((draft) => {
        draft.userDetailsForm.model.name = user?.name;
        draft.userDetailsForm.model.surname = user?.surname;
        draft.userDetailsForm.model.username = user?.username;
        draft.userDetailsForm.model.email = user?.email;
        draft.userDetailsForm.model.bio = user?.bio;
      })
    );
  }

  @Action(UpdateUserDetails)
  async updateUserDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const authState = this.store.selectSnapshot(AuthState.user);
      const userId = authState?.uid;
      const name = state.userDetailsForm.model.name;
      const surname = state.userDetailsForm.model.surname;
      const username = state.userDetailsForm.model.username;
      const email = state.userDetailsForm.model.email;
      const bio = state.userDetailsForm.model.bio;

      if (!userId)
        return ctx.dispatch(
          new SetError(
            'User not set'
          )
        );

      if (!username || !email)
        return ctx.dispatch(
          new SetError(
            'Username, or email not set'
          )
        );

      const request: IUpdateUserRequest = {
        user: {
          userId: userId,
          name: name,
          surname: surname,
          username: username,
          email: email,
          bio: bio,
        } 
      };
      const responseRef = await this.profileApi.updateUserDetails(request);
      const response = responseRef.data;

      const toast = await this.toastController.create({
        message: "Updated user details",
        color: 'success',
        duration: 1500,
        position: 'bottom',
      });
  
      toast.present();

      return ctx.dispatch(new SetUser(response.user));
    } catch (error) {
      ctx.dispatch(new SetUserDetailsForm(ctx.getState().user));
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateUser)
  async updateUser(ctx: StateContext<ProfileStateModel>, { user }: UpdateUser) {
    try {
      const state = ctx.getState();
      const authState = this.store.selectSnapshot(AuthState.user);
      const userId = authState?.uid;
      const name = user?.name ? user.name : state.user?.name;
      const surname = user?.surname ? user.surname : state.user?.surname;
      const username = user?.username ? user.username : state.user?.username;
      const email = user?.email ? user.email : state.user?.email;
      const profileImgUrl = user?.profileImgUrl ? user.profileImgUrl : state.user?.profileImgUrl;
      const bio = user?.bio ? user.bio : state.user?.bio;

      if (!userId)
        return ctx.dispatch(new SetError('User not set'));

      const request: IUpdateUserRequest = {
        user: {
          userId: userId,
          name: name,
          surname: surname,
          username: username,
          email: email,
          profileImgUrl: profileImgUrl,
          bio: bio,
        } 
      };

      const responseRef = await this.profileApi.updateUserDetails(request);
      const response = responseRef.data;


      return ctx.dispatch(new SetUser(response.user));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(SetTime)
  setTime(ctx: StateContext<ProfileStateModel>) {
    const deathTime = ctx.getState().user?.deathTime
    let seconds = 0;

    if (deathTime)
      seconds = deathTime.seconds - Timestamp.now().seconds;

    ctx.setState(
      produce((draft) => {
        draft.time = this.formatTime(seconds);
      })
    );
  }

  startDecrement() {
    this.intervalId = setInterval(() => {
      this.store.dispatch(new SetTime());
    }, 1000);
  }

  formatTime(seconds: number): string {
    if (!seconds)
      seconds = 0;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}h:${m.toString().padStart(2, '0')}m:${s.toString().padStart(2, '0')}s`;
  }

}
