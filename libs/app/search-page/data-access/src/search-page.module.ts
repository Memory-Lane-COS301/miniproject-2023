import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SearchPageState } from './search-page.state';
import { SearchPageApi } from './search-page.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([SearchPageState])],
  providers: [SearchPageApi],
})
export class SearchPageModule {}