import {
  UpdateAcceptFriendRequestEvent,
  CreateFriendCommand,
  IncreaseFriendCountCommand,
  ReduceFriendCountCommand,
  FriendCreatedEvent,
  DeleteFriendEvent,
} from '@mp/api/friend/util';
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

  @Saga()
  onCreateFriendCommand = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FriendCreatedEvent),
      map(
        (event: FriendCreatedEvent) =>
          new IncreaseFriendCountCommand({ senderId: event.friend.userId1 || ' ', receiverId: event.friend.userId2 }),
      ),
    );
  };

  @Saga()
  onDeleteFriendCommand = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DeleteFriendEvent),
      map(
        (event: DeleteFriendEvent) =>
          new ReduceFriendCountCommand({
            senderId: event.friendRequest.senderId,
            receiverId: event.friendRequest.receiverId,
          }),
      ),
    );
  };
}
