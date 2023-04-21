import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SearchResultsState } from './search-results.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([SearchResultsState])],
//   providers: [ProfileViewApi],
})
export class SearchResultsModule {}