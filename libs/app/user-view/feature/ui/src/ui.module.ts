import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoModule } from './lib/user-info';

@NgModule({
  imports: [CommonModule, UserInfoModule],
  exports: [UserInfoModule],
})
export class UiModule {}
