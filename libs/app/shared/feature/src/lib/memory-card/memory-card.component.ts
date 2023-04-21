import { formatDate } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Memory } from '../../Memory';
import { Select, Store } from '@ngxs/store';
import { IMemory } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';
import { MemoryCardState } from '@mp/app/shared/data-access';
import { Observable } from 'rxjs';
import { GetCommentsRequest, SetMemoryCard } from '@mp/app/shared/util';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent implements OnInit{
  @Select(MemoryCardState.memoryCard) memoryCard$ !: Observable<IMemory | null>;

  @Input() memory!: IMemory;

  showExpandedView = false;
  previousPageName = '';
  addingNewComment = false;
  new_comment: string = '';
  first_comment_text : string | null | undefined = '';
  first_comment_username : string | null | undefined = '';

  constructor(
    private navCtrl: NavController,
    private store: Store
  ) {}

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

    if(this.showExpandedView) {      
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

  openUserProfile() {
    const currentPosition = window.pageYOffset;
    this.navCtrl.navigateForward('/user-view', { state: { scrollPosition: currentPosition } });
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
