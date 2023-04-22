import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { IMemory } from '@mp/api/memories/util';
import { Select, Store } from '@ngxs/store';
import { SearchResultsState } from '@mp/app/search-results/data-access';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { IUser } from '@mp/api/users/util';
import { GetUserProfileRequest } from '@mp/app/user-view/util';
import { Timestamp } from 'firebase-admin/firestore';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPageComponent {
  @Select(SearchResultsState.searchResults) results$!: Observable<IMemory[] | null>;

  searchValue = '';
  searchFocus = false;
  showFilters = false;
  showExpandedView = false;
  currentFilter = 'Top Accounts';
  searchResults: IMemory[] | null | undefined;

  constructor(
    private navCtrl: NavController,
    private store: Store
  ) {}

  //filter search results
  setFilter(filter: string) {
    this.currentFilter = filter;
    this.filterResults();
  }

  filterResults() {
    this.results$.subscribe((results) => {
      this.searchResults = results;
    });

    if (this.currentFilter === 'Top Accounts') {
      this.searchResults = this.getTopResults();
    } else if (this.currentFilter === 'Memories') {
      this.searchResults = this.getMemoriesResults();
    } else if (this.currentFilter === 'Date') {
      this.searchResults = this.getDateResults();
    }
  }

  //######FIX code below to filter searchResults array
  getTopResults(): IMemory[] | null | undefined {
    // Return the top search results
    return this.searchResults;
  }

  getMemoriesResults(): IMemory[] | null | undefined {
    // Return the search results for memories
    return this.searchResults;
  }

  getDateResults(): IMemory[] | null | undefined {
    // Return the search results for date
    return this.searchResults;
  }

  openUserProfile(i_userId: string | null | undefined, i_username: string | null | undefined) {
    if (i_userId != null && i_username) {
      const currentPosition = window.pageYOffset;
      this.navCtrl.navigateForward('/user-view', { state: { scrollPosition: currentPosition } });

      const request : IUser = {
        userId: i_userId,
        username: i_username
      }

      this.store.dispatch(new GetUserProfileRequest(request));
    }
  }
}
