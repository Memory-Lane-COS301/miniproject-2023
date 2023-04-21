import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditProfilePhotoPageComponent } from './lib/edit-profile-photo/edit-profile-photo.page';
import { AddMemoryPageComponent, Memory, ProfileImage } from '@mp/app/shared/feature';
import { ReviveMemoryPageComponent } from './lib/revive-memory/revive-memory.page';
import { MenubarService, ProfileImageService } from '@mp/app/services/feature';
import { formatDate } from '@angular/common';
import { GetProfileRequest } from '@mp/app/profile-view/util';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPageComponent implements OnInit {
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
  profileImage: ProfileImage;

  constructor(
    private store: Store,
    public modalController: ModalController,
    private profileImageService: ProfileImageService,
    private menubarService: MenubarService
  ) {
    this.profileImage = profileImageService.profileImage;
  }

  data:any;

  ngOnInit(): void {
    this.profileImage = this.profileImageService.profileImage;
  }

  toggleMenuStatus() {
    this.menubarService.menuStatus = !this.menubarService.menuStatus;
  }

  async addMemory() {
    const modal = await this.modalController.create({
      component: AddMemoryPageComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.memories.unshift(data);
    }
  }

  async editProfilePhoto() {
    const modal = await this.modalController.create({
      component: EditProfilePhotoPageComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

  async revive() {
    const modal = await this.modalController.create({
      component: ReviveMemoryPageComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
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

  //function that executes when the page is about to enter
  ionViewWillEnter() {
    this.store.dispatch(new GetProfileRequest());
  }
}
