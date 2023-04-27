import { UsersRepository } from '@mp/api/users/data-access';
import { IncrementUserMemoryCountCommand } from '@mp/api/users/util';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IncrementUserMemoryCountCommand)
export class IncrementUserMemoryCountHandler implements ICommandHandler<IncrementUserMemoryCountCommand> {
  constructor(
    private readonly repository: UsersRepository
  ) {}

  async execute(command: IncrementUserMemoryCountCommand) {
    console.log(`${IncrementUserMemoryCountCommand.name}`);

    const request = command.request;

    if (!request.userId)
      throw new Error('Missing required field userId');

    await this.repository.incrementMemoryCount(request.userId);
  }
}
