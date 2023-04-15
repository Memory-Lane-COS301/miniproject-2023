import { IComment, CommentCreatedEvent, CreateCommentCommand } from '@mp/api/memories/util';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Comment } from '../models';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CommentCreatedEvent> {
  constructor(private publisher: EventPublisher) {}

  //TODO implement
  async execute(command: CommentCreatedEvent) {
    return null;
  }
}
