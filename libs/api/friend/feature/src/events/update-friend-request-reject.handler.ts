import { FriendsRepository } from '@mp/api/friend/data-access';
import { UpdateRejectFriendRequestEvent } from '@mp/api/friend/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UpdateRejectFriendRequestEvent)
export class UpdateRejectFriendRequestHandler implements IEventHandler<UpdateRejectFriendRequestEvent> {
  constructor(private readonly repository: FriendsRepository) {}

  async handle(event: UpdateRejectFriendRequestEvent) {
    console.log(`${UpdateRejectFriendRequestEvent.name}`);

    const currentFriendRequestsSnapshot = await this.repository.getCurrentFriendRequest(
      event.friendRequest.senderId,
      event.friendRequest.receiverId || ' ',
    );
    const currentFriendRequestsDoc = currentFriendRequestsSnapshot.docs[0];
    const currentFriendRequestsId = currentFriendRequestsDoc.id;

    await this.repository.updateFriendRequestStatusRejected(currentFriendRequestsId);
  }
}
