import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { ViewedCommentsState } from './view-comments.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ViewedCommentsState]), AuthModule],
//   providers: [ViewedCommentsApi],
})
export class ViewCommentsModule {}