import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CheckUserFriendStatus, CreateFriendRequest, DeleteFriend, DeleteFriendRequest, GetUserProfileRequest } from '@mp/app/user-view/util';
import { IGetProfileRequest, IProfile } from '@mp/api/profiles/util';
import { UserViewState, UserViewStateModel } from '@mp/app/user-view/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FriendRequestStatus } from '@mp/api/friend/util';
import { IMemory } from '@mp/api/memories/util';
import { IUser } from '@mp/api/users/util';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
})
export class UserViewPageComponent implements OnInit {
  @Select(UserViewState.userView) userProfile$!: Observable<IProfile | null>;
  @Select(UserViewState.btn_text) request_btn_text$!: Observable<string | null>;

  added = false;
  waiting = false;
  notFriends = false;

  handlerMessage = '';
  roleMessage = '';
  showExpandedView = false;

  memories!: IMemory[] | null | undefined;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    const user = this.store.selectSnapshot(UserViewState.userView);

    this.store.dispatch(new CheckUserFriendStatus(user)); //check to see if this user is a friend or not

    this.request_btn_text$.subscribe((value) => {
      if (value == 'Send Friend Request') {
        this.notFriends = true;
      }
      else if (value == 'Waiting for acceptance') {
        this.waiting = true;
      }
      else if (value == 'You are friends') {
        this.added = true;
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to unfriend <user name>?',
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
            this.handlerMessage = 'Unfriened <user name>';
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
    this.waiting = true;
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
    this.added = false;
    this.waiting = false;
    this.notFriends = true;

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
    this.added = false;

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

  getRequestBtnText() {
    let text :string | null = '';

    this.request_btn_text$.subscribe((value) => {
      text = value;
    })

    return text;
  }
}
