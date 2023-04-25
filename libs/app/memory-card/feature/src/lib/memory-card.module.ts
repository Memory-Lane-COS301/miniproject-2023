import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@mp/app/shared/feature';
import { ViewCommentsModule } from '@mp/app/view-comments/feature';

@NgModule({
  imports: [CommonModule, SharedModule, ViewCommentsModule],
})
export class MemoryCardModule {}
