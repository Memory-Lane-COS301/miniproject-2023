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
      if (error instanceof Error){
      console.debug(error.message);
            if(error.message.includes('Invalid Query: Missing username'))
                throw new functions. https. HttpsError ("invalid-argument", error. message);
            else
            if(error.message.includes('User not found'))
                throw new functions. https. HttpsError ("not-found", error. message);
          }
        throw new functions. https. HttpsError ("unknown", "An unknown error occurred.");
    }
    },
  );