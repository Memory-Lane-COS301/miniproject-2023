import { IComment, CommentUpdatedEvent, CreateCommentCommand } from '@mp/api/memories/util';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Comment } from '../models';

@CommandHandler(CreateCommentCommand)
export class UpdatedCommentHandler implements ICommandHandler<CommentUpdatedEvent> {
  constructor(private publisher: EventPublisher) {}

  //TODO implement
  async execute(command: CommentUpdatedEvent) {
    return null;
  }
}
