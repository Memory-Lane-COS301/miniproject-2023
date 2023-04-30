import { UsersRepository } from '@mp/api/users/data-access';
import { FriendsRepository } from '@mp/api/friend/data-access';
import { IDeleteFriendResponse, DeleteFriendCommand, Status, IFriendRequest } from '@mp/api/friend/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { FriendRequest } from '../models';

@CommandHandler(DeleteFriendCommand)
export class DeleteFriendHandler implements ICommandHandler<DeleteFriendCommand, IDeleteFriendResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userRepository: UsersRepository,
    private readonly friendsRepository: FriendsRepository,
  ) {}

  async execute(command: DeleteFriendCommand) {
    console.log(`${DeleteFriendHandler.name}`);

    const request = command.request;

    if (!request.friendRequest.senderId || !request.friendRequest.receiverUsername)
      throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.friendRequest.senderId);

    if (!userDoc.data()) throw new Error('User not found');

    const receiverUserSnapshot = await this.userRepository.findUserWithUsername(request.friendRequest.receiverUsername);

    if (receiverUserSnapshot.empty) throw new Error('Receiver not found');

    const receiverUserDoc = receiverUserSnapshot.docs[0];




    const possibleFriendRequestsSnapshot = await this.friendsRepository.getCurrentFriendRequest(
      receiverUserDoc.id,
      request.friendRequest.senderId,
    );

    if (!possibleFriendRequestsSnapshot.empty) {
      await this.friendsRepository.deleteFriendRequest(possibleFriendRequestsSnapshot.docs[0].id)
    }

    const currentFriendRequestsSnapshot = await this.friendsRepository.getCurrentFriendRequest(
      request.friendRequest.senderId,
      receiverUserDoc.id,
    );

    if (!currentFriendRequestsSnapshot.empty) {
      await this.friendsRepository.deleteFriendRequest(currentFriendRequestsSnapshot.docs[0].id)
    }




    //check senderId = request.friendRequest.senderId and receiverId= receiverUserDoc.id
    const possibleFriendRequestsSnapshot1 = await this.friendsRepository.getCurrentFriend(
      request.friendRequest.senderId,
      receiverUserDoc.id,
    );
    if (possibleFriendRequestsSnapshot1.size == 1) {
      const friendData: IFriendRequest = {
        senderId: request.friendRequest.senderId,
        receiverId: receiverUserDoc.id,
      };

      const friend = this.publisher.mergeObjectContext(FriendRequest.fromData(friendData));

      friend.deleteFriend();
      friend.commit();

      return { status: Status.SUCCESS };
    }

    //check senderId = receiverUserDoc.id and receiverId= request.friendRequest.senderId
    const possibleFriendRequestsSnapshot2 = await this.friendsRepository.getCurrentFriend(
      receiverUserDoc.id,
      request.friendRequest.senderId,
    );
    if (possibleFriendRequestsSnapshot2.size == 1) {
      const friendData: IFriendRequest = {
        senderId: receiverUserDoc.id,
        receiverId: request.friendRequest.senderId,
      };

      const friend = this.publisher.mergeObjectContext(FriendRequest.fromData(friendData));

      friend.deleteFriend();
      friend.commit();

      return { status: Status.SUCCESS };
    }

    //not friends or some other error occured
    return { status: Status.FAILURE };
  }
}
