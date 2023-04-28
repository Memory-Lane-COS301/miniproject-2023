import {
  UpdateMemoryTimeCommand,
  IUpdateMemoryTimeResponse,
  IReviveDeadMemory,
  ReviveStatus,
} from '@mp/api/memories/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReviveDeadMemory } from '../models';
import { UsersRepository } from '@mp/api/users/data-access';
import { MemoriesRepository } from '@mp/api/memories/data-access';

@CommandHandler(UpdateMemoryTimeCommand)
export class UpdateMemoryTimeHandler implements ICommandHandler<UpdateMemoryTimeCommand, IUpdateMemoryTimeResponse> {
  constructor(
    private publisher: EventPublisher,
    private userRepository: UsersRepository,
    private memoriesRepository: MemoriesRepository,
  ) {}

  async execute(command: UpdateMemoryTimeCommand) {
    console.log(`${UpdateMemoryTimeCommand.name}`);

    const request = command.request;

    if (!request.request.userId || !request.request.memoryId || !request.request.secondsToAdd)
      throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.request.userId);
    const userData = userDoc.data();

    if (!userData) throw new Error('User not found');

    const memoryDoc = await this.memoriesRepository.findMemory(request.request.memoryId);
    const memoryData = memoryDoc.data();

    if (!memoryData) throw new Error('Memory not found');

    const reviveDeadMemory: IReviveDeadMemory = {
      userId: request.request.userId,
      memoryId: request.request.memoryId,
      secondsToAdd: request.request.secondsToAdd,
    };

    const memory = this.publisher.mergeObjectContext(ReviveDeadMemory.fromData(reviveDeadMemory));

    memory.IncreseMemoryTime();
    memory.commit();

    return { status: ReviveStatus.SUCCESS };
  }
}
