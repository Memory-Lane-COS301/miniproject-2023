import { CommentUpdatedEvent } from '@mp/api/comments/util';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { CommentRepository } from '@mp/api/comments/data-access';

@EventsHandler(CommentUpdatedEvent)
export class CommentEditedHandler implements IEventHandler<CommentUpdatedEvent> {
  constructor(private readonly repository: CommentRepository) {}

  //TODO implement
  async handle(event: CommentUpdatedEvent) {
    return null;
  }
}
