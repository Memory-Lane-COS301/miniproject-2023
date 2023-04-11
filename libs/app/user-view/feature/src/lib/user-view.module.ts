import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewPageComponent } from './user-view.page';
import { UserViewRouting } from './user-view.routing';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, UserViewRouting, IonicModule],
  declarations: [UserViewPageComponent],
})
export class UserViewModule {}
