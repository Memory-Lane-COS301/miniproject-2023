import { Injectable } from "@angular/core";
import { Firestore, doc, query, where, getDocs, collection } from "@angular/fire/firestore";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { IGetFeedMemoriesRequest, IGetFeedMemoriesResponse } from "@mp/api/memories/util";
import { IUser } from "@mp/api/users/util";
import { Store } from "@ngxs/store";
// import { SetSearchResults } from "@mp/app/search-results/util";

@Injectable()
export class SearchPageApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly store: Store,
    private readonly functions: Functions,
  ) {}

  async getFeedMemories(request: IGetFeedMemoriesRequest) {
    return await httpsCallable<
      IGetFeedMemoriesRequest,
      IGetFeedMemoriesResponse
    >(
      this.functions,
      'getFeedMemories'
    )(request);
  }

  async getSearchResults(searchValue: string) {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('name', '>=', searchValue), where('name', '<=', searchValue+ '\uf8ff'));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map(doc => doc.data() as IUser);
    return users;
  }
}
