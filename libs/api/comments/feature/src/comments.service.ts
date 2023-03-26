import {
  ICreateCommentRequest,
  IUpdateCommentRequest,
  CommentCreatedEvent,
  CommentUpdatedEvent,
  CreateCommentCommand,
  UpdateCommentCommand,
  ICreateCommentResponse,
  IUpdateCommentResponse,
} from '@mp/api/comments/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class CommentsService {
  constructor(private readonly commandBus: CommandBus) {}

  async createComment(request: ICreateCommentRequest): Promise<ICreateCommentResponse> {
    return await this.commandBus.execute<CreateCommentCommand, ICreateCommentResponse>(
      new CommentCreatedEvent(request.comment),
    );
  }

  async updateComment(request: IUpdateCommentRequest): Promise<IUpdateCommentResponse> {
    return await this.commandBus.execute<UpdateCommentCommand, IUpdateCommentResponse>(
      new CommentUpdatedEvent(request.comment),
    );
  }
}
