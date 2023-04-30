import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IUser } from '@mp/api/users/util';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { IGetProfileRequest, IGetProfileResponse } from '@mp/api/profiles/util';

@Injectable()
export class EditProfilePhotoApi {
  constructor(private readonly firestore: Firestore, private readonly functions: Functions) {}

  //   editProfilePhoto$(id: string) {
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

  async updateProfileImg(id: string, imgUrl: string) {
    const docRef = doc(this.firestore, `users/${id}${imgUrl}`).withConverter<IUser>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IUser;
      },
      toFirestore: (it: IUser) => it,
    });
    return docData(docRef, { idField: 'id' });
  }
}
