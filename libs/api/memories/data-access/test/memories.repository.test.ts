/* eslint-disable @nrwl/nx/enforce-module-boundaries */
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
  const memoriesRepository = new MockMemoriesRepository();
  const memory = {
    userId: 'testUserID',
    username: 'testUsername',
    imgUrl: 'testImgUrl',
    profileImgUrl: 'testProfileImgUrl',
    title: 'testTitle',
    description: 'test Description',
    commentsCount: 0,
    remainingTime: 24 * 60 * 60,
    alive: true,
    comments: [],
  };
  const memoryId = '00085b00-a9ab-410c-98bb-237a74afa05c'; // seeded memory
  const comment = {
    userId: 'testUserID',
    memoryId: 'testMemoryID',
    commentId: 'testCommentId',
    username: 'testCommentUsername',
    profileImgUrl: 'test comment profileImgUrl',
    text: 'test comment text',
  };
  test(
    'Testing createMemory',
    async () => {
      const writeReponse = await memoriesRepository.createMemory(memory);
      console.debug('writeReponse. ', writeReponse);
      expect(writeReponse.writeTime).toBeTruthy;
    },
    10 * 1000,
  );
  // test('Testing findOne',async () => {
  //     const findOneDocumentSnapshot = await memoriesRepository.findOne(memory);
  //     console.debug('findOneDocumentSnapshot ', findOneDocumentSnapshot);
  //     expect(findOneDocumentSnapshot.exists).toBe(true);
  // });

  test('Testing findMemory', async () => {
    const findMemoryDocumentSnapshot = (await memoriesRepository.findMemory(memoryId)).data();
    console.debug('findMemoryDocumentSnapshot ', findMemoryDocumentSnapshot);
    expect(findMemoryDocumentSnapshot).toBeTruthy;
  });

  test('Testing getComments', async () => {
    const fetchedComments = await memoriesRepository.getComments(memoryId);
    const fetechedCommentIds = [
      //comments for seeded memory with memoryId^
      '1e2bc945-3d00-4fd3-8285-a1f20270801d',
      '1e40c657-d256-4f84-9611-1651f8b32caa',
      '4bab9804-bc62-40cf-8da6-559bab1206b7',
      '91e83740-be38-4fd7-ab26-f2631d9f6a15',
      'a4cfa5f5-c8d1-4868-8363-1cb368952e61',
    ];
    console.debug('fetchedComments: ', fetchedComments);
    const hasAllIds = (comment: IComment) => fetechedCommentIds.includes(comment.commentId!);
    expect(fetchedComments.every(hasAllIds)).toBe(true);
  });

  // test('Testing getFeedMemories',async () => {
  //     const userId = '0104fa66-5a7b-429c-aedd-acab833be72e';
  //     const feedMemories = (await memoriesRepository.getFeedMemories(userId)).docs;
  //     console.debug('feedMemories ',feedMemories);
  //     expect(feedMemories).toBeTruthy;
  // },10*1000);

  test('Testing createComment', async () => {
    comment.memoryId = '0023f730-0bbf-4059-b84a-7cd3c608f641'; // seeded memory
    const createCommentWriteResults = await memoriesRepository.createComment(comment);
    console.debug('createCommentWriteResults ', createCommentWriteResults);
    expect(createCommentWriteResults.writeTime).toBeTruthy;
  });

  test('Testing editComment', async () => {
    const editCommentResults = await memoriesRepository.editComment(comment);
    console.debug('editCommentResults ', editCommentResults);
    expect(editCommentResults).toBe(null);
  });
});
