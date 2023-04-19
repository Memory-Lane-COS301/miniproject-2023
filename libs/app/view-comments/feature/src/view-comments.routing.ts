import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCommentsPageComponent } from './view-comments.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewCommentsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCommentsRouting {}