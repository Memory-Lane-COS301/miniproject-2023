import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CheckUserFriendStatus, CreateFriendRequest, DeleteFriend, DeleteFriendRequest, GetUserProfileRequest } from '@mp/app/user-view/util';
import { IGetProfileRequest, IProfile } from '@mp/api/profiles/util';
import { UserViewState, UserViewStateModel } from '@mp/app/user-view/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FriendRequestStatus } from '@mp/api/friend/util';
import { Memory } from '@mp/app/shared/feature';
import { IMemory } from '@mp/api/memories/util';
import { IUser } from '@mp/api/users/util';
import { stat } from 'fs';
import { GetFriends } from '@mp/app/profile-view/util';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
  //imports: [StoreModule.forRoot({})],
  providers: [Store]
})
export class UserViewPageComponent {
  @Select(UserViewState.userView) userProfile$!: Observable<IProfile | null>;
  @Select(UserViewState.isFriends) isFriends$!: Observable<boolean | null>;
  @Select(UserViewState.isWaitingRequest) isWaitingRequest$!: Observable<boolean | null>;
  @Select(UserViewState.isNotFriends) isNotFriends$!: Observable<boolean | null>;

  handlerMessage = '';
  roleMessage = '';
  showExpandedView = false;

  memories!: IMemory[] | null | undefined;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private readonly store: Store,
  ) {}

  async presentAlert() {
    const user = this.store.selectSnapshot(UserViewState.userView).user;
    const alert = await this.alertController.create({
      header: `Are you sure you want to unfriend ${user?.username}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Unfriend canceled';
          },
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = `Unfriended ${user?.username}`;
            this.presentToast('top');
            this.removeFriend();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Unfriended <user name>',
      duration: 1600,
      position: position,
      color: 'danger',
    });

    await toast.present();
  }

  addedNewFriend() {
    let _userId = '';
    let _username : string | null | undefined = '';

    this.userProfile$.subscribe((profile) => {
      if (profile && profile.user) {
        _userId = profile?.userId,
        _username = profile?.user?.username
      }
    });

    const request : IUser = {
      userId: _userId,
      username: _username
    }

    this.store.dispatch(new CreateFriendRequest(request));
  }

  removeFriend() {
    let _userId = '';
    let _username : string | null | undefined = '';

    this.userProfile$.subscribe((profile) => {
      if (profile && profile.user) {
        _userId = profile?.userId,
        _username = profile?.user?.username
      }
    });

    const request : IUser = {
      userId: _userId,
      username: _username
    }

    this.store.dispatch(new DeleteFriend(request));
  }

  cancelFriend() {
    let _userId = '';
    let _username : string | null | undefined = '';

    this.userProfile$.subscribe((profile) => {
      if (profile && profile.user) {
        _userId = profile?.userId,
        _username = profile?.user?.username
      }
    });

    const request : IUser = {
      userId: _userId,
      username: _username
    }

    this.store.dispatch(new DeleteFriendRequest(request));
  }

  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;
  }

  get Memories(): IMemory[] | null {
    this.userProfile$.subscribe((userProfile) => {
      this.memories = userProfile?.memories;
    });

    if (!this.memories) return null;

    return this.memories;
  }

  getProfileImgUrl() {
    let imgUrl = '';
    this.userProfile$.subscribe((profile) => {
      if (profile?.user?.profileImgUrl) {
        imgUrl = profile.user.profileImgUrl;
      }
      else {
        imgUrl = '../../../../../assets/Design_icons/Design icons/Login page background and images/Big person.png';
      }
    })

    return imgUrl;
  }

  isNotFriends() {
    let isNotFriends: boolean | null = false;
    this.isNotFriends$.subscribe((_value) => {
      isNotFriends = _value; 
    });

    return isNotFriends;
  }

  isWaitingRequest() {
    let isWaitingRequest: boolean | null = false;
    this.isWaitingRequest$.subscribe((_value) => {
      isWaitingRequest = _value; 
    });

    return isWaitingRequest;
  }

  isFriends() {
    let isFriends: boolean | null = false;
    this.isFriends$.subscribe((_value) => {
      isFriends = _value; 
    });

    return isFriends;
  }

  ionViewWillEnter() {
    const state = this.store.selectSnapshot(UserViewState.userView);

    this.store.dispatch(new GetFriends());
    this.store.dispatch(new GetUserProfileRequest({ userId: state.userId, username: state.user?.username}));
  }
}
