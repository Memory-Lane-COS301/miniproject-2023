import { CommentUpdatedEvent } from '@mp/api/comments/util';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { CommentsRepository } from '@mp/api/comments/data-access';

@EventsHandler(CommentUpdatedEvent)
export class CommentEditedHandler implements IEventHandler<CommentUpdatedEvent> {
  constructor(private readonly repository: CommentsRepository) {}

  //TODO implement
  async handle(event: CommentUpdatedEvent) {
    return null;
  }
}
