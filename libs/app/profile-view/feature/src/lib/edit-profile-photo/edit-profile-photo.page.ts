import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IUser } from '@mp/api/users/util';
import { EditProfilePhotoState } from '@mp/app/profile-view/data-access';
import { ChangeProfileViewImage, SetEditProfileImagePhoto } from '@mp/app/profile-view/util';
import { ProfileImageService } from '@mp/app/services/feature';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile-photo',
  templateUrl: './edit-profile-photo.page.html',
  styleUrls: ['./edit-profile-photo.page.scss'],
})
export class EditProfilePhotoPageComponent {
  @Select(EditProfilePhotoState.editProfilePhoto) user$!: Observable<IUser | null>;

  previousUrl: string;

  constructor(
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private profileImageService: ProfileImageService,
    private store: Store
  ) {
    this.previousUrl = '';

    if (this.getProfileImageUrl() !== '') {
      this.previousUrl = this.getProfileImageUrl();
      this.setProfileImage('');
    }
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
      this.setProfileImage('');
      await alert.present();
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result !== null) {
          this.setProfileImage(reader.result.toString());
        }
      };
    }
  }

  async cancel() {
    if (this.previousUrl !== '') {
      this.setProfileImage(this.previousUrl);
    }
    await this.modalController.dismiss();
  }

  async save() {
    await this.modalController.dismiss();
  }

  getProfileImageUrl(): string {
    return this.profileImageService.imageUrl;
  }

  setProfileImage(url: string) {
    this.profileImageService.imageUrl = url;

    let id : string | null | undefined = '';
    this.user$.subscribe((user) => {
      id = user?.userId;
    })

    this.store.dispatch(new SetEditProfileImagePhoto(url));
    this.store.dispatch(new ChangeProfileViewImage(url, id));
  }
}
