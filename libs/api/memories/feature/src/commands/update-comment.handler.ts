import { IComment, CommentUpdatedEvent, UpdateCommentCommand, IUpdateCommentResponse } from '@mp/api/memories/util';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Comment } from '../models';

@CommandHandler(UpdateCommentHandler)
export class UpdateCommentHandler implements ICommandHandler<CommentUpdatedEvent, IUpdateCommentResponse> {
  constructor(private publisher: EventPublisher) {}

  //TODO implement
  async execute(command: CommentUpdatedEvent) {

    const comment: IUpdateCommentResponse = {
      comment: {

      }
    }

    return comment;
  }
}
