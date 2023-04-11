import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FeedPageComponent } from './feed.page';
import { FeedRouting } from './feed.routing';
import { SharedModule } from '../../../shared/feature/src/lib/shared.module';

@NgModule({
  imports: [CommonModule, IonicModule, FeedRouting, SharedModule],
  declarations: [FeedPageComponent],
  exports: [FeedPageComponent],
})
export class FeedModule {}
