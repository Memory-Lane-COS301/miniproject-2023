import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IUser } from '@mp/api/users/util';
import { GetUserProfileRequest } from '@mp/app/user-view/util';
import { Select, Store } from '@ngxs/store';
import { SearchPageState } from '@mp/app/search-page/data-access';
import { IMemory } from '@mp/api/memories/util';
import { Observable } from 'rxjs';
import { SetSearchResults } from '@mp/app/search-results/util';
import { Timestamp } from 'firebase-admin/firestore';
import { Memory } from '@mp/app/shared/feature';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPageComponent {
  @Select(SearchPageState.memories) memories$!: Observable<IMemory[] | null>;
  @Select(SearchPageState.recentSearches) recentSearches$!: Observable<string[] | null>;

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
  onInputChange() {
    this.onSearchFocus();
    this.tempSearchResults = this.SearchResults;
  }
  onSearch(searchTerm: string) {
    // Add search term to the beginning of the array
    if (searchTerm != '') {
      this.recentSearches$.subscribe((recentSearches) => {
        recentSearches?.unshift(searchTerm);
      });

      this.navCtrl.navigateForward('/search-results');
      this.store.dispatch(new SetSearchResults(this.searchResults));
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
    this.memories$.subscribe((memories) => {
      memories?.filter((mem) => {
        if (mem.username?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())) {
          this.searchResults?.push(mem);
        }
      });
    });

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

  // tempMem : Memory[] = [
  //   {
  //     userId: '18298782739172',
  //     username: '@username',
  //     profileImgUrl:
  //       'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
  //     title: 'Last day of Highschool',
  //     description: 'Example of a description for the memory',
  //     comments: [
  //       {
  //         username: '@commentedUsername',
  //         profileImgUrl:
  //           'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
  //         text:
  //           'This is an example comment. The idea of this comment is to show you what a comment on a memory looks like. And that it can overflow.',
  //       },
  //     ],
  //     created: new Timestamp(1605371400, 0),
  //   },
  // ]
  // get SearchResults() {
  //   return this.tempMem;
  // }
}
