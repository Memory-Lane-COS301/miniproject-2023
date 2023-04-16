import { IMemory } from '@mp/api/memories/util';
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

  async createComment(comment: IComment) {
    return null;
  }

  async editComment(comment: IComment) {
    return null;
  }
}
