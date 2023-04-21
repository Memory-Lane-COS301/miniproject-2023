import { FriendsService } from '@mp/api/friend/feature';
import { ICreateFriendRequest, ICreateFriendResponse } from '@mp/api/friend/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const createFriendRequest = functions.https.onCall(
  async (request: ICreateFriendRequest): Promise<ICreateFriendResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(FriendsService);
    try {
      return await service.createFriendRequest(request);
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
