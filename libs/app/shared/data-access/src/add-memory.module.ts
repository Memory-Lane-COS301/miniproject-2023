import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AddMemoryState } from './add-memory.state';
import { AddMemoryApi } from './add-memory.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([AddMemoryState])],
  providers: [AddMemoryApi],
})
export class AddMemoryModule {}