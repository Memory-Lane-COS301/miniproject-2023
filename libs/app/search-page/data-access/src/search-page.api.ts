import { Injectable } from "@angular/core";
import { Firestore, doc, query, where, getDocs, collection } from "@angular/fire/firestore";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { IGetFeedMemoriesRequest, IGetFeedMemoriesResponse, IMemory } from "@mp/api/memories/util";
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
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);

    const users: IUser[] = [];
    querySnapshot.docs.map(doc => {
      const data = doc.data() as IUser
      if (data.username?.toLowerCase().includes(searchValue.toLowerCase()))
        users.push(data);
    });
    return users;
  }

  async getSearchMemories() {
    const memoriesRef = collection(this.firestore, 'memories');
    const q = query(memoriesRef);
    const querySnapshot = await getDocs(q);

    const memories: IMemory[] = [];
    querySnapshot.docs.map(doc => {
        const data = doc.data() as IMemory
        memories.push(data);
    });
    return memories;
  }
}
