import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@mp/app/shared/feature';
import { ViewCommentsPageComponent } from './view-comments.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  declarations: [ViewCommentsPageComponent],
  exports: [ViewCommentsPageComponent]
})
export class ViewCommentsModule {}
