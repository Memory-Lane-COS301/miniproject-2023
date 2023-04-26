import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IUser } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { AuthState } from '@mp/app/auth/data-access';
import { ProfileImageService } from '@mp/app/services/feature';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { 
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  connectStorageEmulator,
  StorageReference,
  FirebaseStorage,
  deleteObject
} from "firebase/storage";
import { SetError } from '@mp/app/errors/util';
import { UpdateUser } from '@mp/app/profile/util';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-photo',
  templateUrl: './edit-profile-photo.page.html',
  styleUrls: ['./edit-profile-photo.page.scss'],
})
export class EditProfilePhotoPageComponent {
  @Select(ProfileState.user) user$!: Observable<IUser | null>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  storage: FirebaseStorage;
  storageRef: StorageReference;
  fileSelected = false;
  imgUrl: string;

  constructor(
    public modalController: ModalController,
    private store: Store,
    private readonly toastController: ToastController
  ) {
    // Change in production!!!!!
    this.storage = getStorage(undefined, 'gs://demo-project.appspot.com');
    connectStorageEmulator(this.storage, 'localhost', 5006);
    this.storageRef = ref(this.storage);

    const user = this.store.selectSnapshot(ProfileState.user);
    this.imgUrl = user?.profileImgUrl || '';

    this.user$.subscribe(user => this.imgUrl = user?.profileImgUrl || '')
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (!file) {
      await this.deleteImageFromStorage()
    } else if (!file.type.match(/image\/*/)) {
      this.store.dispatch(new SetError('Only images are allowed'));
      event.target.value = null;
    } else {
      await this.deleteImageFromStorage()
      this.storageRef = ref(this.storage, file.name);
      const snapshot = await uploadBytes(this.storageRef, file);
      this.imgUrl = await getDownloadURL(snapshot.ref);
      this.fileSelected = true;
    }
  }

  async deleteImageFromStorage() {
    if (this.fileSelected) {
      await deleteObject(this.storageRef)
      const user = this.store.selectSnapshot(ProfileState.user);
      this.imgUrl = user?.profileImgUrl || '';
      this.fileSelected = false;
    }
  }

  async cancel() {
    this.deleteImageFromStorage();
    await this.modalController.dismiss();
  }

  async save() {
    if (!this.fileSelected) {
      this.store.dispatch(new SetError('Please select a new profile photo'));
    } else {
      const user = this.store.selectSnapshot(AuthState.user);

      if (!user) {
        this.store.dispatch(new SetError('User not set'));
      } else {
        this.store.dispatch(new UpdateUser({ 
          userId: user.uid,
          profileImgUrl: this.imgUrl 
        }));

        const toast = await this.toastController.create({
          message: 'Profile photo updated',
          color: 'success',
          duration: 1500,
          position: 'bottom',
        });
  
        toast.present();
        await this.modalController.dismiss();
      }
    }
  }

  onEditIconClicked() {
    this.fileInput.nativeElement.click();
  }

}
