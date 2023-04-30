import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search.page';
import { SearchPageRouting } from './search-page.routing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@mp/app/shared/feature';
import { SearchPageModule as SearchPageDataAccessModule } from '@mp/app/search-page/data-access';

@NgModule({
  imports: [CommonModule, FormsModule, SearchPageRouting, SharedModule, IonicModule, SearchPageDataAccessModule],
  declarations: [SearchPageComponent],
})
export class SearchPageModule {}
