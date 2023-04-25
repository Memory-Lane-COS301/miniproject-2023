import { Injectable } from "@angular/core";
import { doc, docData, Firestore } from "@angular/fire/firestore";
import { Functions, httpsCallable } from "@angular/fire/functions";

@Injectable()
export class NotificationPageApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

//   async createFriendRequest(request: ICreateFriendRequestRequest) {
//     return await httpsCallable<
//       ICreateFriendRequestRequest,
//       ICreateFriendRequestResponse
//     >(
//       this.functions,
//       'createFriendRequest'
//     )(request);
//   }

//   async updateFriendRequest(request: IUpdateFriendRequestRequest) {
//     return await httpsCallable<
//       IUpdateFriendRequestRequest,
//       IUpdateFriendRequestResponse
//     >(
//       this.functions,
//       'updateFriendRequest'
//     )(request);
//   }
}