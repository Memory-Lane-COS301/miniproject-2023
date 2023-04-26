import { MemoriesRepository } from '@mp/api/memories/data-access';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMemoryCommand, IUpdateMemoryResponse } from '@mp/api/memories/util';

@CommandHandler(UpdateMemoryCommand)
export class UpdateMemoryHandler implements ICommandHandler<UpdateMemoryCommand, IUpdateMemoryResponse> {
  constructor(private readonly publisher: EventPublisher, private readonly repository: MemoriesRepository) {}

  async execute(command: UpdateMemoryCommand) {
    console.log(`${UpdateMemoryHandler.name}`);

    const request = command.request;
    const user = request.user;
    const repository = new MemoriesRepository();
    repository.updateMemories(user);
    const response: IUpdateMemoryResponse = { user };

    return response;
  }
}
