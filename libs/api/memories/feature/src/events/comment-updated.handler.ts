import { CommentUpdatedEvent } from '@mp/api/memories/util';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { MemoriesRepository } from '@mp/api/memories/data-access';

@EventsHandler(CommentUpdatedEvent)
export class CommentUpdatedHandler implements IEventHandler<CommentUpdatedEvent> {
  constructor(private readonly repository: MemoriesRepository) {}

  //TODO implement
  async handle(event: CommentUpdatedEvent) {
    return null;
  }
}
