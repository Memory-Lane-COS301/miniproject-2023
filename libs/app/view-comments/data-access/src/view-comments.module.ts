import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { ViewedCommentsState } from './view-comments.state';
import { ViewedCommentsApi } from './view-comments.api';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ViewedCommentsState]), AuthModule],
  providers: [ViewedCommentsApi, AngularFireFunctions],
})
export class ViewCommentsModule {}
