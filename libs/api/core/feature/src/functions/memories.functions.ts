import { MemoriesService } from '@mp/api/memories/feature';
import {
  ICreateMemoryRequest,
  ICreateMemoryResponse,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IGetCommentsRequest,
  IGetCommentsResponse,
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

export const createComment = functions.https.onCall(
  async (request: ICreateCommentRequest): Promise<ICreateCommentResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.createComment(request);
    }
    catch (error) {
      if (error instanceof Error) {
        if(error.message.includes('not found'))
          throw new functions.https.HttpsError('not-found', error.message);

        if(error.message.includes('Missing required fields'))
          throw new functions.https.HttpsError('invalid-argument', error.message);

        throw new functions.https.HttpsError("internal", error.message)
      }

      throw new functions.https.HttpsError("unknown", "An unknown error occurred.");
    }
  },
);
