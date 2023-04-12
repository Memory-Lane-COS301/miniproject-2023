import {
  ICreateCommentRequest,
  IUpdateCommentRequest,
  CommentCreatedEvent,
  CommentUpdatedEvent,
  CreateCommentCommand,
  EditCommentCommand,
  ICreateCommentResponse,
  IUpdateCommentResponse,
} from '@mp/api/comments/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class CommentsService {
  constructor(private readonly commandBus: CommandBus) {}

  // async createComment(request: ICreateCommentRequest): Promise<ICreateCommentResponse> {
  //    return await this.commandBus.execute<CreateCommentCommand, ICreateCommentResponse>(
  //      new CommentCreatedEvent(request.comment),
  //    ); 
    
  // }

  // async editComment(request: IUpdateCommentRequest): Promise<IUpdateCommentResponse> {
  //   // return await this.commandBus.execute<EditCommentCommand, IUpdateCommentResponse>(
  //   //   new CommentUpdatedEvent(request.comment),
  //   // );
  // }
}
