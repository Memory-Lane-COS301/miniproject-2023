import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoryCardComponent } from './memory-card.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MemoryCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryCardRouting {}
