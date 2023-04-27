import { UsersRepository } from '@mp/api/users/data-access';
import { DeductAccountTimeEvent } from '@mp/api/memories/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReviveStatus } from '@mp/api/memories/util';

@EventsHandler(DeductAccountTimeEvent)
export class DeductAccountTimeEventHandler implements IEventHandler<DeductAccountTimeEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle(event: DeductAccountTimeEvent) {
    console.log(`${DeductAccountTimeEventHandler.name}`);

    const currentUserSnapshot = await this.usersRepository.findUserById(event.request.userId);
    const currentUserData = currentUserSnapshot.data();
    if (currentUserData && currentUserData.accountTime) {
      const resultUserTime = currentUserData.accountTime - event.request.secondsToAdd;
      this.usersRepository.setUserTime(event.request.userId, resultUserTime);
      return { status: ReviveStatus.SUCCESS };
    } else {
      return { status: ReviveStatus.FAILURE };
    }
  }
}
