import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewPageComponent } from './user-view.page';
import { UserViewRouting } from './user-view.routing';
import { IonicModule } from '@ionic/angular';
import { UserViewModule as UserViewDataAccessModule } from '@mp/app/user-view/data-access';
import { SharedModule } from '@mp/app/shared/feature';

@NgModule({
  imports: [
    CommonModule,
    UserViewRouting,
    IonicModule,
    SharedModule,
    UserViewDataAccessModule
  ],
  declarations: [UserViewPageComponent],
})
export class UserViewModule {}
