import { DeductAccountTimeCommand, ReviveDeadMemoryEvent, IncreseMemoryTimeEvent } from '@mp/api/memories/util';
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
  onIncreseMemoryTime = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IncreseMemoryTimeEvent),
      map((event: IncreseMemoryTimeEvent) => new DeductAccountTimeCommand(event.reviveMemory)),
    );
  };
}
