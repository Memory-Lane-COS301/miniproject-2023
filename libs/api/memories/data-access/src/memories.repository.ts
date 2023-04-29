import { IUser } from '@mp/api/users/util';
import { IMemory } from '@mp/api/memories/util';
import { IFriend } from '@mp/api/friend/util';
import { IComment } from '@mp/api/memories/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class MemoriesRepository {
  async createMemory(memory: IMemory): Promise<admin.firestore.WriteResult> {
    console.debug(`${MemoriesRepository.name}`);
    const newMemoryRef = admin.firestore().collection('memories').doc();
    memory.memoryId = newMemoryRef.id;
    return await newMemoryRef.set(memory);
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

  async findMemory(memoryId: string) {
    return await admin
      .firestore()
      .collection('memories')
      .withConverter<IMemory>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IMemory;
        },
        toFirestore: (it: IMemory) => it,
      })
      .doc(memoryId)
      .get();
  }

  async getComments(memoryId: string) {
    return await admin
      .firestore()
      .collection(`memories/${memoryId}/comments`)
      .withConverter<IComment>({
        fromFirestore: (doc) => {
          const comment = doc.data() as IComment;
          delete comment.userId;
          return comment;
        },
        toFirestore: (it: IMemory) => it,
      })
      .get();
  }

  async getFeedMemories(userId: string) {
    const db = admin.firestore();

    const friendsRef = db.collection('friends');
    const [querySnapshot1, querySnapshot2] = await Promise.all([
      friendsRef.where('userId1', '==', userId).get(),
      friendsRef.where('userId2', '==', userId).get(),
    ]);

    const friendDocs = [...querySnapshot1.docs, ...querySnapshot2.docs];

    const friendIds = friendDocs.map((doc) => {
      const friendData = doc.data() as IFriend;
      return friendData.userId1 === userId ? friendData.userId2 : friendData.userId1;
    });

    if (!friendIds) throw new Error('Empty friends');

    const memoriesRef = db.collection('memories');
    return memoriesRef
      .where('userId', 'in', friendIds)
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

  async getFeedMemoriesWithComments(userId: string): Promise<IMemory[]> {
    const db = admin.firestore();

    const friendsRef = db.collection('friends');
    const [querySnapshot1, querySnapshot2] = await Promise.all([
      friendsRef.where('userId1', '==', userId).get(),
      friendsRef.where('userId2', '==', userId).get(),
    ]);

    const friendDocs = [...querySnapshot1.docs, ...querySnapshot2.docs];

    const friendIds = friendDocs.map((doc) => {
      const friendData = doc.data() as IFriend;
      return friendData.userId1 === userId ? friendData.userId2 : friendData.userId1;
    });

    if (!friendIds) throw new Error('Empty friends');

    const memoriesSnapshot = await db
      .collection('memories')
      .where('userId', 'in', friendIds)
      .where('alive', '==', true)
      .orderBy('created', 'desc')
      .get();

    const memories: IMemory[] = [];

    for (const memoryDoc of memoriesSnapshot.docs) {
      const memory = memoryDoc.data() as IMemory;
      delete memory.userId;

      const commentsSnapshot = await memoryDoc.ref.collection('comments').orderBy('created', 'desc').get();
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

  async createComment(comment: IComment) {
    if (!comment.commentId) throw Error('Missing commentId');

    return await admin
      .firestore()
      .collection(`memories/${comment.memoryId}/comments`)
      .doc(comment.commentId)
      .set(comment);
  }

  async editComment(comment: IComment) {
    return null;
  }

  async reviveDeadMemory(memoryId: string, newTime: number) {
    const dateString = new Date(newTime * 1000).toISOString();
    const deathDate = new Date();
    const h = Number(deathDate.getHours()) + Number(dateString.slice(11, 13));
    const m = Number(deathDate.getMinutes()) + Number(dateString.slice(14, 16));
    const s = Number(deathDate.getSeconds()) + Number(dateString.slice(17, 19));
    deathDate.setDate(deathDate.getDate() - 1);
    deathDate.setHours(h);
    deathDate.setMinutes(m);
    deathDate.setSeconds(s);

    return await admin
      .firestore()
      .collection('memories')
      .doc(memoryId)
      .update({
        alive: true,
        remainingTime: newTime,
        deathTime: Timestamp.fromDate(deathDate),
      });
  }

  async IncreseMemoryTime(memoryId: string, newTime: number, secondToAdd: number, currentDeathTime: Timestamp) {
    const dateCurrentDeathTime = currentDeathTime.toDate();
    const dateString = new Date(secondToAdd * 1000).toISOString();
    const h = Number(dateCurrentDeathTime.getHours()) + Number(dateString.slice(11, 13));
    const m = Number(dateCurrentDeathTime.getMinutes()) + Number(dateString.slice(14, 16));
    const s = Number(dateCurrentDeathTime.getSeconds()) + Number(dateString.slice(17, 19));
    dateCurrentDeathTime.setHours(h);
    dateCurrentDeathTime.setMinutes(m);
    dateCurrentDeathTime.setSeconds(s);

    if (dateCurrentDeathTime.getHours() + Number(dateString.slice(11, 13)) > 24) {
      dateCurrentDeathTime.setDate(dateCurrentDeathTime.getDate() + 1);
    }

    return await admin
      .firestore()
      .collection('memories')
      .doc(memoryId)
      .update({
        remainingTime: newTime,
        deathTime: Timestamp.fromDate(dateCurrentDeathTime),
      });
  }

  async updateMemories(user: IUser) {
    const updateInfo = {
      username: user.username,
      profileImgUrl: user.profileImgUrl,
    };

    admin
      .firestore()
      .collection('memories')
      .where('userId', '==', user.userId)
      .get()
      .then((response) => {
        const batch = admin.firestore().batch();
        response.docs.forEach((doc) => {
          const docRef = admin.firestore().collection('memories').doc(doc.id);
          batch.update(docRef, updateInfo);
        });
        batch.commit();
      });
    this.updateComment(user);
  }

  async updateComment(user: IUser) {
    const updateInfo = {
      username: user.username,
      profileImgUrl: user.profileImgUrl,
    };

    admin
      .firestore()
      .collectionGroup('comments')
      .where('userId', '==', user.userId)
      .get()
      .then((response) => {
        const batch = admin.firestore().batch();
        response.docs.forEach((doc) => {
          const comment: IComment = doc.data as IComment;
          const docref = admin.firestore().collection(`memories/${comment.memoryId}/comments`).doc(doc.id);
          batch.update(docref, updateInfo);
        });
        batch.commit();
      });
  }
}
