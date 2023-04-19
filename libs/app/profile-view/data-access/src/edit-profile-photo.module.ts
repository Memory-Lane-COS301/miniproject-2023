import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { EditProfilePhotoState } from './edit-profile-photo.state';
import { EditProfilePhotoApi } from './edit-profile-photo.api';


@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([EditProfilePhotoState])],
  providers: [EditProfilePhotoApi],
})
export class EditProfilePhotoModule {}