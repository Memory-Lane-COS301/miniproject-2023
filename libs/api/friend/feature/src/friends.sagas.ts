import { UpdateAcceptFriendRequestEvent, CreateFriendCommand } from '@mp/api/friend/util';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class FriendsSagas {
  @Saga()
  onUpdateAcceptFriendRequestEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UpdateAcceptFriendRequestEvent),
      map((event: UpdateAcceptFriendRequestEvent) => new CreateFriendCommand({ friendRequest: event.friendRequest })),
    );
  };
}
