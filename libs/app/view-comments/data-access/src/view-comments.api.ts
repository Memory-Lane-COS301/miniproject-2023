import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
  ICreateCommentRequest,
  ICreateCommentResponse,
  IMemory,
  IUpdateCommentRequest,
  IUpdateCommentResponse,
} from '@mp/api/memories/util';

@Injectable()
export class ViewedCommentsApi {
  constructor(private readonly firestore: Firestore, private readonly functions: Functions) {}

  viewedComments$(id: string) {
    const docRef = doc(this.firestore, `memories/${id}`).withConverter<IMemory>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IMemory;
      },
      toFirestore: (it: IMemory) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async createComment(request: ICreateCommentRequest) {
    return await httpsCallable<ICreateCommentRequest, ICreateCommentResponse>(this.functions, 'createComment')(request);
  }

  async updateComment(request: IUpdateCommentRequest) {
    return await httpsCallable<IUpdateCommentRequest, IUpdateCommentResponse>(this.functions, 'updateComment')(request);
  }
}
