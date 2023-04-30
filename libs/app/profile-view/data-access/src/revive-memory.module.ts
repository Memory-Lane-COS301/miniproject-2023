import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ReviveMemoryState } from './revive-memory.state';
import { ReviveMemoryApi } from './revive-memory.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ReviveMemoryState])],
  providers: [ReviveMemoryApi],
})
export class ReviveMemoryModule {}