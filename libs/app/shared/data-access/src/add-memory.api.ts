import { Injectable } from "@angular/core";
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IMemory } from "@mp/api/memories/util";
import { doc, docData, Firestore } from "@angular/fire/firestore";
import { ICreateMemoryRequest, ICreateMemoryResponse } from "@mp/api/memories/util";
import { IProfile } from "@mp/api/profiles/util";

@Injectable()
export class AddMemoryApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  // AddMemory$(id: string) {
  //   const docRef = doc(
  //     this.firestore,
  //     `profile/${id}`
  //   ).withConverter<IProfile>({
  //     fromFirestore: (snapshot) => {
  //       return snapshot.data() as IProfile;
  //     },
  //     toFirestore: (it: IProfile) => it,
  //   });
  //   return docData(docRef, { idField: 'id' });
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
}
