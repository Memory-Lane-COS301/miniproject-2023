import { IMemory } from '@mp/api/memories/util';
import { IFriend } from '@mp/api/friend/util';
import { IComment } from '@mp/api/memories/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class MemoriesRepository {
  //TODO implement
  async createMemory(memory: IMemory): Promise<null> {
    return null;
  }
  async findOne(memory: IMemory) {
    return await admin
      .firestore()
      .collection('memories')
      .withConverter<IMemory>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IMemory;
        },
        toFirestore: (it: IMemory) => it,
      })
      .doc()
      .get();
  }

  async getComments(memoryId: string): Promise<IComment[]> {
    const querySnapshot = await admin.firestore().collection(`memories/${memoryId}/comments`).get();

    const comments: IComment[] = [];

    querySnapshot.forEach((doc) => {
      const comment = doc.data() as IComment;
      delete comment.userId;
      comments.push(comment);
    });

    return comments;
  }

  async getFeedMemories(userId: string) {
    const db = admin.firestore();

    const friendsRef = db.collection('friends');
    const [querySnapshot1, querySnapshot2] = await Promise.all([
      friendsRef.where('userId1', '==', userId).get(),
      friendsRef.where('userId2', '==', userId).get(),
    ]);

    const friendDocs = [...querySnapshot1.docs, ...querySnapshot2.docs];

    const friendIds = friendDocs.map(doc => {
      const friendData = doc.data() as IFriend;
      return friendData.userId1 === userId ? friendData.userId2 : friendData.userId1;
    });

    if (!friendIds)
      throw new Error('Empty friends');
    
    const memoriesRef = db.collection('memories');
    return memoriesRef.where('userId', 'in', friendIds)
      .where('alive', '==', true)
      .orderBy('created', 'desc')
      .withConverter<IMemory>({
        fromFirestore: (snapshot) => {
          const data = snapshot.data() as IMemory;
          delete data.userId;
          return data;
        },
        toFirestore: (it: IMemory) => it,
      })
      .get();
  }

  async createComment(comment: IComment) {
    return null;
  }

  async editComment(comment: IComment) {
    return null;
  }
}
