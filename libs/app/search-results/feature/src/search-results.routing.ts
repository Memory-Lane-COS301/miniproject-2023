import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsPageComponent } from './search-results.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchResultsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchResultsPageRouting {}
