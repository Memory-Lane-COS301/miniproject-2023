import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewPageComponent } from './profile-view.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfileViewPageComponent,
  },
  {
    path: 'Dashboard',
    loadChildren: () => import('@mp/app/dashboard/feature').then((m) => m.DashboardModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('@mp/app/profile/feature').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileViewRouting {}
