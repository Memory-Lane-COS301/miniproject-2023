import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Memory } from '../../Memory';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.page.html',
  styleUrls: ['./add-memory.page.scss'],
})
export class AddMemoryPageComponent {
  memory: Memory = {
    title: '',
    description: '',
    imageUrl: '',
    date: '',
  };

  currentDate: string;

  constructor(public modalController: ModalController, private alertCtrl: AlertController) {
    this.currentDate = new Date().toISOString();
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
      this.memory.imageUrl = '';
      await alert.present();
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result !== null) {
          this.memory.imageUrl = reader.result.toString();
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

  async add() {
    const dateObj = new Date();

    // mulitply timezone offset with 60000 to get offset in milliseconds
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;

    // subtract it from original date to get the local date and time
    const localDate = new Date(dateObj.getTime() - timezoneOffset);
    const formattedDate = localDate.toLocaleDateString(navigator.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newMemory: Memory = {
      title: this.memory.title,
      description: this.memory.description,
      imageUrl: this.memory.imageUrl,
      date: formattedDate,
    };

    if (!this.memory.title || !this.memory.description || !this.memory.imageUrl) {
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
}
