import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { EditProfilePhotoPageComponent } from './lib/edit-profile-photo/edit-profile-photo.page';
import { AddMemoryPageComponent, ProfileImage } from '@mp/app/shared/feature';
import { ReviveMemoryPageComponent } from './lib/revive-memory/revive-memory.page';
import { MenubarService, ProfileImageService } from '@mp/app/services/feature';
import { formatDate } from '@angular/common';
import { GetCommentsRequest, GetProfileRequest, SetEditProfileImageUserId, SetReviveMemoryUserId } from '@mp/app/profile-view/util';
import { Select, Store } from '@ngxs/store';
import { ProfileViewState } from '@mp/app/profile-view/data-access';
import { Observable } from 'rxjs';
import { IProfile } from '@mp/api/profiles/util';
import { IMemory } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPageComponent implements OnInit {
  @Select(ProfileViewState.profileView) profileView$!: Observable<IProfile | null>;
  showExpandedView = false;
  memories: IMemory[] | null | undefined;
  profileImage: ProfileImage;
  first_comment_text : string | null | undefined = '';
  first_comment_username : string | null | undefined = '';
  memory: IMemory | undefined;
  

  constructor(
    private store: Store,
    public modalController: ModalController,
    private profileImageService: ProfileImageService,
    private menubarService: MenubarService,
    private navCtrl: NavController
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
      this.profileView$.subscribe( (profileView) => {
        profileView?.memories?.unshift(data)});
    }
  }

  async editProfilePhoto() {
    const modal = await this.modalController.create({
      component: EditProfilePhotoPageComponent,
    });

    let id : string | null | undefined = '';
    this.profileView$.subscribe((profileView) => {
      id = profileView?.userId;
    })

    this.store.dispatch(new SetEditProfileImageUserId(id));

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

  async revive() {
    const modal = await this.modalController.create({
      component: ReviveMemoryPageComponent,
    });

    let id : string | null | undefined = '';
    this.profileView$.subscribe((profileView) => {
      id = profileView?.userId;
    })

    this.store.dispatch(new SetReviveMemoryUserId(id));

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

  changeMemoryView(i_userId: string | null | undefined, i_memoryId: string | null | undefined) {
    this.showExpandedView = !this.showExpandedView;

    if(this.showExpandedView) {      
      const request : IMemory = {
        userId: i_userId,
        memoryId: i_memoryId
      }
      this.store.dispatch(new GetCommentsRequest(request)); //we only request the comments if we want to display them
    }
  }

  get Memories() : IMemory[] | null {
    this.profileView$.subscribe((profileView) => {
      this.memories = profileView?.memories;
    });

    if (!this.memories) return null;

    this.memory = this.memories[0];

    return this.memories;
  }

  //function to covert timePosted to dd MMMM yyyy
  convertTimePostedToDate(timePosted: Timestamp | null | undefined): string {
    if (!timePosted) return 'Invalid Date';

    const date = new Date(timePosted.seconds);
    return formatDate(date, 'dd MMMM yyyy', 'en-US');
  }

  //function to use timePosted to calculate how long ago the memory was posted
  calculateHowLongAgo(timePosted: Timestamp | null | undefined): string {
    if (!timePosted) return 'Invalid Time';

    const date = new Date(timePosted.seconds);
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

  openViewedComments() {
    const currentPosition = window.pageYOffset;
    this.navCtrl.navigateForward('/view-comments', { state: { scrollPosition: currentPosition } });
  }

  getFirstCommentText() {
    if(!this.memories) return this.first_comment_text;

    this.memory = this.memories[0];

    if (this.memory.comments) {
      this.first_comment_text = this.memory.comments[0].text;
    }

    return this.first_comment_text;
  }

  getFirstCommentUsername() {
    if(!this.memories) return this.first_comment_username;

    this.memory = this.memories[0];

    if (this.memory.comments) {
      this.first_comment_username = this.memory.comments[0].username;
    }

    return this.first_comment_username;
  }

  getCommentsLength() {
    if(!this.memories) return 0;

    this.memory = this.memories[0];

    if (this.memory.comments) {
      return this.memory.comments.length;
    }

    return 0;
  }

  getFirstCommentProfileImage() {
    if(!this.memories) return '';

    this.memory = this.memories[0];

    if (this.memory.comments) {
      return this.memory.comments[0].profileImgUrl;
    }

    return '';
  }

  getMemoriesLength() {
    let size = 0;

    this.profileView$.subscribe( (profile) => {
      if (profile?.memories) {
        size = profile.memories.length;
      }
    });

    return size;
  }
}
