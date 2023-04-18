import { Injectable } from "@angular/core";
import { Functions, httpsCallable } from '@angular/fire/functions';
import { doc, docData, Firestore } from "@angular/fire/firestore";
import { 
    ICreateCommentRequest,
    IUpdateCommentRequest,
    IGetCommentsRequest,
    IMemory,
    IGetCommentsResponse,
    IUpdateCommentResponse,
    ICreateCommentResponse
} from "@mp/api/memories/util";

@Injectable()
export class MemoryCardApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  memoryCard$(id: string) {
    const docRef = doc(
      this.firestore,
      `memories/${id}`
    ).withConverter<IMemory>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IMemory;
      },
      toFirestore: (it: IMemory) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async getComments(request: IGetCommentsRequest) {
    return await httpsCallable<
      IGetCommentsRequest,
      IGetCommentsResponse
    >(
      this.functions,
      'getComments'
    )(request);
  }

  async createComment(request: ICreateCommentRequest) {
    return await httpsCallable<
      ICreateCommentRequest,
      ICreateCommentResponse
    >(
      this.functions,
      'createComment'
    )(request);
  }

  async updateComment(request: IUpdateCommentRequest) {
    return await httpsCallable<
      IUpdateCommentRequest,
      IUpdateCommentResponse
    >(
      this.functions,
      'updateComment'
    )(request);
  }
}