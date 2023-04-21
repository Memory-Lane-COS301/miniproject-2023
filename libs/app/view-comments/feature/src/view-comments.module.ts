import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewCommentsPageComponent } from './view-comments.page';
import { FormsModule } from '@angular/forms';
import { ViewCommentsRouting } from './view-comments.routing';
import { ViewCommentsModule as ViewCommentsDataAccessModule } from '@mp/app/view-comments/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ViewCommentsRouting,
    ViewCommentsDataAccessModule
  ],
  declarations: [ViewCommentsPageComponent],
  exports: [ViewCommentsPageComponent]
})
export class ViewCommentsModule {}
