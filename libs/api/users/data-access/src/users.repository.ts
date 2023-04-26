import { IUser } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersRepository {
  async createUser(user: IUser) {
    return await admin.firestore().collection('users').doc().create(user);
  }

  async findUser(userId: string) {
    return await admin
      .firestore()
      .collection('users')
      .withConverter<IUser>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IUser;
        },
        toFirestore: (it: IUser) => it,
      })
      .doc(userId)
      .get();
  }

  async updateFriendCount(userId1: string, newTime: number) {
    return await admin.firestore().collection('users').doc(userId1).update({
      friendCount: newTime,
    });
  }

  async findUserWithUsername(username: string) {
    return await admin
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .withConverter<IUser>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IUser;
        },
        toFirestore: (it: IUser) => it,
      })
      .limit(1)
      .get();
  }
}
