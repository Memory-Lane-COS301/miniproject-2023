import { describe, test, expect } from '@jest/globals';
import { IComment, IMemory } from '../../util/src/interfaces';
import * as firebase from 'firebase-admin';
import { IFriend } from '../../../friend/util/src';

let db: FirebaseFirestore.Firestore;

class MockMemoriesRepository {
    async createMemory(memory: IMemory): Promise<firebase.firestore.WriteResult> {
      console.debug(`${MockMemoriesRepository.name}`);
      const newMemoryRef = db.collection('memories').doc();
      memory.memoryId = newMemoryRef.id;
      return await newMemoryRef.set(memory);
    }
  
    async findOne(memory: IMemory) {
      return await db
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
      return await db
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
  
    async getComments(memoryId: string): Promise<IComment[]> {
      const querySnapshot = await db.collection(`memories/${memoryId}/comments`).get();
  
      const comments: IComment[] = [];
  
      querySnapshot.forEach((doc) => {
        const comment = doc.data() as IComment;
        delete comment.userId;
        comments.push(comment);
      });
  
      return comments;
    }
  
    async getFeedMemories(userId: string) {
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
  
    async createComment(comment: IComment) {
      if (!comment.commentId) throw Error('Missing commentId');
  
      return await db.collection(`memories/${comment.memoryId}/comments`).doc(comment.commentId).set(comment);
    }
  
    async editComment(comment: IComment) {
      return null;
    }
  }
  
  describe('Unit tests for memories.repository', () => {
    const firebaseApp = firebase.initializeApp({ projectId: 'demo-project' });
    beforeAll(() => jest.setTimeout(90 * 1000));
    db = firebaseApp.firestore();
    db.settings({
      host: 'localhost:5003',
      ssl: false,
    });
    //tests
  }