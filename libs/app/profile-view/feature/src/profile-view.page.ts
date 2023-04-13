import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditProfilePhotoPageComponent } from './lib/edit-profile-photo/edit-profile-photo.page';
import { AddMemoryPageComponent, Memory, ProfileImage } from '@mp/app/shared/feature';
import { ReviveMemoryPageComponent } from './lib/revive-memory/revive-memory.page';
import { MenubarService, ProfileImageService } from '@mp/app/services/feature';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPageComponent implements OnInit {
  memories: Memory[] = [];
  profileImage: ProfileImage;

  constructor(
    public modalController: ModalController,
    private profileImageService: ProfileImageService,
    private menubarService: MenubarService,
  ) {
    this.profileImage = profileImageService.profileImage;
  }

  ngOnInit(): void {
    this.profileImage = this.profileImageService.profileImage;
  }

  toggleMenuStatus() {
    this.menubarService.menuStatus = !this.menubarService.menuStatus;
  }

  async addMemory() {
    const modal = await this.modalController.create({
      component: AddMemoryPageComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.memories.unshift(data);
    }
  }

  async editProfilePhoto() {
    const modal = await this.modalController.create({
      component: EditProfilePhotoPageComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

  async revive() {
    const modal = await this.modalController.create({
      component: ReviveMemoryPageComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }
}
