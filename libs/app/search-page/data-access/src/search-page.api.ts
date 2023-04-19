import { Injectable } from "@angular/core";
import { Firestore, doc, query, where, getDocs } from "@angular/fire/firestore";
import { Store } from "@ngxs/store";
import { SetSearchResults } from "./search-results.actions";

@Injectable()
export class SearchPageApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly store: Store
  ) {}

  async search(query: string): Promise<void> {
    const memories: any[] = [];
    const q = query.toLowerCase().trim();
    const memoryRef = query(
      this.firestore,
      "memories",
      where("titleSearch", "array-contains", q)
    );
    const snapshot = await getDocs(memoryRef);

    snapshot.forEach((doc) => {
      memories.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    this.store.dispatch(new SetSearchResults(memories));
  }
}
