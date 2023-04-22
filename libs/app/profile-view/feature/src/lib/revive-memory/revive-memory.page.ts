import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IMemory } from '@mp/api/memories/util';
import { ReviveMemoryState } from '@mp/app/profile-view/data-access';
import { ReviveMemory, SetDeadMemories } from '@mp/app/profile-view/util';
import { Select, Store } from '@ngxs/store';
import { Timestamp } from 'firebase-admin/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-revive-memory',
  templateUrl: './revive-memory.page.html',
  styleUrls: ['./revive-memory.page.scss'],
})
export class ReviveMemoryPageComponent {
  @Select(ReviveMemoryState.deadMemories) deadMemories$!: Observable<IMemory[] | null>;

  didSelect: boolean;
  selectedElement: any;

  constructor(public modalController: ModalController, private alertCtrl: AlertController, private store: Store) {
    this.didSelect = false;
  }

  selectedImage(element: any) {
    this.didSelect = true;

    if (this.selectedElement && this.selectedElement !== element) {
      this.selectedElement.selected = false;
    }

    element.selected = !element.selected;
    this.selectedElement = element;
  }

  async revive() {
    if (!this.didSelect) {
      const alert = await this.alertCtrl.create({
        cssClass: 'add-memory-alert',
        header: 'Invalid selection',
        subHeader: 'Please make sure to select a memory.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Alert dismissed');
            },
          },
        ],
      });

      await alert.present();

      this.store.dispatch(new SetDeadMemories(this.selectedElement));
    } else {
      this.modalController.dismiss();
    }
  }

  cancel() {
    this.modalController.dismiss();
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
}
