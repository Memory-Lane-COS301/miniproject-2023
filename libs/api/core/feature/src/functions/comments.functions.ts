import { CommentsService } from '@mp/api/comments/feature';
import {
  ICreateCommentRequest,
  ICreateCommentResponse,
  IUpdateCommentRequest,
  IUpdateCommentResponse,
} from '@mp/api/comments/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const createComment = functions.https.onCall(
  async (request: ICreateCommentRequest): Promise<ICreateCommentResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(CommentsService);
    return service.createComment(request);
  },
);

export const updateComment = functions.https.onCall(
  async (request: IUpdateCommentRequest): Promise<IUpdateCommentResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(CommentsService);
    return service.updateComment(request);
  },
);
