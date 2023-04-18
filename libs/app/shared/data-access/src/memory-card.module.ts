import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MemoryCardState } from './memory-card.state';
import { MemoryCardApi } from './memory-card.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([MemoryCardState])],
  providers: [MemoryCardApi],
})
export class MemoryCardModule {}