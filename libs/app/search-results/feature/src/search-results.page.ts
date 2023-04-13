import { formatDate } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPageComponent {
  searchValue = '';
  searchFocus = false;
  showFilters = false;
  showExpandedView = false;
  currentFilter = 'Top Accounts';

  memoriesArray: any[] = [
    {
      username: '@username',
      profileUrl:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
      imgUrl:
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
      title: 'Last day of Highschool',
      description: 'Example of a description for the memory',
      comments: [
        {
          username: '@commentedUsername',
          profileImgUrl:
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
          comment:
            'This is an example comment. The idea of this comment is to show you what a comment on a memory looks like. And that it can overflow.',
        },
      ],
      timePosted: '2020-11-14T10:30:00.000-07:00',
    },
  ];
  recentSearches: string[] = ['1', '2', '3', '4', '5']; //first 7 recents are shown
  searchResults: string[] = [
    '@user1',
    '@user2exa',
    '@user3',
    '@user4',
    '@user5example',
    '@user6',
    '@user7test',
    '@user8',
    '@user9sport',
  ];
  tempSearchResults: string[] = [];

  onSearchFocus() {
    this.searchFocus = true;
  }
  onSearchBlur() {
    this.searchFocus = false;
  }
  onInputChange() {
    this.showFilters = false;
    this.onSearchFocus();
    this.tempSearchResults = this.SearchResults;
  }
  onSearch(searchTerm: string) {
    // Add search term to the beginning of the array
    if (searchTerm != '') {
      this.recentSearches.unshift(searchTerm);
    }
    if (searchTerm != '' && this.tempSearchResults.length != 0) {
      this.showFilters = true;
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
    return this.recentSearches;
  }
  get SearchResults() {
    return this.searchResults.filter((user) => {
      return user.toLowerCase().includes(this.searchValue.toLowerCase());
    });
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

  //filter search results
  setFilter(filter: string) {
    this.currentFilter = filter;
    this.filterResults();
  }

  filterResults() {
    if (this.currentFilter === 'Top Accounts') {
      this.searchResults = this.getTopResults();
    } else if (this.currentFilter === 'Memories') {
      this.searchResults = this.getMemoriesResults();
    } else if (this.currentFilter === 'Date') {
      this.searchResults = this.getDateResults();
    }
  }

  //######FIX code below to filter searchResults array
  getTopResults(): string[] {
    // Return the top search results
    return this.searchResults;
  }

  getMemoriesResults(): string[] {
    // Return the search results for memories
    return this.searchResults;
  }

  getDateResults(): string[] {
    // Return the search results for date
    return this.searchResults;
  }
}
