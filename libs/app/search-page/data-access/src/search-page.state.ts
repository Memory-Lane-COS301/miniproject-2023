import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { GetFeedMemories, SetFeed } from "@mp/app/feed/util";
import { IGetUserRequest, IUser } from "@mp/api/users/util";
import { IGetFeedMemoriesRequest, IMemory } from "@mp/api/memories/util";
import { SearchPageApi } from "./search-page.api";
import { tap } from "rxjs";
import { GetSearchPageMemories, SearchMemories, SetSearchPage } from "@mp/app/search-page/util";
import { state } from "@angular/animations";
import { FeedApi, FeedStateModel } from "@mp/app/feed/data-access";
import { AuthState } from "@mp/app/auth/data-access";


export interface SearchPageStateModel {
  // users: IUser[];
  memories: IMemory[];
  recentSearches: string[];
}

@State<SearchPageStateModel>({
  name: 'searchPage',
  defaults: {
    memories: [],
    recentSearches: [],
  },
})
@Injectable()
export class SearchPageState {
    constructor(
        private readonly searchPageApi: SearchPageApi,
        private readonly store: Store,

        //temporary until search has its own endpoint
        private readonly feedApi: FeedApi
    ){}

  @Selector()
  static memories(state: SearchPageStateModel) {
    return state.memories;
  }
  @Selector()
  static recentSearches(state: SearchPageStateModel) {
    return state.recentSearches;
  }

  // @Action(GetFeedMemories)
  // async getSearchMemories(ctx: StateContext<SearchPageStateModel>) {
  //     try {
  //         const state = ctx.getState();
  //         const _memory = state.memories[0];

    //Temporary actions until search page has endpoint
    @Action(SetFeed)
    setFeed(ctx: StateContext<FeedStateModel>, { memories }: SetFeed) {
        return ctx.setState(
            produce((draft) => {
                draft.memories = memories;
            })
        );
    }

    @Action(GetFeedMemories)
    async getFeedMemories(ctx: StateContext<FeedStateModel>) {
        try {
            const authState = this.store.selectSnapshot(AuthState);

            if (!authState.user.uid)
                return ctx.dispatch(new SetError('User not set'));

            const request: IGetFeedMemoriesRequest = {
                user: {
                    userId: authState.user.uid
                }
            };

            const responseRef = await this.feedApi.getFeedMemories(request);
            const response = responseRef.data;
            return ctx.dispatch(new SetFeed(response.memories));
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

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
