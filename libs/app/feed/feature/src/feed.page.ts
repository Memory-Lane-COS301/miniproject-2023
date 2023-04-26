import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddMemoryPageComponent, Memory } from '@mp/app/shared/feature';
import { IComment, IMemory } from '@mp/api/memories/util';
import { Select, Store } from '@ngxs/store';
import { FeedState } from '@mp/app/feed/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { Observable } from 'rxjs';
import { GetFeedMemories } from '@mp/app/feed/util';
import { Timestamp } from 'firebase-admin/firestore';
import { IUser } from '@mp/api/users/util';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPageComponent {
  @Select(FeedState.memories) feedMemories$!: Observable<IMemory[]>;
  @Select(ProfileState.user) user$!: Observable<IUser>;

  showExpandedView = false;

  constructor(private modalController: ModalController, private store: Store) {}

  async addMemory() {
    const modal = await this.modalController.create({
      component: AddMemoryPageComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.feedMemories$.subscribe((memories) => {
        memories.unshift(data);
      });
    }
  }

  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;
  }

  // get Memories() {
  //   return this.memories;
  // }

  //function to covert timePosted to dd MMMM yyyy
  convertTimePostedToDate(timePosted: Timestamp | null | undefined): string {
    if (!timePosted) return 'Invalid Date';

    const date = new Date(timePosted?.seconds);
    return formatDate(date, 'dd MMMM yyyy', 'en-US');
  }

  //function to use timePosted to calculate how long ago the memory was posted
  calculateHowLongAgo(timePosted: Timestamp | null | undefined): string {
    if (!timePosted) return 'Invalid Time';

    const date = new Date(timePosted?.seconds);
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

  formatTime(seconds: number | null | undefined): string {
    if (!seconds)
      seconds = 0;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}h:${m.toString().padStart(2, '0')}m:${s.toString().padStart(2, '0')}s`;
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.store.dispatch(new GetFeedMemories());
      event.target.complete();
    }, 2000);
  }

 ngOnInit(): void { 
    this.store.dispatch(new GetFeedMemories());
 }
}
