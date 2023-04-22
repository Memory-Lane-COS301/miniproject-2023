import { FriendsModule as FriendsDataAccessModule } from '@mp/api/friend/data-access';
import { UsersModule as UsersDataAccessModule } from '@mp/api/users/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { 
  CreateFriendRequestHandler,
  UpdateFriendRequestHandler,
  CreateFriendHandler,
  DeleteFriendRequestHandler,
} from './commands';
import {
  FriendRequestCreatedHandler,
  UpdateAcceptFriendRequestHandler,
  UpdateRejectFriendRequestHandler,
  FriendCreatedEventHandler,
  DeleteFriendRequestEventHandler,
} from './events';
import { FriendsSagas } from './friends.sagas';
import { FriendsService } from './friends.service';
export const CommandHandlers = [
  CreateFriendRequestHandler,
  UpdateFriendRequestHandler,
  CreateFriendHandler,
  DeleteFriendRequestHandler,
];
export const EventHandlers = [
  FriendRequestCreatedHandler,
  UpdateAcceptFriendRequestHandler,
  UpdateRejectFriendRequestHandler,
  FriendCreatedEventHandler,
  DeleteFriendRequestEventHandler,
];

@Module({
  imports: [CqrsModule, FriendsDataAccessModule, UsersDataAccessModule],
  providers: [FriendsService, ...CommandHandlers, ...EventHandlers, FriendsSagas],
  exports: [FriendsService],
})
export class FriendsModule {}
