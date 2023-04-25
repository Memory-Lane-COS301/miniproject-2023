import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IUser } from '@mp/api/users/util';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { IGetProfileRequest, IGetProfileResponse } from '@mp/api/profiles/util';

@Injectable()
export class ReviveMemoryApi {
  constructor(private readonly firestore: Firestore, private readonly functions: Functions) {}

  //   reviveMemory$(id: string) {
  //     const docRef = doc(
  //       this.firestore,
  //       `users/${id}`
  //     ).withConverter<IUser>({
  //       fromFirestore: (snapshot) => {
  //         return snapshot.data() as IUser;
  //       },
  //       toFirestore: (it: IUser) => it,
  //     });
  //     return docData(docRef, { idField: 'id' });
  //   }

  //   async getUserProfile(request: IGetProfileRequest) {
  //     return await httpsCallable<
  //       IGetProfileRequest,
  //       IGetProfileResponse
  //     >(
  //       this.functions,
  //       'getUserProfile'
  //     )(request);
  //   }

  async getDeadMemories(request: IGetProfileRequest) {
    return await httpsCallable<IGetProfileRequest, IGetProfileResponse>(this.functions, 'getDeadMemories')(request);
  }

  // async reviveMemory(request: IReviveMemoryRequest) {
  //   return await httpsCallable<
  //     IReviveMemoryRequest,
  //     IReviveMemoryResponse
  //   >(
  //     this.functions,
  //     'reviveMemory'
  //   )(request);
  // }
}
