import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  SetEditProfileImagePhoto,
  SetEditProfileImageState,
  SetEditProfileImageUserId,
} from '@mp/app/profile-view/util';
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
import { ProfileState } from '@mp/app/profile/data-access';

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
    },
  },
})
@Injectable()
export class EditProfilePhotoState {
  constructor(private readonly editProfilePhotoApi: EditProfilePhotoApi, private readonly store: Store) {}

  @Selector()
  static editProfilePhoto(state: EditProfilePhotoModel) {
    return state.user;
  }

  @Action(SetEditProfileImageUserId)
  setProfileImageUserId(ctx: StateContext<EditProfilePhotoModel>, { userId }: SetEditProfileImageUserId) {
    try {
      const state = ctx.getState();
      const response: IUser = {
        ...state.user,
        userId: userId,
      };

      return this.store.dispatch(new SetEditProfileImageState(response));
    } catch (error) {
      return this.store.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(SetEditProfileImageState)
  setEditProfileState(ctx: StateContext<EditProfilePhotoModel>, { user }: SetEditProfileImageState) {
    return ctx.setState(
      produce((draft) => {
        draft.user = user;
      }),
    );
  }

  @Action(SetEditProfileImagePhoto)
  setEditProfilePhoto(ctx: StateContext<EditProfilePhotoModel>, { imgUrl }: SetEditProfileImagePhoto) {
    try {
        const user = this.store.selectSnapshot(ProfileState.user);

        if(!user || !user.userId) return this.store.dispatch(new SetError('User not set'));

        const response : IUser = {
            userId: user?.userId,
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            profileImgUrl: imgUrl,
            bio: user.bio,
            friendCount: user.friendCount,
            memoryCount: user.memoryCount,
            accountTime: user.accountTime,
            lastOnline: user.lastOnline,
            online: user.online, // requires clarification
            created: user.created,
        };

      return this.store.dispatch(new SetEditProfileImageState(response));
    } catch (error) {
      return this.store.dispatch(new SetError((error as Error).message));
    }
  }
}
