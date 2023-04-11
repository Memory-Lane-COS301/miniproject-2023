import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('@mp/app/feed/feature').then((m) => m.FeedModule),
      },
      {
        path: 'profile-view',
        loadChildren: () => import('@mp/app/profile-view/feature').then((m) => m.ProfileViewModule),
      },
      {
        path: 'search-page',
        loadChildren: () => import('@mp/app/search-page/feature').then((m) => m.SearchPageModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/feed',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/feed',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {}
