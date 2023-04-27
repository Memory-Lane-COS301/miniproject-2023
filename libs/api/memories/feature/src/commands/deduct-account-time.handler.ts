import { UsersRepository } from '@mp/api/users/data-access';
import { DeductAccountTimeCommand } from '@mp/api/memories/util';
import { IReviveDeadMemoryResponse, IReviveDeadMemory, ReviveStatus } from '@mp/api/memories/util';
import { ReviveDeadMemory } from '@mp/api/memories/feature';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeductAccountTimeCommand)
export class DeductAccountTimeHandler implements ICommandHandler<DeductAccountTimeCommand, IReviveDeadMemoryResponse> {
  constructor(private readonly publisher: EventPublisher, private readonly repository: UsersRepository) {}

  async execute(command: DeductAccountTimeCommand) {
    console.log(`${DeductAccountTimeHandler.name}`);

    const request = command.request;
    const profileDoc = await this.repository.findUser(request.userId);
    const profileData = profileDoc.data();

    if (!profileData) throw new Error('Profile not found');

    const reviveDeadMemory: IReviveDeadMemory = {
      userId: request.userId,
      memoryId: request.memoryId,
      secondsToAdd: request.secondsToAdd,
    };

    const memory = this.publisher.mergeObjectContext(ReviveDeadMemory.fromData(reviveDeadMemory));

    memory.deductAccountTime();
    memory.commit();

    return { status: ReviveStatus.SUCCESS };
  }
}
