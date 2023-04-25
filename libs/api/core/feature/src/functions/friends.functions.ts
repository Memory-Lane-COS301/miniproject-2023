import { FriendsService } from '@mp/api/friend/feature';
import {
  ICreateFriendRequest,
  ICreateFriendResponse,
  IUpdateFriendRequest,
  IUpdateFriendResponse,
  IDeleteFriendRequest,
  IDeleteFriendResponse,
  IGetFriendsRequest,
  IGetFriendsResponse,
  IGetPendingFriendRequest,
  IGetPendingFriendResponse,
} from '@mp/api/friend/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const createFriendRequest = functions.https.onCall(
  async (request: ICreateFriendRequest): Promise<ICreateFriendResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(FriendsService);
    try {
      return await service.createFriendRequest(request);
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

export const updateFriendRequest = functions.https.onCall(
  async (request: IUpdateFriendRequest): Promise<IUpdateFriendResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(FriendsService);
    try {
      return await service.updateFriendRequest(request);
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

export const deleteFriendRequest = functions.https.onCall(
  async (request: IDeleteFriendRequest): Promise<IDeleteFriendResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(FriendsService);
    try {
      return await service.deleteFriendRequest(request);
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

export const getFriends = functions.https.onCall(async (request: IGetFriendsRequest): Promise<IGetFriendsResponse> => {
  const app = await NestFactory.createApplicationContext(CoreModule);
  const service = app.get(FriendsService);
  try {
    return await service.getFriends(request);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('not found')) throw new functions.https.HttpsError('not-found', error.message);

      if (error.message.includes('Missing required fields'))
        throw new functions.https.HttpsError('invalid-argument', error.message);

      throw new functions.https.HttpsError('internal', error.message);
    }

    throw new functions.https.HttpsError('unknown', 'An unknown error occurred.');
  }
});

export const getAllPendingFriendRequests = functions.https.onCall(
  async (request: IGetPendingFriendRequest): Promise<IGetPendingFriendResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(FriendsService);
    try {
      return await service.getPendingFriends(request);
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
