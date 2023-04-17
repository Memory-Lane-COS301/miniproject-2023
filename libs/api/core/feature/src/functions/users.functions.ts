import { IGetUserRequest, IGetUserResponse } from '@mp/api/users/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { UsersService } from '@mp/api/users/feature';

export const getUser = functions.https.onCall(
    async (request: IGetUserRequest): Promise<IGetUserResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(UsersService);
      return service.getUser(request);
    },
  );