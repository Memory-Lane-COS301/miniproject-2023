import {
  OnlyIncreseMemoryTimeCommand,
  IReviveDeadMemoryResponse,
  IReviveDeadMemory,
  ReviveStatus,
} from '@mp/api/memories/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReviveDeadMemory } from '../models';
import { UsersRepository } from '@mp/api/users/data-access';
import { MemoriesRepository } from '@mp/api/memories/data-access';

@CommandHandler(OnlyIncreseMemoryTimeCommand)
export class OnlyIncreseMemoryTimeCommandHandler
  implements ICommandHandler<OnlyIncreseMemoryTimeCommand, IReviveDeadMemoryResponse>
{
  constructor(
    private publisher: EventPublisher,
    private userRepository: UsersRepository,
    private memoriesRepository: MemoriesRepository,
  ) {}

  async execute(command: OnlyIncreseMemoryTimeCommand) {
    console.log(`${OnlyIncreseMemoryTimeCommandHandler.name}`);

    const request = command.reviveMemory;

    if (!request.userId || !request.memoryId || !request.secondsToAdd) throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.userId);
    const userData = userDoc.data();

    if (!userData) throw new Error('User not found');

    const memoryDoc = await this.memoriesRepository.findMemory(request.memoryId);
    const memoryData = memoryDoc.data();

    if (!memoryData) throw new Error('Memory not found');

    const reviveDeadMemory: IReviveDeadMemory = {
      userId: request.userId,
      memoryId: request.memoryId,
      secondsToAdd: request.secondsToAdd,
    };

    const memory = this.publisher.mergeObjectContext(ReviveDeadMemory.fromData(reviveDeadMemory));

    memory.OnlyIncreseMemoryTime();
    memory.commit();

    return { status: ReviveStatus.SUCCESS };
  }
}
