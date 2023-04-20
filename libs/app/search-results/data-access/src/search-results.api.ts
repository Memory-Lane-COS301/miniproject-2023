// import { Injectable } from "@angular/core";
// import { Firestore } from "@angular/fire/firestore";
// import { Functions, httpsCallable } from "@angular/fire/functions";
// import { ISearchRequest, ISearchResponse } from "@mp/api/search/util";

// @Injectable()
// export class SearchResultsApi {
//   constructor(
//     private readonly firestore: Firestore,
//     private readonly functions: Functions
//   ) {}

//   async search(request: ISearchRequest) {
//     return await httpsCallable<ISearchRequest, ISearchResponse>(
//       this.functions,
//       "search"
//     )(request);
//   }

//   getMemoryById(id: string) {
//     return this.firestore.collection("memories").doc(id).get();
//   }
// }
