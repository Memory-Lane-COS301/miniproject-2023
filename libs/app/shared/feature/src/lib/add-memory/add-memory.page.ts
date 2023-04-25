import { Component, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IMemory } from '@mp/api/memories/util';
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
import { ProfileState } from '@mp/app/profile/data-access';
import { AuthState } from '@mp/app/auth/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUser } from '@mp/api/users/util';
import { CreateNewMemory } from "@mp/app/profile-view/util"
import { SetError } from '@mp/app/errors/util';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.page.html',
  styleUrls: ['./add-memory.page.scss'],
})
export class AddMemoryPageComponent {
  @Select(ProfileState.user) user$!: Observable<IUser | null>;

  memory: IMemory = {
    title: '',
    description: '',
    imgUrl: '',
  };

  storage: FirebaseStorage;
  storageRef: StorageReference;
  currentDate: string;
  showExpandedView = false;
  fileSelected = false;

  constructor(
    public modalController: ModalController,
    private readonly store: Store,
  ) {
    this.currentDate = new Date().toISOString();
    // Change in production!!!!!
    this.storage = getStorage(undefined, 'gs://demo-project.appspot.com');
    connectStorageEmulator(this.storage, 'localhost', 5006);
    this.storageRef = ref(this.storage);
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (!file) {
      await this.deleteImageFromStorage()
    } else if (!file.type.match(/image\/*/)) {
      this.store.dispatch(new SetError('Only images are allowed'));
      event.target.value = null;
      this.memory.imgUrl = '';
    } else {
      await this.deleteImageFromStorage()
      this.storageRef = ref(this.storage, file.name);
      const snapshot = await uploadBytes(this.storageRef, file);
      this.memory.imgUrl = await getDownloadURL(snapshot.ref);
      this.fileSelected = true;
    }
  }

  setTitleText() {
    if (this.memory.title)
      this.memory.title = this.memory.title[0].toUpperCase() + this.memory.title.substring(1);
  }

  setDescriptionText() {
    if (this.memory.description)
      this.memory.description = this.memory.description[0].toUpperCase() + this.memory.description.substring(1);
  }

  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;
  }

  async add() {
    if (!this.memory.title || !this.memory.description || !this.memory.imgUrl) {
      this.store.dispatch(new SetError('Some fields are missing'));
    } else {
      const user = this.store.selectSnapshot(AuthState.user);

      if (!user) {
        this.store.dispatch(new SetError('User not set'));
      } else {
        this.memory.userId = user.uid;
        this.store.dispatch(new CreateNewMemory(this.memory))
        await this.modalController.dismiss();
      }
    }
  }

  async deleteImageFromStorage() {
    if (this.fileSelected) {
      await deleteObject(this.storageRef)
      this.fileSelected = false;
      this.memory.imgUrl = '';
    }
  }

  cancel() {
    this.deleteImageFromStorage();
    this.modalController.dismiss();
  }

}