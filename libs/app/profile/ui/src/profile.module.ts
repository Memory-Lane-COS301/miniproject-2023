import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AccountDetailsModule } from './account-details';
import { UserDetailsModule } from './user-details';
import { ProfileStatusModule } from './profile-status';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountDetailsModule,
    UserDetailsModule,
    ProfileStatusModule,
  ],
  exports: [
    AccountDetailsModule,
    UserDetailsModule,
    ProfileStatusModule,
  ],
})
export class ProfileModule {}
