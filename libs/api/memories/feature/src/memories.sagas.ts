import { DeductAccountTimeCommand, ReviveDeadMemoryEvent, UpdateMemoryCommand } from '@mp/api/memories/util';
import { UserUpdatedEvent } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemoriesSagas {
  @Saga()
  onReviveDeadMemory = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReviveDeadMemoryEvent),
      map((event: ReviveDeadMemoryEvent) => new DeductAccountTimeCommand(event.reviveMemory)),
    );
  };

  @Saga()
  onUserUpdatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserUpdatedEvent),
      map((event: UserUpdatedEvent) => new UpdateMemoryCommand({user:event.user})),
    );
  };
}
