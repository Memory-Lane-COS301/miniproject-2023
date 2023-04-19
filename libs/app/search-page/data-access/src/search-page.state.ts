import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { SetFeed } from "@mp/app/feed/util";
import { IGetUserRequest, IUser } from "@mp/api/users/util";
import { IMemory } from "@mp/api/memories/util";
import { SearchPageApi } from "./search-page.api";


// export interface FeedStateModel {
//     // users: IUser[];
//     memories: IMemory[];
// }

// @State<FeedStateModel>({
//     name: 'feed',
//     defaults: {
//         // users: []
//         memories: []
//     },
// })

@State<SearchPageStateModel>({
  name: 'searchPage',
  defaults: {
      searchResults: [],
      error: null},
  })


@Injectable()
export class SearchPageState {
    constructor(
        private readonly feedApi: SearchPageApi,
        private readonly store: Store
    ){}


  /*@Selector()
  static searchResults(state: SearchPageStateModel) {
    return state.searchResults;
  }
*/

 /* @Action(SetSearchResults)
  setSearchResults(
    ctx: StateContext<SearchPageStateModel>,
    action: SetSearchResults
  ) {
    const state = ctx.getState();
    const newState = { ...state, searchResults: action.results };
    ctx.patchState(newState);
  }*/

  @Action(SetSearchResults)
  setSearchResults(ctx: StateContext<SearchPageStateModel>, { searchResults }: SetSearchResults) {
      ctx.setState(
          produce(ctx.getState(), (draft: SearchPageStateModel) => {
              draft.searchResults = searchResults;
          })
      );
  }

  @Action(SetError)
  setError(ctx: StateContext<SearchPageStateModel>, { error }: SetError) {
      ctx.setState(
          produce(ctx.getState(), (draft: SearchPageStateModel) => {
              draft.error = error;
          })
      );
  }

  async search(ctx: StateContext<SearchPageStateModel>, { searchTerm }: SearchPageStateModel) {
      try {
          const searchResults = await this.searchResultsApi.search(searchTerm);
          ctx.dispatch(new SetSearchResults(searchResults));
      } catch (error) {
          ctx.dispatch(new SetError(error.message));
      }
  }

  
}