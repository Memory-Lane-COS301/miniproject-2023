import { UsersRepository } from '@mp/api/users/data-access';
import { FriendsRepository } from '@mp/api/friend/data-access';
import { IDeleteFriendResponse, DeleteFriendRequestCommand, Status, IFriendRequest } from '@mp/api/friend/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { FriendRequest } from '../models';
import { Timestamp } from 'firebase-admin/firestore';

@CommandHandler(DeleteFriendRequestCommand)
export class DeleteFriendRequestHandler implements ICommandHandler<DeleteFriendRequestCommand, IDeleteFriendResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userRepository: UsersRepository,
    private readonly friendsRepository: FriendsRepository,
  ) {}

  async execute(command: DeleteFriendRequestCommand) {
    console.log(`${DeleteFriendRequestHandler.name}`);

    const request = command.request;

    if (!request.friendRequest.senderId || !request.friendRequest.receiverUsername)
      throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.friendRequest.senderId);

    if (!userDoc.data()) throw new Error('User not found');

    const receiverUserSnapshot = await this.userRepository.findUserWithUsername(request.friendRequest.receiverUsername);

    if (receiverUserSnapshot.empty) throw new Error('Receiver not found');

    const receiverUserDoc = receiverUserSnapshot.docs[0];

    //maks sure that the friend request exixts
    const possibleFriendRequestsSnapshot = await this.friendsRepository.getCurrentFriendRequest(
      request.friendRequest.senderId,
      receiverUserDoc.id,
    );
    if (possibleFriendRequestsSnapshot.size == 1) {
      const friendData: IFriendRequest = {
        senderId: request.friendRequest.senderId,
        receiverId: receiverUserDoc.id,
      };

      const friendRequest = this.publisher.mergeObjectContext(FriendRequest.fromData(friendData));

      friendRequest.delete();
      friendRequest.commit();

      return { status: Status.SUCCESS };
    } else {
      return { status: Status.FAILURE };
    }
  }
}
