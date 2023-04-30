import { UsersRepository } from '@mp/api/users/data-access';
import { DeductAccountTimeEvent } from '@mp/api/memories/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReviveStatus } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';

@EventsHandler(DeductAccountTimeEvent)
export class DeductAccountTimeEventHandler implements IEventHandler<DeductAccountTimeEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle(event: DeductAccountTimeEvent) {
    console.log(`${DeductAccountTimeEventHandler.name}`);

    const currentUserSnapshot = await this.usersRepository.findUserById(event.request.userId);
    const currentUserData = currentUserSnapshot.data();
    if (currentUserData && currentUserData.accountTime) {
      const resultUserTime = currentUserData.accountTime - event.request.secondsToAdd;

      let currentUserDeathTime;
      if (currentUserData.deathTime != null && currentUserData.deathTime != undefined)
        currentUserDeathTime = currentUserData.deathTime.toDate();

      if (currentUserDeathTime != undefined) {
        const dateString = new Date(event.request.secondsToAdd * 1000).toISOString();
        const h = Number(currentUserDeathTime.getHours()) - Number(dateString.slice(11, 13));
        const m = Number(currentUserDeathTime.getMinutes()) - Number(dateString.slice(14, 16));
        const s = Number(currentUserDeathTime.getSeconds()) - Number(dateString.slice(17, 19));
        currentUserDeathTime.setHours(h);
        currentUserDeathTime.setMinutes(m);
        currentUserDeathTime.setSeconds(s);

        this.usersRepository.setUserTime(
          event.request.userId,
          resultUserTime,
          Timestamp.fromDate(currentUserDeathTime),
        );
        return { status: ReviveStatus.SUCCESS };
      }

      return { status: ReviveStatus.FAILURE };
    } else {
      return { status: ReviveStatus.FAILURE };
    }
  }
}
