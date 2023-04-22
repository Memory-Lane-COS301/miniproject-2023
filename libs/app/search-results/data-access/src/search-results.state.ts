import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
// import { SearchResultsApi } from './search-results.api';
import { SetSearchResults } from '@mp/app/search-results/util';
import { IMemory } from '@mp/api/memories/util';
import produce from 'immer';

export interface SearchResultsStateModel {
  results: IMemory[] | null | undefined;
}

@State<SearchResultsStateModel>({
  name: 'searchResults',
  defaults: {
    results: [],
  },
})
@Injectable()
export class SearchResultsState {
  // constructor(private searchResultsApi: SearchResultsApi) {}

  @Selector()
  static searchResults(state: SearchResultsStateModel) {
    return state.results;
  }

  @Action(SetSearchResults)
  async setSearchResults(ctx: StateContext<SearchResultsStateModel>, { results }: SetSearchResults) {
    ctx.setState(
      produce((draft) => {
        draft.results = results;
      }),
    );
  }
}
