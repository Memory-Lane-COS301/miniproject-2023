import { FriendsRepository } from '@mp/api/friend/data-access';
import { UpdateAcceptFriendRequestEvent } from '@mp/api/friend/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UpdateAcceptFriendRequestEvent)
export class UpdateAcceptFriendRequestHandler implements IEventHandler<UpdateAcceptFriendRequestEvent> {
  constructor(private readonly repository: FriendsRepository) {}

  async handle(event: UpdateAcceptFriendRequestEvent) {
    console.log(`${UpdateAcceptFriendRequestEvent.name}`);

    const currentFriendRequestsSnapshot = await this.repository.getCurrentFriendRequest(
      event.friendRequest.senderId,
      event.friendRequest.receiverId || ' ',
    );
    const currentFriendRequestsDoc = currentFriendRequestsSnapshot.docs[0];
    const currentFriendRequestsId = currentFriendRequestsDoc.id;

    await this.repository.updateFriendRequestStatusAccepted(currentFriendRequestsId);
  }
}
