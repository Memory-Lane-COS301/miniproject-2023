import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewCommentsPageComponent } from './view-comments.page';
import { FormsModule } from '@angular/forms';
import { ViewCommentsRouting } from './view-comments.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ViewCommentsRouting
  ],
  declarations: [ViewCommentsPageComponent],
  exports: [ViewCommentsPageComponent]
})
export class ViewCommentsModule {}
