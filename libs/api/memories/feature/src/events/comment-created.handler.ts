import { CommentCreatedEvent } from '@mp/api/memories/util';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { MemoriesRepository } from '@mp/api/memories/data-access';

@EventsHandler(CommentCreatedEvent)
export class CommentCreatedHandler implements IEventHandler<CommentCreatedEvent> {
  constructor(private readonly repository: MemoriesRepository) {}

  async handle(event: CommentCreatedEvent) {
    console.log(`${CommentCreatedHandler.name}`);
    await this.repository.createComment(event.comment);
  }
}
