import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MemoryCardComponent } from './lib/memory-card/memory-card.component';
import { AddMemoryPageComponent } from './lib/add-memory/add-memory.page';
import { ViewCommentsRouting } from '@mp/app/view-comments/feature';
import {
  MemoryCardModule as MemoryCardDataAccessModule,
  AddMemoryModule as AddMemoryDataAccessModule,
} from '@mp/app/shared/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ViewCommentsRouting,
    MemoryCardDataAccessModule,
    AddMemoryDataAccessModule,
  ],
  declarations: [MemoryCardComponent, AddMemoryPageComponent],
  exports: [MemoryCardComponent],
})
export class SharedModule {}
