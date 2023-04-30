import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoModule } from './lib/user-info';

@NgModule({
  imports: [CommonModule, UserInfoModule],
  exports: [UserInfoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
