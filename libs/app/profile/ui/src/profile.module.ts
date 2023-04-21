import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserDetailsModule } from './user-details';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UserDetailsModule,
  ],
  exports: [
    UserDetailsModule,
  ],
})
export class ProfileModule {}
