import { IMemory } from '@mp/api/memories/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class MemoryRepository {
  //TODO implement
  async createMemory(memory: IMemory): Promise<null> {
    return null;
  }
}
