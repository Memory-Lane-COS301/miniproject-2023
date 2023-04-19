import { IMemory } from "@mp/api/memories/util"

// export class GetUserRequest {
//     static readonly type = '[SearchPage] GetUserRequest';
// }

/*export class SetSearchPage {
    static readonly type = '[SearchPage] SetFeed';
    constructor(public readonly memories: IMemory) {}
}
*/
export class SearchMemories {
    static readonly type = '[SearchPage] SearchMemories';
    constructor(public readonly searchQuery: string) {}
  }
  
  export class SetSearchPage {
    static readonly type = '[SearchPage] SetSearchResults';
    constructor(public readonly results: any[]) {}
  }

  @Injectable()
export class SearchPageState {
  constructor(private readonly searchPageApi: SearchPageApi) {}

  @Action(SearchMemories)
  searchMemories(ctx: StateContext<any>, action: SearchMemories) {
    const state = ctx.getState();
    const { searchQuery } = action;

    return this.searchPageApi.searchMemories(searchQuery).pipe(
      tap((results) => {
        ctx.dispatch(new SetSearchResults(results));
      }),
      catchError((err) => {
        ctx.dispatch(new SetError('Search failed'));
        return [];
      })
    );
  }
}