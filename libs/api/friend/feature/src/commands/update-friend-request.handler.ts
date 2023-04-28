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

    if (!request.friendRequest.senderId || !request.friendRequest.receiverUsername)
      throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.friendRequest.senderId);

    if (!userDoc.data()) throw new Error('User not found');

    const receiverSnapshot = await this.userRepository.findUserWithUsername(request.friendRequest.receiverUsername);

    if (!receiverSnapshot) throw new Error('Receiver not found');

    const receiverUserDoc = receiverSnapshot.docs[0];


    //new status
    const newStatus = request.friendRequest.status;

    //you are receiveing the requests
    const receiverId = request.friendRequest.senderId;
    const senderId = receiverUserDoc.id;

    console.log(senderId);
    console.log(receiverId);
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

    console.log(friendData);

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
