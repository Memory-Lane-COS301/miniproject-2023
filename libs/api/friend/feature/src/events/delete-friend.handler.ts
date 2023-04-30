import { FriendsRepository } from '@mp/api/friend/data-access';
import { DeleteFriendEvent } from '@mp/api/friend/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(DeleteFriendEvent)
export class DeleteFriendEventHandler implements IEventHandler<DeleteFriendEvent> {
  constructor(private readonly repository: FriendsRepository) {}

  async handle(event: DeleteFriendEvent) {
    console.log(`${DeleteFriendEventHandler.name}`);

    const senderId = event.friendRequest.senderId;
    const receiverId = event.friendRequest.receiverId || ' ';

    const currentFriendSnapsot = await this.repository.getCurrentFriend(senderId, receiverId);
    const currentFriendDataId = currentFriendSnapsot.docs[0].id;

    await this.repository.deleteFriend(currentFriendDataId);
  }
}
