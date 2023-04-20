import { IUser } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersRepository {
  async createUser(user: IUser) {
    console.log(user);
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
}
