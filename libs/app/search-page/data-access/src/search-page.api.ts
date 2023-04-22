import { Injectable } from "@angular/core";
import { Firestore, doc, query, where, getDocs } from "@angular/fire/firestore";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { Store } from "@ngxs/store";
// import { SetSearchResults } from "@mp/app/search-results/util";
// import { IGetFeedMemoriesRequest, IGetFeedMemoriesResponse } from '@mp/api/memories/util';

@Injectable()
export class SearchPageApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly store: Store,
    private readonly functions: Functions
  ) {}

  // async getFeedMemories(request: IGetFeedMemoriesRequest) {
  //   return await httpsCallable<
  //     IGetFeedMemoriesRequest,
  //     IGetFeedMemoriesResponse
  //   >(
  //     this.functions,
  //     'getFeedMemories'
  //   )(request);
  // }
}
