import { CreateCommentCommand } from '@mp/api/comments/util';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class CommentsSagas {
  // TODO: Add sagas
}
