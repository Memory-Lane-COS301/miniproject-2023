import { formatDate } from '@angular/common';
import { Component, ElementRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { IMemory } from '@mp/api/memories/util';
import { MemoryCardState } from '@mp/app/shared/data-access';
import { Observable } from 'rxjs';
import { CreateCommentRequest, GetCommentsRequest, SetMemoryCard } from '@mp/app/shared/util';
import { GetUserProfileRequest } from '@mp/app/user-view/util';
import { IUser } from '@mp/api/users/util';
import { IGetProfileRequest } from '@mp/api/profiles/util';
import { on } from 'stream';
import { ProfileState } from '@mp/app/profile/data-access';
import { UserViewState } from '@mp/app/user-view/data-access';
import { Timestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent implements OnInit {
  @Input() memory!: IMemory;
  @Input() onProfileView!: boolean;
  @Output() postClick = new EventEmitter<IMemory>();


  showExpandedView = false;
  previousPageName = '';
  addingNewComment = false;
  new_comment: string = '';
  first_comment_text : string | null | undefined = '';
  first_comment_username : string | null | undefined = '';
  intervalId: any;
  remainingTime: string = '';
  
  constructor(
    private navCtrl: NavController,
    private store: Store,
    private state: MemoryCardState
  ) { 
      this.startDecrement();
  }

  ngOnInit(): void {
      // this.store.dispatch(new SetMemoryCard(this.memory)); 
  }

  setAddingNewComment() {
    this.addingNewComment = true;
  }

  unsetAddingNewComment() {
    this.addingNewComment = false;
  }

  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;

    if(this.showExpandedView) {      
      // this.store.dispatch(new GetCommentsRequest(this.memory)); //we only request the comments if we want to display them
      this.onPostClick();
    }
  }

  //function to covert timePosted to dd MMMM yyyy
  convertTimePostedToDate(timePosted: any | null | undefined): string {
    if (!timePosted) return 'Invalid Date';

    const date = new Date(timePosted._seconds * 1000);
    return formatDate(date, 'dd MMMM yyyy', 'en-US');
  }

  calculateHowLongAgo(timePosted: any | null | undefined): string {
    if (!timePosted) return 'Invalid Time';

    const now = new Date();
    const date = new Date(timePosted._seconds * 1000);
    const timeDifference = now.getTime() - date.getTime();

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

  openUserProfile(uid: string | null | undefined, uname: string | null | undefined) {
    const user = this.store.selectSnapshot(ProfileState.user);
    const viewedUser = this.store.selectSnapshot(UserViewState.userView).user;

    if(!uid || !uname) return;

    if (user && user.userId && user.username) { //check if this memory is on our profile, if so then we do not want to open our profile again
        if (uid != user.userId && uname != user.name) {
            const request_user : IUser = {
                userId: uid,
                username: uname
            }

            this.store.dispatch(new GetUserProfileRequest(request_user));
            this.navCtrl.navigateForward('/user-view');
        }
    }    
    else if (viewedUser && viewedUser.userId && viewedUser.username) { //check if this memory is on viewed user's profile, if so then we do not want to open the profile again
      if (uid != viewedUser.userId && uname != viewedUser.name) {
          const request_user : IUser = {
              userId: uid,
              username: uname
          }

          this.store.dispatch(new GetUserProfileRequest(request_user));
          this.navCtrl.navigateForward('/user-view');
      }
    }
    else {
      const request_user : IUser = {
        userId: uid,
        username: uname
      }

      this.store.dispatch(new GetUserProfileRequest(request_user));
      this.navCtrl.navigateForward('/user-view');
    }
}

  openViewedComments() {
    const currentPosition = window.pageYOffset;
    this.navCtrl.navigateForward('/view-comments', { state: { scrollPosition: currentPosition } });
  }

  getFirstCommentText() {
    if (this.memory.comments) {
      this.first_comment_text = this.memory.comments[0].text;
    }

    return this.first_comment_text;
  }

  getFirstCommentUsername() {
    if (this.memory.comments) {
      this.first_comment_username = this.memory.comments[0].username;
    }

    return this.first_comment_username;
  }

  getCommentsLength() {
    if (this.memory.comments) {
      return this.memory.comments.length;
    }

    return 0;
  }

  formatTime(seconds: number | null | undefined): string {
    if (!seconds)
      seconds = 0;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}h:${m.toString().padStart(2, '0')}m:${s.toString().padStart(2, '0')}s`;
  }

  addNewComment() {
    this.store.dispatch(new CreateCommentRequest(this.new_comment));
  }

  onPostClick(): void {
    this.postClick.emit(this.memory);
  }

  startDecrement() {
    this.intervalId = setInterval(() => {
      const deathTime: any = this.memory.deathTime;
      let seconds = 0;

      if (deathTime)
        seconds = deathTime._seconds - Timestamp.now().seconds;
     
      this.remainingTime = this.formatTime(seconds);
    }, 1000);
  }

}
