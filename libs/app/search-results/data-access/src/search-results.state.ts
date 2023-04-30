import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
// import { SearchResultsApi } from './search-results.api';
import { SetSearchResults, SetSearchValue } from '@mp/app/search-results/util';
import { IMemory } from '@mp/api/memories/util';
import produce from 'immer';

export interface SearchResultsStateModel {
  results: IMemory[] | null | undefined;
  searchValue: string;
}

@State<SearchResultsStateModel>({
  name: 'searchResults',
  defaults: {
    results: [],
    searchValue: ''
  },
})
@Injectable()
export class SearchResultsState {
  constructor(
    // private searchResultsApi: SearchResultsApi,    
    private readonly store: Store
  ) {}

  @Selector()
  static searchResults(state: SearchResultsStateModel) {
    return state.results
  }

  @Selector()
  static searchValue(state: SearchResultsStateModel) {
    return state.searchValue;
  }

  @Action(SetSearchResults)
  setSearchResults(ctx: StateContext<SearchResultsStateModel>, { results }: SetSearchResults) {
    ctx.setState(
      produce((draft) => {
        draft.results = results;
      }),
    );
  }

  @Action(SetSearchValue)
  setSearchValue(ctx: StateContext<SearchResultsStateModel>, { searchValue }: SetSearchValue) {
    ctx.setState(
      produce((draft) => {
        draft.searchValue = searchValue;
      })
    )
  }
}
