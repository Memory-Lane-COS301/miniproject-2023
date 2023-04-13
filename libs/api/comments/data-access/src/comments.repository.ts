import { IComment } from '@mp/api/comments/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class CommentsRepository {
  //TODO implement
  async createComment(comment: IComment) {
    return null;
  }

  async editComment(comment: IComment) {
    return null;
  }
}
