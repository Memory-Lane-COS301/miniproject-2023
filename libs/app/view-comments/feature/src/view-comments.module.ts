import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@mp/app/shared/feature';
import { ViewCommentsPageComponent } from './view-comments.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [ViewCommentsPageComponent],
  exports: [ViewCommentsPageComponent]
})
export class ViewCommentsModule {}
