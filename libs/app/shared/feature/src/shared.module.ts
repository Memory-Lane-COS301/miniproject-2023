import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MemoryCardComponent } from './lib/memory-card/memory-card.component';
import { AddMemoryPageComponent } from './lib/add-memory/add-memory.page';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [MemoryCardComponent, AddMemoryPageComponent],
  exports: [MemoryCardComponent],
})
export class SharedModule {}
