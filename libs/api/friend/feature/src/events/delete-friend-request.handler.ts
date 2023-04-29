import { FriendsRepository } from '@mp/api/friend/data-access';
import { DeleteFriendRequestEvent } from '@mp/api/friend/util';
import { UsersRepository } from '@mp/api/users/data-access';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(DeleteFriendRequestEvent)
export class DeleteFriendRequestEventHandler implements IEventHandler<DeleteFriendRequestEvent> {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async handle(event: DeleteFriendRequestEvent) {
    console.log(`${DeleteFriendRequestEventHandler.name}`);

    const senderId = event.friendRequest.senderId;
    const receiverId = event.friendRequest.receiverId || ' ';

    const currentFriendSnapsot = await this.friendsRepository.getCurrentFriendRequest(senderId, receiverId);
    const currentFriendDataId = currentFriendSnapsot.docs[0].id;

    await this.friendsRepository.deleteFriendRequest(currentFriendDataId);
    await this.usersRepository.updateFriendRequestNotification(event.friendRequest.receiverId || ' ')
  }
}
