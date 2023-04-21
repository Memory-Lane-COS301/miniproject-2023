import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Memory } from '../../Memory';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.page.html',
  styleUrls: ['./add-memory.page.scss'],
})
export class AddMemoryPageComponent {
  showExpandedView = false;
  memory: Memory = {
    username: '',
    profileUrl: '',
    imgUrl: '',
    title: '',
    description: '',
    comments: [],  
    timePosted: '',
    alive: false
  };

  currentDate: string;

  constructor(public modalController: ModalController, private alertCtrl: AlertController) {
    this.currentDate = new Date().toISOString();
    this.memory.username = 'Your username';
    this.memory.profileUrl = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60';   
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file || !file.type.match(/image\/*/)) {
      const alert = await this.alertCtrl.create({
        cssClass: 'file-select-alert',
        header: 'Invalid file selected',
        subHeader: 'Only images are allowed',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Alert dismissed');
            },
          },
        ],
      });

      event.target.value = null;
      this.memory.imgUrl = '';
      await alert.present();
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result !== null) {
          this.memory.imgUrl = reader.result.toString();
        }
      };
    }
  }

  setTitleText() {
    if (this.memory.title !== '') {
      this.memory.title = this.memory.title[0].toUpperCase() + this.memory.title.substring(1);
    }
  }
  setDescriptionText() {
    if (this.memory.description !== '') {
      this.memory.description = this.memory.description[0].toUpperCase() + this.memory.description.substring(1);
    }
  }

  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;
  }

  async add() {
    const dateObj = new Date();
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
    const localDate = new Date(dateObj.getTime() - timezoneOffset);
    const standardDate = localDate.toISOString().replace(/Z$/, '');

    // // mulitply timezone offset with 60000 to get offset in milliseconds
    // const timezoneOffset = dateObj.getTimezoneOffset() * 60000;

    // // subtract it from original date to get the local date and time
    // const localDate = new Date(dateObj.getTime() - timezoneOffset);
    // const formattedDate = localDate.toLocaleDateString(navigator.language, {
    //   day: 'numeric',
    //   month: 'long',
    //   year: 'numeric',
    // });

    const newMemory: Memory = {
      username: this.memory.username,
      profileUrl: this.memory.profileUrl,
      imgUrl: this.memory.imgUrl,
      title: this.memory.title,
      description: this.memory.description,
      comments: [],  
      timePosted: standardDate,
      alive: true
    };

    if (!this.memory.title || !this.memory.description || !this.memory.imgUrl) {
      const alert = await this.alertCtrl.create({
        cssClass: 'add-memory-alert',
        header: 'Invalid input received',
        subHeader: 'Please fill in all fields.',
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
    } else {
      this.modalController.dismiss(newMemory);
    }
  }

  cancel() {
    this.modalController.dismiss();
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