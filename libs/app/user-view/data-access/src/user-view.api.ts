import { Injectable } from "@angular/core";
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IUser } from "@mp/api/users/util";
import { doc, docData, Firestore, collection, query, where, getDocs } from "@angular/fire/firestore";
import { IGetProfileRequest, IGetProfileResponse } from "@mp/api/profiles/util";
import { ICreateFriendRequest, ICreateFriendResponse, IDeleteFriendRequest, IDeleteFriendResponse, IGetFriendsRequest, IGetFriendsResponse } from "@mp/api/friend/util";
import { user } from "@angular/fire/auth";

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

  async getUserId(username: string): Promise<string> {
    const usersRef = collection(this.firestore, 'users')
      .withConverter<IUser>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IUser;
        },
        toFirestore: (it: IUser) => it,
      });
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty)
      return '';

    const user = querySnapshot.docs[0].data();
    return user.userId;
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

  async createFriendRequest(request: ICreateFriendRequest) {
    return await httpsCallable<
        ICreateFriendRequest,
        ICreateFriendResponse
    >(
        this.functions,
        'createFriendRequest'
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

  async deleteFriend(request: IDeleteFriendRequest) {
    return await httpsCallable<
      IDeleteFriendRequest,
      IDeleteFriendResponse
    >(
      this.functions,
      'deleteFriend'
    )(request);
  }

//   async updateFriendRequest(request: IUpdateFriendRequest) {
//     return await httpsCallable<
//         IUpdateFriendRequest,
//         IUpdateFriendResponse,
//     >(
//         this.functions,
//         'updateFriendRequest'
//     )(request);
//   }

  async getFriends(request: IGetFriendsRequest) {
    return await httpsCallable<IGetFriendsRequest, IGetFriendsResponse>(this.functions, 'getFriends')(request);
  }

  async getAllPendingFriendRequests(request: IGetFriendsRequest) {
    return await httpsCallable<IGetFriendsRequest, IGetFriendsResponse>(this.functions, 'getAllPendingFriendRequests')(request);
  }
}