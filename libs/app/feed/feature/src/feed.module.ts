import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FeedPageComponent } from './feed.page';
import { FeedRouting } from './feed.routing';
import { SharedModule } from '@mp/app/shared/feature';
import { ViewCommentsModule } from '@mp/app/view-comments/feature';
import { FeedModule as FeedDataAccessModule } from '@mp/app/feed/data-access';

@NgModule({
  imports: [CommonModule, IonicModule, FeedRouting, SharedModule, ViewCommentsModule, FeedDataAccessModule],
  declarations: [FeedPageComponent],
  exports: [FeedPageComponent],
})
export class FeedModule {}
