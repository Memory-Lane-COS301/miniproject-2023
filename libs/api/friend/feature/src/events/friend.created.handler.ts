import { FriendsRepository } from '@mp/api/friend/data-access';
import { FriendCreatedEvent } from '@mp/api/friend/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FriendCreatedEvent)
export class FriendCreatedEventHandler implements IEventHandler<FriendCreatedEvent> {
  constructor(private readonly repository: FriendsRepository) {}

  async handle(event: FriendCreatedEvent) {
    console.log(`${FriendCreatedEvent.name}`);
    await this.repository.createFriend(event.friend);
  }
}
