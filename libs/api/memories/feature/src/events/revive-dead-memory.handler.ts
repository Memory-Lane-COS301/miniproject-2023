import { MemoriesRepository } from '@mp/api/memories/data-access';
import { UsersRepository } from '@mp/api/users/data-access';
import { ReviveDeadMemoryEvent } from '@mp/api/memories/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReviveStatus } from '@mp/api/memories/util';

@EventsHandler(ReviveDeadMemoryEvent)
export class ReviveDeadMemoryEventHandler implements IEventHandler<ReviveDeadMemoryEvent> {
  constructor(
    private readonly memoryRepository: MemoriesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async handle(event: ReviveDeadMemoryEvent) {
    console.log(`${ReviveDeadMemoryEventHandler.name}`);

    const memorySnapshot = await this.memoryRepository.findMemory(event.reviveMemory.memoryId);
    if (memorySnapshot != undefined) {
      const currentUserSnapshot = await this.usersRepository.findUserById(event.reviveMemory.userId);
      const currentUserData = currentUserSnapshot.data();
      if (currentUserData != undefined && currentUserData['accountTime'] >= event.reviveMemory.secondsToAdd) {
        this.memoryRepository.reviveDeadMemory(event.reviveMemory.memoryId, event.reviveMemory.secondsToAdd);
        return { status: ReviveStatus.SUCCESS };
      } else {
        return { status: ReviveStatus.FAILURE };
      }
    } else {
      return { status: ReviveStatus.FAILURE };
    }
  }
}
