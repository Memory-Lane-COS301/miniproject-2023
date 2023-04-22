import { formatDate } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { IMemory } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';
import { MemoryCardState } from '@mp/app/shared/data-access';
import { Observable } from 'rxjs';
import { GetCommentsRequest, SetMemoryCard } from '@mp/app/shared/util';
import { GetUserProfileRequest } from '@mp/app/user-view/util';
import { IUser } from '@mp/api/users/util';
import { IGetProfileRequest } from '@mp/api/profiles/util';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent implements OnInit {
  @Select(MemoryCardState.memoryCard) memoryCard$!: Observable<IMemory | null>;

  @Input() memory!: IMemory;
  @Input() onUserProfile: boolean | undefined; //we use this to determine whether the memory card is displayed on the user's page or on the feed/search pages

  showExpandedView = false;
  previousPageName = '';
  addingNewComment = false;
  new_comment: string = '';
  first_comment_text: string | null | undefined = '';
  first_comment_username: string | null | undefined = '';

  constructor(private navCtrl: NavController, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new SetMemoryCard(this.memory));
  }

  setAddingNewComment() {
    this.addingNewComment = true;
  }

  unsetAddingNewComment() {
    this.addingNewComment = false;
  }

  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;

    if (this.showExpandedView) {
      this.store.dispatch(new GetCommentsRequest(this.memory)); //we only request the comments if we want to display them
    }
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

  openUserProfile(i_userId: string | null | undefined, i_username: string | null | undefined) {
    const currentPosition = window.pageYOffset;
    this.navCtrl.navigateForward('/user-view', { state: { scrollPosition: currentPosition } });

    let _userId: string | null | undefined = '';
    let _username: string | null | undefined = '';

    let request: IUser;

    //we either want to navigate to the user's profile (i.e. the person who posted the memory)
    if (!(i_userId && i_username)) {
      this.memoryCard$.subscribe((user) => {
        (_userId = user?.userId), (_username = user?.username);
      });

      request = {
        userId: _userId,
        username: _username,
      };
    }
    //or we want to open a user's - who commented - profile
    else {
      request = {
        userId: i_userId,
        username: i_username,
      };
    }

    this.store.dispatch(new GetUserProfileRequest(request));
  }

  //we do not want to open the user profile again by tapping the profile image or username of a post, if we are already on their profile
  validateMemoryCardLocation(uid: string | null | undefined, uname: string | null | undefined) {
    if (this.onUserProfile) {
      this.openUserProfile(uid, uname);
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
}
