import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-revive-memory',
  templateUrl: './revive-memory.page.html',
  styleUrls: ['./revive-memory.page.scss'],
})
export class ReviveMemoryPageComponent {
  elements = [
    {
      id: 1,
      title: 'Element 1',
      description: 'Description 1',
      imageUrl:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60',
      date: 'Date 1',
      selected: false,
    },
    {
      id: 2,
      title: 'Element 2',
      description: 'Description 2',
      imageUrl:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60',
      date: 'Date 2',
      selected: false,
    },
    {
      id: 3,
      title: 'Element 3',
      description: 'Description 3',
      imageUrl:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60',
      date: 'Date 3',
      selected: false,
    },
  ];

  didSelect: boolean;
  selectedElement: any;

  constructor(public modalController: ModalController, private alertCtrl: AlertController) {
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
    } else {
      this.modalController.dismiss();
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}
