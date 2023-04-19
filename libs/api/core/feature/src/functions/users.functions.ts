import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { IGetUserRequest, IGetUserResponse } from '@mp/api/users/util';
import { UsersService } from '@mp/api/users/feature';

export const getUser = functions.https.onCall(
    async (request: IGetUserRequest): Promise<IGetUserResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      try{
          const service = app.get(UsersService);
          return await service.getUser(request);
      }
      catch (error) {
      if (error instanceof Error)
        throw new functions. https. HttpsError ("internal", error. message)
    throw new functions. https. HttpsError ("unknown", "An unknown error occurred.");
    }
    },
  );