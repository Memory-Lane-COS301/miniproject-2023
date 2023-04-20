import { MemoryCreatedEvent, IMemory, CreateMemoryCommand, ICreateMemoryResponse } from '@mp/api/memories/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Memory } from '../models';

@CommandHandler(CreateMemoryCommand)
export class CreateMemoryHandler implements ICommandHandler<CreateMemoryCommand, ICreateMemoryResponse> {
  constructor(private publisher: EventPublisher) {}

  //TODO implement
  async execute(command: CreateMemoryCommand) {

    // Stub
    const response: ICreateMemoryResponse = {
      memory: {
      }
    };

    return response;
  }
}
