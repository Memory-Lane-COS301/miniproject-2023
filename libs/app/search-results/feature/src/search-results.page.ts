import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IMemory } from '@mp/api/memories/util';
import { Select, Store } from '@ngxs/store';
import { SearchResultsState } from '@mp/app/search-results/data-access';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { IUser } from '@mp/api/users/util';
import { GetUserProfileRequest } from '@mp/app/user-view/util';
import { Timestamp } from 'firebase-admin/firestore';
import { ProfileState } from '@mp/app/profile/data-access';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPageComponent implements OnInit{
  @Select(SearchResultsState.searchResults) results$!: Observable<IMemory[] | null>;
  @Select(SearchResultsState.searchValue) valueSearched$!: Observable<string>;
  @Select(ProfileState.time) time$!: Observable<IUser | null>;

  searchValue = '';
  searchFocus = false;
  showFilters = false;
  showExpandedView = false;
  currentFilter = 'Top Accounts';
  searchResults: IMemory[] | null | undefined;
  memoriesResults: IMemory[] | null | undefined;
  dateResults: IMemory[] | null | undefined;

  constructor(private navCtrl: NavController, private store: Store) {
    this.searchResults = [];
    this.results$.subscribe((results) => {
      this.searchResults = results;
      this.memoriesResults = results ? [...results] : [];
      this.dateResults = results;
    })

    this.valueSearched$.subscribe((value) => {
      this.searchValue = value;
    })
  }

  ngOnInit(): void {
      // this.results$.subscribe((results) => {
      //   this.searchResults = results;
      //   this.memoriesResults = results;
      //   this.dateResults = results;
      // })

      // this.valueSearched$.subscribe((value) => {
      //   this.searchValue = value;
      // })
  }

  //filter search results
  setFilter(filter: string) {
    this.currentFilter = filter;

    if (this.currentFilter === 'Memories') {
      this.memoriesResults = this.getMemoriesResults();
    }
    // this.filterResults();
  }

  // filterResults() {
  //   this.results$.subscribe((results) => {
  //     this.searchResults = results;
  //   });

  //   if (this.currentFilter === 'Top Accounts') {
  //     this.searchResults = this.getTopResults();
  //   } else if (this.currentFilter === 'Memories') {
  //     this.searchResults = this.getMemoriesResults();
  //   } else if (this.currentFilter === 'Date') {
  //     this.searchResults = this.getDateResults();
  //   }
  // }

  //######FIX code below to filter searchResults array
  getTopResults(): IMemory[] | null | undefined {
    // Return the top search results
    return this.searchResults;
  }

  getMemoriesResults(): IMemory[] | null | undefined {
    // Return the search results for memories    
    this.memoriesResults = this.getFilteredMemories(this.memoriesResults); // create a copy of the array

    return this.memoriesResults;
  }

  getDateResults(): IMemory[] | null | undefined {
    // Return the search results for date
    return this.searchResults;
  }

  getFilteredMemories(results: IMemory[] | null | undefined): IMemory[] | null | undefined {
    if (results) {
      for (let i = results.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [results[i], results[j]] = [results[j], results[i]];
      }
      return results;
    }
    else {
      return null;
    }
  }

  openUserProfile(i_userId: string | null | undefined, i_username: string | null | undefined) {
    if (i_userId != null && i_username) {
      const currentPosition = window.pageYOffset;
      this.navCtrl.navigateForward('/user-view', { state: { scrollPosition: currentPosition } });

      const request: IUser = {
        userId: i_userId,
        username: i_username,
      };

      this.store.dispatch(new GetUserProfileRequest(request));
    }
  }

  get ValueSearched() {
    this.searchValue = '';
    this.valueSearched$.subscribe((value) => {
      this.searchValue = value;
    })

    return this.searchValue;
  }
}
