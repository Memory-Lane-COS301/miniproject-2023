import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IUser } from '@mp/api/users/util';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { IGetProfileRequest, IGetProfileResponse } from '@mp/api/profiles/util';
import {
  ICreateMemoryRequest,
  ICreateMemoryResponse,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IGetCommentsRequest,
  IGetCommentsResponse,
  IUpdateCommentRequest,
  IUpdateCommentResponse,
} from '@mp/api/memories/util';
import { IGetFriendsRequest, IGetFriendsResponse } from '@mp/api/friend/util';

@Injectable()
export class ProfileViewApi {
  constructor(private readonly firestore: Firestore, private readonly functions: Functions) {}

  async getUserProfile(request: IGetProfileRequest) {
    return await httpsCallable<IGetProfileRequest, IGetProfileResponse>(this.functions, 'getUserProfile')(request);
  }

  // async getDeadMemories(request: IGetDeadMemoriesRequest) {
  //   return await httpsCallable<
  //     IGetDeadMemoriesRequest,
  //     IGetDeadMemoriesResponse
  //   >(
  //     this.functions,
  //     'getDeadMemories'
  //   )(request);
  // }

  // async reviveMemory(request: IReviveMemoryRequest) {
  //   return await httpsCallable<
  //     IReviveMemoryRequest,
  //     IReviveMemoryResponse
  //   >(
  //     this.functions,
  //     'reviveMemory'
  //   )(request);
  // }

  async createMemory(request: ICreateMemoryRequest) {
    return await httpsCallable<
      ICreateMemoryRequest,
      ICreateMemoryResponse
    >(
      this.functions,
      'createMemory'
    )(request);
  }

  async getComments(request: IGetCommentsRequest) {
    return await httpsCallable<IGetCommentsRequest, IGetCommentsResponse>(this.functions, 'getComments')(request);
  }

  async createComment(request: ICreateCommentRequest) {
    return await httpsCallable<ICreateCommentRequest, ICreateCommentResponse>(this.functions, 'createComment')(request);
  }

  async updateComment(request: IUpdateCommentRequest) {
    return await httpsCallable<IUpdateCommentRequest, IUpdateCommentResponse>(this.functions, 'updateComment')(request);
  }

  async getFriends(request: IGetFriendsRequest) {
    return await httpsCallable<IGetFriendsRequest, IGetFriendsResponse>(this.functions, 'getFriends')(request);
  }
}
