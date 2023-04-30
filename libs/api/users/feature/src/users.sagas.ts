import { AuthCreatedEvent } from '@mp/api/auth/util';
import { MemoryCreatedEvent } from '@mp/api/memories/util';
import { 
  CreateUserCommand,
  IncrementUserMemoryCountCommand
} from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class UsersSagas {
  @Saga()
  onAuthCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AuthCreatedEvent),
      map((event) => new CreateUserCommand({ auth: event.auth })),
    );
  };

  @Saga()
  onMemoryCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MemoryCreatedEvent),
      map((event) => new IncrementUserMemoryCountCommand({ userId: event.memory.userId || ' '})),
    );
  };
}
