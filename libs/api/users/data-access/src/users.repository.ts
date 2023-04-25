import { IUser } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { AndroidApp } from 'firebase-admin/lib/project-management/android-app';

@Injectable()
export class UsersRepository {
  async createUser(user: IUser) {
    return await admin.firestore().collection('users').doc(user.userId).create(user);
  }

  async setUserTime(userId: string, newTime: number) {
    return await admin.firestore().collection('users').doc(userId).update({
      accountTime: newTime,
    });
  }

  async updateUser(user: IUser) {
    return await admin.firestore().collection('users').doc(user.userId).set(user, { merge: true });
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

  async findUserById(userId: string) {
    return await admin.firestore().collection('users').doc(userId).get();
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

  async incrementMemoryCount(userId: string) {
    await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .update({ 
        memoryCount: FieldValue.increment(1) 
      });
  }

  async decrementMemoryCount(userId: string) {
    await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .update({ 
        memoryCount: FieldValue.increment(-1) 
      });
  }
}
