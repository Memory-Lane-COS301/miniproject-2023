import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { UserViewState } from './user-view.state';
import { UserViewApi } from './user-view.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([UserViewState]), AuthModule],
  providers: [UserViewApi],
})
export class UserViewModule {}
