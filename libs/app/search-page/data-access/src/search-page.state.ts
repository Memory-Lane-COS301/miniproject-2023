import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { IGetUserRequest, IUser } from "@mp/api/users/util";
import { IGetFeedMemoriesRequest, IMemory } from "@mp/api/memories/util";
import { SearchPageApi } from "./search-page.api";
import { tap } from "rxjs";
import { GetSearchPageMemories, SearchMemories, SetSearchPage, GetSearchResults, GetFeedMemories, GetSearchMemories } from "@mp/app/search-page/util";
import { state } from "@angular/animations";
import { FeedApi, FeedStateModel } from "@mp/app/feed/data-access";
import { AuthState } from "@mp/app/auth/data-access";
import { serialize } from 'v8';
import { ProfileState } from '@mp/app/profile/data-access'


export interface SearchPageStateModel {
  // users: IUser[];
  memories: IMemory[];
  recentSearches: string[];
  searchResults: IMemory[]
}

@State<SearchPageStateModel>({
  name: 'searchPage',
  defaults: {
    memories: [],
    recentSearches: [],
    searchResults: []
  },
})
@Injectable()
export class SearchPageState {
    constructor(
        private readonly searchPageApi: SearchPageApi,
        private readonly store: Store,
    ){}

  @Selector()
  static memories(state: SearchPageStateModel) {
    return state.memories;
  }
  @Selector()
  static recentSearches(state: SearchPageStateModel) {
    return state.recentSearches;
  }

  @Selector()
  static searchResults(state: SearchPageStateModel) {
    return state.searchResults;
  }

  // @Action(GetFeedMemories)
  // async getSearchMemories(ctx: StateContext<SearchPageStateModel>) {
  //     try {
  //         const state = ctx.getState();
  //         const _memory = state.memories[0];

    //Temporary actions until search page has endpoint
    @Action(SetSearchPage)
    setSearchPage(ctx: StateContext<FeedStateModel>, { memories }: SetSearchPage) {
        return ctx.setState(
            produce((draft) => {
                draft.memories = memories;
            })
        );
    }

    @Action(GetFeedMemories)
    async getFeedMemories(ctx: StateContext<SearchPageStateModel>) {
        try {
            const authState = this.store.selectSnapshot(AuthState);

            if (!authState.user.uid)
                return ctx.dispatch(new SetError('User not set'));

            const request: IGetFeedMemoriesRequest = {
                user: {
                    userId: authState.user.uid
                }
            };

            const responseRef = await this.searchPageApi.getFeedMemories(request);
            const response = responseRef.data;
            return ctx.dispatch(new SetSearchPage(response.memories));
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(GetSearchMemories)
    async getSearchMemories(ctx: StateContext<SearchPageStateModel>, { searchValue }: GetSearchMemories) {
      try {
        const state = this.store.selectSnapshot(ProfileState)
        const response = await this.searchPageApi.getSearchResults(searchValue, state.user.username);
        
        return ctx.patchState({ searchResults: response });
    } 
    catch(error){
        return ctx.dispatch(new SetError((error as Error).message));
    }
    }

    @Action(GetSearchResults)
    async getSearchResults(ctx: StateContext<SearchPageStateModel>, { searchValue }: GetSearchResults) {
      try {
          if (!searchValue)
            return;

          const profileState = this.store.selectSnapshot(ProfileState);
          const response = await this.searchPageApi.getSearchResults(searchValue, profileState.user.username);
          return ctx.patchState({ searchResults: response });
      } 
      catch(error){
          return ctx.dispatch(new SetError((error as Error).message));
      }
    }

    // @Action(GetSearchPageMemories)
    // async getSearchMemories(ctx: StateContext<SearchPageStateModel>) {
    //   try {
    //       const response = await this.searchPageApi.getSearchMemories();
    //       console.log('Response')
    //       console.log(response)
    //       return ctx.patchState({ memories: response });
    //   } 
    //   catch(error){
    //       return ctx.dispatch(new SetError((error as Error).message));
    //   }
    // }


    // @Action(GetSearchPageMemories)
    // async getFeedMemories(ctx: StateContext<SearchPageStateModel>) {
    //     try {
    //         const authState = this.store.selectSnapshot(AuthState);

    //         if (!authState.user.uid)
    //             return ctx.dispatch(new SetError('User not set'));

    //         const request: IGetFeedMemoriesRequest = {
    //             user: {
    //                 userId: authState.user.uid
    //             }
    //         };

    //         const responseRef = await this.searchPageApi.getFeedMemories(request);
    //         const response = responseRef.data;
    //         return ctx.dispatch(new SetFeed(response.memories));
    //     }
    //     catch(error){
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    // @Action(SetSearchPage)
    // setFeed(ctx: StateContext<SearchPageStateModel>, { memories }: SetSearchPage) {
    //     return ctx.setState(
    //         produce((draft) => {
    //             draft.memories = memories;
    //         })
    //     );
    // }

    // @Action(SearchMemories)
    // async searchMemories(ctx: StateContext<SearchPageStateModel>, { searchQuery }: SearchMemories) {
    //     return ctx.dispatch(new SetSearchResultsPage(searchQuery));
    // }  
}
