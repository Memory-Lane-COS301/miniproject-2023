import { Injectable } from '@angular/core';
import { collection, collectionChanges, collectionData, doc, docData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
  IComment,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IGetCommentsRequest,
  IMemory,
  IUpdateCommentRequest,
  IUpdateCommentResponse,
} from '@mp/api/memories/util';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class ViewedCommentsApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions,
    ) {}

  viewedComments$(id: string) {
    const docRef = doc(this.firestore, `memories/${id}`).withConverter<IMemory>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IMemory;
      },
      toFirestore: (it: IMemory) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  comments$(memoryId: string, userId: string): Observable<IComment[]> {
    const collectionRef = collection(this.firestore, `memories/${memoryId}/comments`)
    return collectionData(collectionRef)
      .pipe(
        map((data) => data as IComment[])
      )
  }

  async createComment(request: ICreateCommentRequest) {
    return await httpsCallable<ICreateCommentRequest, ICreateCommentResponse>(this.functions, 'createComment')(request);
  }

  async updateComment(request: IUpdateCommentRequest) {
    return await httpsCallable<IUpdateCommentRequest, IUpdateCommentResponse>(this.functions, 'updateComment')(request);
  }
}
