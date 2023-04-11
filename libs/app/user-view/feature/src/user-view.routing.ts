import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewPageComponent } from './user-view.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserViewPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserViewRouting {}
