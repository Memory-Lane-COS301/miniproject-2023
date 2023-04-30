import { MemoriesRepository } from '@mp/api/memories/data-access';
import { UsersRepository } from '@mp/api/users/data-access';
import { IncreseMemoryTimeEvent } from '@mp/api/memories/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReviveStatus } from '@mp/api/memories/util';

@EventsHandler(IncreseMemoryTimeEvent)
export class IncreseMemoryTimeEventHandler implements IEventHandler<IncreseMemoryTimeEvent> {
  constructor(
    private readonly memoryRepository: MemoriesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async handle(event: IncreseMemoryTimeEvent) {
    console.log(`${IncreseMemoryTimeEventHandler.name}`);

    const memorySnapshot = await this.memoryRepository.findMemory(event.reviveMemory.memoryId);
    if (memorySnapshot != undefined) {
      const currentUserSnapshot = await this.usersRepository.findUserById(event.reviveMemory.userId);
      const currentUserData = currentUserSnapshot.data();
      if (
        currentUserData != undefined &&
        currentUserData['accountTime'] != undefined &&
        currentUserData['accountTime'] >= event.reviveMemory.secondsToAdd
      ) {
        let currentDeathTime = memorySnapshot.data()?.deathTime;

        let newAccountTime: any = 0;
        if (memorySnapshot.data() != undefined) {
          newAccountTime = memorySnapshot.data()?.remainingTime;
          newAccountTime += event.reviveMemory.secondsToAdd;
        }
        if (currentDeathTime != undefined && currentDeathTime != null)
          this.memoryRepository.IncreseMemoryTime(
            event.reviveMemory.memoryId,
            newAccountTime,
            event.reviveMemory.secondsToAdd,
            currentDeathTime,
          );
        return { status: ReviveStatus.SUCCESS };
      } else {
        return { status: ReviveStatus.FAILURE };
      }
    } else {
      return { status: ReviveStatus.FAILURE };
    }
  }
}
