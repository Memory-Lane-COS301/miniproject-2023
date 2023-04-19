import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SearchResultsApi } from './search-results.api';
import { SetSearchResults } from './search-results.actions';

export interface SearchResultsStateModel {
    results: any[];
}

@State<SearchResultsStateModel>({
    name: 'searchResults',
    defaults: {
        results: []
    },
})
@Injectable()
export class SearchResultsState {
    constructor(private searchResultsApi: SearchResultsApi) {}

    @Selector()
    static searchResults(state: SearchResultsStateModel) {
        return state.results;
    }

    @Action(SetSearchResults)
    setSearchResults(ctx: StateContext<SearchResultsStateModel>, action: SetSearchResults) {
        const state = ctx.getState();
        const results = action.results;
        ctx.setState({
            ...state,
            results
        });
    }

    search(query: string) {
        return this.searchResultsApi.search(query).pipe(
            tap(results => {
                this.setSearchResults(results);
            })
        );
    }
}
