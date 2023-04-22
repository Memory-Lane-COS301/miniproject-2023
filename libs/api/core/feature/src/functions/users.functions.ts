import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { 
    IGetUserRequest,
    IGetUserResponse,
    IUpdateUserRequest,
    IUpdateUserResponse,
} from '@mp/api/users/util';
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

export const updateUser = functions.https.onCall(
    async (request: IUpdateUserRequest): Promise<IUpdateUserResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(UsersService);
      try {
        return await service.updateUser(request);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('not found'))
            throw new functions.https.HttpsError('not-found', error.message);
  
          if (error.message.includes('Missing required'))
            throw new functions.https.HttpsError('invalid-argument', error.message);

          if (error.message.includes("Username"))
            throw new functions.https.HttpsError('already-exists', error.message);
  
          throw new functions.https.HttpsError("internal", error.message)
        }
  
        throw new functions.https.HttpsError("unknown", "An unknown error occurred.");
      }
    },
);
  