import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { UserViewState } from './user-view.state';
import { UserViewApi } from './user-view.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([UserViewState]), AuthModule],
  providers: [UserViewApi],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserViewModule {}
