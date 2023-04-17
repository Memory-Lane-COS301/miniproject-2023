import { UsersModule as UsersDataAccessModule } from '@mp/api/users/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler, GetUserHandler } from './commands';
import { UserCreatedHandler } from './events';
import { UsersSagas } from './users.sagas';
import { UsersService } from './users.service';
export const CommandHandlers = [CreateUserHandler, GetUserHandler];
export const EventHandlers = [UserCreatedHandler];

@Module({
  imports: [CqrsModule, UsersDataAccessModule],
  providers: [UsersService, ...CommandHandlers, ...EventHandlers, UsersSagas],
  exports: [UsersService],
})
export class UsersModule {}
