import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificationPage } from './notification-page.page';
import { FormsModule } from '@angular/forms';
import { NotificationPageRouting } from './notification-page.routing';
import { NotificationPageModule as NotificationPageDataAccessModule } from '@mp/app/notification-page/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NotificationPageRouting,
    NotificationPageDataAccessModule
  ],
  declarations: [NotificationPage],
  exports: [NotificationPage]
})
export class NotificationPageModule {}
