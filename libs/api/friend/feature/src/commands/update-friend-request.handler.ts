import { UsersRepository } from '@mp/api/users/data-access';
import { FriendsRepository } from '@mp/api/friend/data-access';
import { IUpdateFriendResponse, UpdateFriendRequestCommand, Status, IFriendRequest } from '@mp/api/friend/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { FriendRequest } from '../models';
import { Timestamp } from 'firebase-admin/firestore';

@CommandHandler(UpdateFriendRequestCommand)
export class UpdateFriendRequestHandler implements ICommandHandler<UpdateFriendRequestCommand, IUpdateFriendResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userRepository: UsersRepository,
    private readonly friendsRepository: FriendsRepository,
  ) {}

  async execute(command: UpdateFriendRequestCommand) {
    console.log(`${UpdateFriendRequestCommand.name}`);

    const request = command.request;

    if (!request.friendRequest.senderId || !request.friendRequest.receiverId)
      throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.friendRequest.senderId);

    if (!userDoc.data()) throw new Error('User not found');

    const receiverUserDoc = await this.userRepository.findUserById(request.friendRequest.receiverId);

    if (!receiverUserDoc.data()) throw new Error('Receiver not found');

    //new status
    const newStatus = request.friendRequest.status;

    //you are receiveing the requests
    const receiverId = request.friendRequest.senderId;
    const senderId = receiverUserDoc.id;

    //get current friendRequestsId
    const currentFriendRequestsSnapshot = await this.friendsRepository.getCurrentFriendRequest(senderId, receiverId);
    const currentFriendRequestsDoc = currentFriendRequestsSnapshot.docs[0];

    //updated freindRequest
    const friendData: IFriendRequest = {
      senderId: senderId,
      receiverId: receiverId,
      status: newStatus,
      lastUpdated: Timestamp.now(),
      created: currentFriendRequestsDoc.data()['created'],
    };

    const updatedFriendRequest = this.publisher.mergeObjectContext(FriendRequest.fromData(friendData));

    if (request.friendRequest.status == 'accepted') {
      updatedFriendRequest.acceptFriendRequest();
    } else if (request.friendRequest.status == 'rejected') {
      updatedFriendRequest.rejectFriendRequest();
    } else {
      return { status: Status.FAILURE };
    }

    updatedFriendRequest.commit();
    return { status: Status.SUCCESS };
  }
}
