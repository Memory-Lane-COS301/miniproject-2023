import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
// import { SearchResultsApi } from './search-results.api';
import { SetSearchResults } from '@mp/app/search-results/util';
import { IMemory } from "@mp/api/memories/util";

export interface SearchResultsStateModel {
    results: IMemory[];
}

@State<SearchResultsStateModel>({
    name: 'searchResults',
    defaults: {
        results: []
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
    async setSearchResults(ctx: StateContext<SearchResultsStateModel>, { searchResults }: SetSearchResults) {
        const state = ctx.getState();
        const results = searchResults;
        ctx.setState({
            results
        });
    }
}
