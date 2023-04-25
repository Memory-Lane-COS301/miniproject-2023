import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
  IUser,
  IUpdateUserRequest,
  IUpdateUserResponse,
} from '@mp/api/users/util'

@Injectable()
export class ProfilesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  user$(id: string) {
    const docRef = doc(
      this.firestore,
      `users/${id}`
    ).withConverter<IUser>({
      fromFirestore: snapshot => snapshot.data() as IUser,
      toFirestore: it => it,
    });
    return docData(docRef);
  }

  async updateUserDetails(request: IUpdateUserRequest) {
    return await httpsCallable<
      IUpdateUserRequest,
      IUpdateUserResponse
    >(
      this.functions,
      'updateUser'
    )(request);
  }

}
