import { Injectable } from "@angular/core";
import { doc, docData, Firestore, collection, collectionChanges } from "@angular/fire/firestore";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { 
  ICreateFriendRequest,
  ICreateFriendResponse,
  IDeleteFriendRequest,
  IDeleteFriendResponse,
  IGetFriendsRequest,
  IGetFriendsResponse,
  IUpdateFriendRequest,
  IUpdateFriendResponse 
} from "@mp/api/friend/util";
import { IFriendRequest } from "@mp/api/friend/util";
import { from, map, Observable } from 'rxjs';

@Injectable()
export class NotificationPageApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  async createFriendRequest(request: ICreateFriendRequest) {
    return await httpsCallable<
      ICreateFriendRequest,
      ICreateFriendResponse
    >(
      this.functions,
      'createFriendRequest'
    )(request);
  }

  async updateFriendRequest(request: IUpdateFriendRequest) {
    return await httpsCallable<
      IUpdateFriendRequest,
      IUpdateFriendResponse
    >(
      this.functions,
      'updateFriendRequest'
    )(request);
  }

  async deleteFriendRequest(request: IDeleteFriendRequest) {
    return await httpsCallable<
      IDeleteFriendRequest,
      IDeleteFriendResponse
    >(
      this.functions,
      'deleteFriendRequest'
    )(request);
  }

  async getAllPendingFriendRequests(request: IGetFriendsRequest) {
    return await httpsCallable<IGetFriendsRequest, IGetFriendsResponse>(this.functions, 'getAllPendingFriendRequests')(request);
  }

  async getAllPendingFriendRequestsFor(request: IGetFriendsRequest) {
    return await httpsCallable<IGetFriendsRequest, IGetFriendsResponse>(this.functions, 'getAllPendingFriendRequestsFor')(request);
  }

}