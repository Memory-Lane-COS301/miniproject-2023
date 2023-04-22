import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { SetFeed } from "@mp/app/feed/util";
import { IGetUserRequest, IUser } from "@mp/api/users/util";
import { IMemory } from "@mp/api/memories/util";
import { SearchPageApi } from "./search-page.api";
import { tap } from "rxjs";
import { GetFeedMemories, SearchMemories, SetSearchPage } from "@mp/app/search-page/util";
import { state } from "@angular/animations";


export interface SearchPageStateModel {
    // users: IUser[];
    memories: IMemory[];
    recentSearches: string[];
}

@State<SearchPageStateModel>({
  name: 'searchPage',
  defaults: {
      memories: [],
      recentSearches: []
    },
  })


@Injectable()
export class SearchPageState {
    constructor(
        private readonly searchPageApi: SearchPageApi,
        private readonly store: Store
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

    //         const request: IGetFeedMemoriesRequest = {
    //             user: {
    //                 userId: ''
    //             }
    //         }
    //         const responseRef = await this.searchPageApi.getFeedMemories(request);
    //         const response = responseRef.data;
    //         return ctx.dispatch(new SetSearchPage(response.memories));
    //     }
    //     catch(error){
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    // @Action(SearchMemories)
    // async searchMemories(ctx: StateContext<SearchPageStateModel>, { searchQuery }: SearchMemories) {
    //     return ctx.dispatch(new SetSearchResultsPage(searchQuery));
    // }  
}