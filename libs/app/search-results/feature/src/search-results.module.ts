import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsPageComponent } from './search-results.page';
import { SearchResultsPageRouting } from './search-results.routing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@mp/app/shared/feature';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, SearchResultsPageRouting, IonicModule],
  declarations: [SearchResultsPageComponent],
})
export class SearchResultsPageModule {}
