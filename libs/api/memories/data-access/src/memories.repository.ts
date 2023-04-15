import { IMemory } from '@mp/api/memories/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class MemoryRepository {
  async createMemory(memory: IMemory): Promise<admin.firestore.WriteResult> {
    return await admin.firestore().collection('memories').doc().create(memory);
  }
}
