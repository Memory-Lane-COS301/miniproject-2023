import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [UserInfoComponent, ],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [UserInfoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserInfoModule {}
