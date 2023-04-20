import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ProfileViewState } from './profile-view.state';
import { ProfileViewApi } from './profile-view.api'

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ProfileViewState])],
  providers: [ProfileViewApi],
})
export class ProfileViewModule {}