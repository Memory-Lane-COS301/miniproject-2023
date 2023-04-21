import { Injectable } from "@angular/core";
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IUser } from "@mp/api/users/util";
import { doc, docData, Firestore } from "@angular/fire/firestore";
import { IGetProfileRequest, IGetProfileResponse } from "@mp/api/profiles/util";

@Injectable()
export class UserViewApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  UserView$(id: string) {
    const docRef = doc(
      this.firestore,
      `users/${id}`
    ).withConverter<IUser>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IUser;
      },
      toFirestore: (it: IUser) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async getUserProfile(request: IGetProfileRequest) {
    return await httpsCallable<
      IGetProfileRequest,
      IGetProfileResponse
    >(
      this.functions,
      'getUserProfile'
    )(request);
  }

//   async createFriendRequest(request: ICreateFriendRequest) {
//     return await httpsCallable<
//         ICreateFriendRequest,
//         ICreateFriendResponse,
//     >(
//         this.functions,
//         'createFriendRequest'
//     )(request);
//   }

//   async updateFriendRequest(request: IUpdateFriendRequest) {
//     return await httpsCallable<
//         IUpdateFriendRequest,
//         IUpdateFriendResponse,
//     >(
//         this.functions,
//         'updateFriendRequest'
//     )(request);
//   }
}