import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IUser } from '@mp/api/users/util';
import { GetUserProfileRequest } from '@mp/app/user-view/util';
import { Select, Store } from '@ngxs/store';
import { SearchPageState } from '@mp/app/search-page/data-access';
import { IMemory } from '@mp/api/memories/util';
import { Observable } from 'rxjs';
import { SetSearchResults, SetSearchValue } from '@mp/app/search-results/util';
import { Timestamp } from 'firebase-admin/firestore';
import { Memory } from '@mp/app/shared/feature';
import { GetSearchPageMemories } from '@mp/app/search-page/util';
import { GetFeedMemories } from '@mp/app/feed/util';
import { FeedState } from '@mp/app/feed/data-access';
import { ProfileState } from '@mp/app/profile/data-access';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPageComponent implements OnInit{
  @Select(FeedState.memories) searchPageMemories$!: Observable<IMemory[] | null>;
  @Select(SearchPageState.recentSearches) recentSearches$!: Observable<string[] | null>;
  @Select(ProfileState.time) time$!: Observable<IUser | null>;

  searchValue = '';
  searchFocus = false;
  currentFilter = 'Top';
  showExpandedView = false;

  memoriesArray: IMemory[] | null | undefined;
  recentSearches: string[] | null | undefined; //only the first 10 will show
  searchResults: IMemory[] | null | undefined;
  tempSearchResults: IMemory[] | null | undefined;

  constructor(private navCtrl: NavController, private store: Store) {}

  onSearchFocus() {
    this.searchFocus = true;
  }
  onSearchBlur() {
    this.searchFocus = false;
  }
  onInputChange(searchValue: string) {
    this.searchValue = searchValue;
    this.onSearchFocus();
    this.tempSearchResults = this.SearchResults;
  }
  onSearch(searchTerm: string) {
    // Add search term to the beginning of the array
    if (searchTerm != '') {
      this.recentSearches$.subscribe((recentSearches) => {
        recentSearches?.unshift(searchTerm);
      });

      this.store.dispatch(new SetSearchValue(searchTerm));
      this.store.dispatch(new SetSearchResults(this.SearchResults)); 
      this.navCtrl.navigateForward('/search-results');
    }
    //fetch user accounts based on search value and populate searchUsers array
  }
  chosenRecentSearch(event: MouseEvent, search: string) {
    event.stopPropagation();
    this.searchValue = search;
    alert(event);
  }
  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;
  }

  get RecentSearches() {
    this.recentSearches$.subscribe((recentSearches) => {
      this.recentSearches = recentSearches;
    });

    return this.recentSearches;
  }

  get SearchResults() {
    this.searchResults = [];

    this.searchPageMemories$.subscribe((searchPageMemories) =>{
      searchPageMemories?.filter((mem) => {
        if (mem.username?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())) {
          this.searchResults?.push(mem);
        }
      });
    });

    this.store.dispatch(new SetSearchResults(this.searchResults))
    return this.searchResults;
  }

  get Memories() {
    return this.memoriesArray;
  }

  //function to covert timePosted to dd MMMM yyyy
  convertTimePostedToDate(timePosted: string): string {
    const date = new Date(timePosted);
    return formatDate(date, 'dd MMMM yyyy', 'en-US');
  }

  //function to use timePosted to calculate how long ago the memory was posted
  calculateHowLongAgo(timePosted: string): string {
    const date = new Date(timePosted);
    const timeDifference = Date.now() - date.getTime();

    // Convert time difference to "time ago" string
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }

  openUserProfile(uid: string | null | undefined, uname: string | null | undefined) {
    const user = this.store.selectSnapshot(ProfileState.user);

    if(!uid || !uname) return;

    if (user && user.userId && user.username) {
        if (uid != user.userId && uname != user.name) {
            const request_user : IUser = {
                userId: uid,
                username: uname
            }

            this.store.dispatch(new GetUserProfileRequest(request_user));
        }
    }
}

  formatTime(seconds: number | null | undefined): string {
    if (!seconds)
      seconds = 0;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}h:${m.toString().padStart(2, '0')}m:${s.toString().padStart(2, '0')}s`;
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.store.dispatch(new GetFeedMemories());
      event.target.complete();
    }, 2000);
  }

 ngOnInit(): void { 
    this.store.dispatch(new GetFeedMemories());
 }
}
