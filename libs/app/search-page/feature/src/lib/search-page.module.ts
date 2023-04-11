import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search.page';
import { SearchPageRouting } from './search-page.routing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/feature/src';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, SearchPageRouting, IonicModule],
  declarations: [SearchPageComponent],
})
export class SearchPageModule {}
