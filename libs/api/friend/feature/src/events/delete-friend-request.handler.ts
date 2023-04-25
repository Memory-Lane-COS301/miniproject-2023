import { FriendsRepository } from '@mp/api/friend/data-access';
import { DeleteFriendRequestEvent } from '@mp/api/friend/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(DeleteFriendRequestEvent)
export class DeleteFriendRequestEventHandler implements IEventHandler<DeleteFriendRequestEvent> {
  constructor(private readonly repository: FriendsRepository) {}

  async handle(event: DeleteFriendRequestEvent) {
    console.log(`${DeleteFriendRequestEventHandler.name}`);

    const senderId = event.friendRequest.senderId;
    const receiverId = event.friendRequest.receiverId || ' ';

    const currentFriendSnapsot = await this.repository.getCurrentFriendRequest(senderId, receiverId);
    const currentFriendDataId = currentFriendSnapsot.docs[0].id;

    await this.repository.deleteFriendRequest(currentFriendDataId);
  }
}
