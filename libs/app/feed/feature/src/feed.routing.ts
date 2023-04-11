import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedPageComponent } from './feed.page';
// import { ProfileViewPageComponent } from './profile-view.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FeedPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRouting {}
