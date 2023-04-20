import { MemoriesService } from '@mp/api/memories/feature';
import {
  ICreateMemoryRequest,
  ICreateMemoryResponse,
  IGetCommentsRequest,
  IGetCommentsResponse,
  IGetFeedMemoriesRequest,
  IGetFeedMemoriesResponse,
} from '@mp/api/memories/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const createMemory = functions.https.onCall(
  async (request: ICreateMemoryRequest): Promise<ICreateMemoryResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    return service.createMemory(request);
  },
);

export const getComments = functions.https.onCall(
  async (request: IGetCommentsRequest): Promise<IGetCommentsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    return service.getComments(request);
  },
);

export const getFeedMemories = functions.https.onCall(
  async (request: IGetFeedMemoriesRequest): Promise<IGetFeedMemoriesRequest> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.getFeedMemories(request);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Missing required'))
          throw new functions.https.HttpsError('invalid-argument', error.message);
        if (error.message === 'User not found')
          throw new functions.https.HttpsError('not-found', error.message);
      }

      throw new functions.https.HttpsError('unknown', 'An unknown error occurred');
    }
  },
);