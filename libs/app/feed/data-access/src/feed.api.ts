import { Injectable } from "@angular/core";
import { doc, docData, Firestore } from "@angular/fire/firestore";
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable()
export class FeedApi {
  constructor(
    private readonly firestore: Firestore,
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