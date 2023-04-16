import { CreateMemoryCommand, MemoryCreatedEvent } from '@mp/api/memories/util';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemoriesSagas {
  @Saga()
  onMemoryCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MemoryCreatedEvent),
      map((event) => new CreateMemoryCommand({ memory: event.memory })),
    );
  };
}
