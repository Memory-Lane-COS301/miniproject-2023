import { FriendsModule as FriendsDataAccessModule } from '@mp/api/friend/data-access';
import { UsersModule as UsersDataAccessModule } from '@mp/api/users/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateFriendRequestHandler,
  UpdateFriendRequestHandler,
  CreateFriendHandler,
  DeleteFriendRequestHandler,
  DeleteFriendHandler,
  IncreaseFriendCountHandler,
  ReduceFriendCountHandler,
} from './commands';
import { GetFriendsHandler, GetPendingFriendsHandler } from './queries';
import {
  FriendRequestCreatedHandler,
  UpdateAcceptFriendRequestHandler,
  UpdateRejectFriendRequestHandler,
  FriendCreatedEventHandler,
  DeleteFriendRequestEventHandler,
  DeleteFriendEventHandler,
  IncreaseFriendCountEventHandler,
  ReduceFriendCountEventHandler,
} from './events';
import { FriendsSagas } from './friends.sagas';
import { FriendsService } from './friends.service';
export const CommandHandlers = [
  CreateFriendRequestHandler,
  UpdateFriendRequestHandler,
  CreateFriendHandler,
  DeleteFriendRequestHandler,
  DeleteFriendHandler,
  IncreaseFriendCountHandler,
  ReduceFriendCountHandler,
];
export const QueryHandlers = [GetFriendsHandler, GetPendingFriendsHandler];
export const EventHandlers = [
  FriendRequestCreatedHandler,
  UpdateAcceptFriendRequestHandler,
  UpdateRejectFriendRequestHandler,
  FriendCreatedEventHandler,
  DeleteFriendRequestEventHandler,
  DeleteFriendEventHandler,
  IncreaseFriendCountEventHandler,
  ReduceFriendCountEventHandler,
];

@Module({
  imports: [CqrsModule, FriendsDataAccessModule, UsersDataAccessModule],
  providers: [FriendsService, ...CommandHandlers, ...QueryHandlers, ...EventHandlers, FriendsSagas],
  exports: [FriendsService],
})
export class FriendsModule {}
