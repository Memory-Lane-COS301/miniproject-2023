import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfileViewPageComponent } from './profile-view.page';
import { ProfileViewRouting } from './profile-view.routing';
import { FormsModule } from '@angular/forms';
import { EditProfilePhotoPageComponent } from './lib/edit-profile-photo/edit-profile-photo.page';
import { ReviveMemoryPageComponent } from './lib/revive-memory/revive-memory.page';
import { SharedModule } from '@mp/app/shared/feature';

@NgModule({
  imports: [CommonModule, IonicModule, ProfileViewRouting, FormsModule, SharedModule],
  declarations: [ProfileViewPageComponent, EditProfilePhotoPageComponent, ReviveMemoryPageComponent],
  exports: [ProfileViewPageComponent, EditProfilePhotoPageComponent, ReviveMemoryPageComponent],
})
export class ProfileViewModule {}
