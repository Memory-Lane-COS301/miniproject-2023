import { MemoriesService } from '@mp/api/memories/feature';
import {
  ICreateMemoryRequest,
  ICreateMemoryResponse,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IGetCommentsRequest,
  IGetCommentsResponse,
  IGetFeedMemoriesRequest,
  IGetFeedMemoriesResponse,
  IReviveDeadMemoryRequest,
  IReviveDeadMemoryResponse,
  IComment,
} from '@mp/api/memories/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { ICommand } from '@nestjs/cqrs';

export const createMemory = functions.https.onCall(
  async (request: ICreateMemoryRequest): Promise<ICreateMemoryResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.createMemory(request);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) throw new functions.https.HttpsError('not-found', error.message);

        if (error.message.includes('Missing required'))
          throw new functions.https.HttpsError('invalid-argument', error.message);

        throw new functions.https.HttpsError('internal', error.message);
      }
      throw new functions.https.HttpsError('unknown', 'An unknown error occurred.');
    }
  },
);

export const getComments = functions.https.onCall(
  async (request: IGetCommentsRequest): Promise<IGetCommentsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.getComments(request);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) throw new functions.https.HttpsError('not-found', error.message);

        if (error.message.includes('Missing required fields'))
          throw new functions.https.HttpsError('invalid-argument', error.message);

        throw new functions.https.HttpsError('internal', error.message);
      }

      throw new functions.https.HttpsError('unknown', 'An unknown error occurred.');
    }
  },
);

export const getCommentsList = functions.https.onCall(
  async (request: IGetCommentsRequest) => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      const response = await service.getComments(request);
      const comments = response.comments;
      return { comments };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) throw new functions.https.HttpsError('not-found', error.message);

        if (error.message.includes('Missing required fields'))
          throw new functions.https.HttpsError('invalid-argument', error.message);

        throw new functions.https.HttpsError('internal', error.message);
      }

      throw new functions.https.HttpsError('unknown', 'An unknown error occurred.');
    }
  },
);

export const getFeedMemories = functions.https.onCall(
  async (request: IGetFeedMemoriesRequest): Promise<IGetFeedMemoriesResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.getFeedMemories(request);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) throw new functions.https.HttpsError('not-found', error.message);

        if (error.message.includes('Missing required'))
          throw new functions.https.HttpsError('invalid-argument', error.message);

        throw new functions.https.HttpsError('internal', error.message);
      }

      throw new functions.https.HttpsError('unknown', 'An unknown error occurred.');
    }
  },
);

export const createComment = functions.https.onCall(
  async (request: ICreateCommentRequest): Promise<ICreateCommentResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.createComment(request);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) throw new functions.https.HttpsError('not-found', error.message);
        if (error.message.includes('Missing required'))
          throw new functions.https.HttpsError('invalid-argument', error.message);

        throw new functions.https.HttpsError('internal', error.message);
      }

      throw new functions.https.HttpsError('unknown', 'An unknown error occurred.');
    }
  },
);

export const reviveDeadMemory = functions.https.onCall(
  async (request: IReviveDeadMemoryRequest): Promise<IReviveDeadMemoryResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.reviveDeadMemory(request);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) throw new functions.https.HttpsError('not-found', error.message);

        if (error.message.includes('Missing required'))
          throw new functions.https.HttpsError('invalid-argument', error.message);

        throw new functions.https.HttpsError('internal', error.message);
      }

      throw new functions.https.HttpsError('unknown', 'An unknown error occurred.');
    }
  },
);

export const updateMemoryTime = functions.https.onCall(
  async (request: IReviveDeadMemoryRequest): Promise<IReviveDeadMemoryResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.addMemoryTime(request);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) throw new functions.https.HttpsError('not-found', error.message);

        if (error.message.includes('Missing required'))

        if (error.message.includes('Missing required fields'))
          throw new functions.https.HttpsError('invalid-argument', error.message);

        throw new functions.https.HttpsError('internal', error.message);
      }

      throw new functions.https.HttpsError('unknown', 'An unknown error occurred.');
    }
  },
);
