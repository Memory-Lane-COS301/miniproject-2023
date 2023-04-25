import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { NotificationPageState } from './notification-page.state';
import { NotificationPageApi } from './notification-page.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([NotificationPageState]), AuthModule],
  providers: [NotificationPageApi],
})
export class NotificationPageModule {}