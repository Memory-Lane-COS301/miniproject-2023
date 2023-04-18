import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { GetUserProfileRequest } from '@mp/app/user-view/util';
import { IProfile } from '@mp/api/profiles/util';
import { 
  UserViewState, 
  UserViewStateModel 
} from '@mp/app/user-view/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FriendRequestStatus } from '@mp/api/friend/util';
import { Memory } from '@mp/app/shared/feature';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
})
export class UserViewPageComponent {
  @Select(UserViewState.userView) userProfile$!: Observable<IProfile | null>;

  added = false;
  btn_text = 'Send friend request';
  handlerMessage = '';
  roleMessage = '';
  showExpandedView = false;

  memories: Memory[] = [
    {
      username: '@username',
      profileUrl:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
      imgUrl:
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
      title: 'Last day of Highschool',
      description: 'Example of a description for the memory',
      comments: [
        {
          username: '@commentedUsername',
          profileImgUrl:
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
          comment:
            'This is an example comment. The idea of this comment is to show you what a comment on a memory looks like. And that it can overflow.',
        },
      ],
      timePosted: '2020-11-14T10:30:00.000-07:00',
      alive: true
    },
  ];

  constructor(
    private alertController: AlertController, 
    private toastController: ToastController,
    private readonly store: Store,
  ) {}

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
    this.added = true;
    this.btn_text = 'You are friends';
  }

  removeFriend() {
    this.added = false;
    this.btn_text = 'Send friend request';

    // const status = FriendRequestStatus['REJECTED'];

    // this.store.dispatch(new UpdateFriendRequest(status));
  }

  //called if a user clicks on the user's username or profile image either on the feed page or during a search
  openUserProfile(_username: string, _userId: string) {
    const requestData : IProfile = {
      userId: _userId,
      user: {
        userId: _userId,
        username: _username
      }
    };

    const request : UserViewStateModel = {
      userProfile: requestData
    };

    this.store.dispatch(new GetUserProfileRequest(request));
  }

  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;
  }

  get Memories() {
    return this.memories;
  }

  //function to covert timePosted to dd MMMM yyyy
  convertTimePostedToDate(timePosted: string): string {
    const date = new Date(timePosted);
    return formatDate(date, 'dd MMMM yyyy', 'en-US');
  }

  //function to use timePosted to calculate how long ago the memory was posted
  calculateHowLongAgo(timePosted: string): string {
    const date = new Date(timePosted);
    const timeDifference = Date.now() - date.getTime();

    // Convert time difference to "time ago" string
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
}
