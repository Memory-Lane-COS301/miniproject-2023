import { MemoriesRepository } from '@mp/api/memories/data-access';
import { MemoryCreatedEvent } from '@mp/api/memories/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MemoryCreatedEvent)
export class MemoryCreatedHandler implements IEventHandler<MemoryCreatedEvent> {
  constructor(private readonly repository: MemoriesRepository) {}

  async handle(event: MemoryCreatedEvent) {
    console.log(`${MemoryCreatedHandler.name}`);
    await this.repository.createMemory(event.memory);
  }
}