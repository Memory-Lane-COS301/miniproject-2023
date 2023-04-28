import { FriendsRepository } from '@mp/api/friend/data-access';
import { UsersRepository } from '@mp/api/users/data-access';
import { FriendRequestCreatedEvent } from '@mp/api/friend/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FriendRequestCreatedEvent)
export class FriendRequestCreatedHandler implements IEventHandler<FriendRequestCreatedEvent> {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async handle(event: FriendRequestCreatedEvent) {
    console.log(`${FriendRequestCreatedHandler.name}`);
    await this.friendsRepository.createFriendRequest(event.friendRequest);
    await this.usersRepository.updateFriendRequestNotification(event.friendRequest.receiverId || ' ')
  }
}
