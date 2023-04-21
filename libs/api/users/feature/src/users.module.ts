import { UsersModule as UsersDataAccessModule } from '@mp/api/users/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands';
import { UserCreatedHandler } from './events';
import { UsersSagas } from './users.sagas';
import { UsersService } from './users.service';
import { GetUserHandler } from './query';
export const CommandHandlers = [CreateUserHandler];
export const EventHandlers = [UserCreatedHandler];
export const QueryHandlers = [
  GetUserHandler
];

@Module({
  imports: [CqrsModule, UsersDataAccessModule],
  providers: [UsersService, ...CommandHandlers, ...QueryHandlers, ...EventHandlers, UsersSagas],
  exports: [UsersService],
})
export class UsersModule {}
