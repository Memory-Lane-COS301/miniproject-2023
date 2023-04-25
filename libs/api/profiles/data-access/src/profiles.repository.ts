import { IProfile } from '@mp/api/profiles/util';
import { IMemory, IComment } from '@mp/api/memories/util';
import { IUser } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfilesRepository {
  async findOne(profile: IProfile) {
    return await admin
      .firestore()
      .collection('profiles')
      .withConverter<IProfile>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IProfile;
        },
        toFirestore: (it: IProfile) => it,
      })
      .doc()
      .get();
  }

  async createProfile(profile: IProfile) {
    delete profile.accountDetails?.password;
    return await admin.firestore().collection('profiles').doc().create(profile);
  }

  async updateProfile(profile: IProfile) {
    delete profile.accountDetails?.password;
    return await admin.firestore().collection('profiles').doc().set(profile, { merge: true });
  }

  async getProfileDetails(profile: IUser) {
    return await admin
      .firestore()
      .collection('users')
      .doc(profile.userId)
      .withConverter<IUser>({
        fromFirestore: (snapshot) => {
          const userDetails = snapshot.data() as IUser;
          userDetails.userId = ''; //for security reasons
          return userDetails;
        },
        toFirestore: (it: IUser) => it,
      })
      .get();
  }

  async getProfileMemories(profile: IProfile): Promise<IMemory[]> {
    const memoriesSnapshot = await admin
      .firestore()
      .collection('memories')
      .where('userId', '==', profile.userId)
      .where('alive', '==', true)
      .orderBy('created')
      .get();

    const memories: IMemory[] = [];

    for (const memoryDoc of memoriesSnapshot.docs) {
      const memory = memoryDoc.data() as IMemory;
      delete memory.userId;

      const commentsSnapshot = await memoryDoc.ref.collection('comments').get();
      memory.comments = [];

      for (const commentDoc of commentsSnapshot.docs) {
        const comment = commentDoc.data() as IComment;
        delete comment.userId;
        memory.comments?.push(comment);
      }

      memories.push(memory);
    }

    return memories;
  }

  async getDeadMemories(profile: IProfile): Promise<IMemory[]> {
    const memoriesSnapshot = await admin
      .firestore()
      .collection('memories')
      .where('userId', '==', profile.userId)
      .where('alive', '==', false)
      .orderBy('created')
      .get();

    const memories: IMemory[] = [];

    for (const memoryDoc of memoriesSnapshot.docs) {
      const memory = memoryDoc.data() as IMemory;
      delete memory.userId;

      const commentsSnapshot = await memoryDoc.ref.collection('comments').get();
      memory.comments = [];

      for (const commentDoc of commentsSnapshot.docs) {
        const comment = commentDoc.data() as IComment;
        delete comment.userId;
        memory.comments?.push(comment);
      }

      memories.push(memory);
    }

    return memories;
  }
}
