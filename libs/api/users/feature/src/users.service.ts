import { Injectable } from '@nestjs/common';
import { IGetUserRequest } from '@mp/api/users/util';
import { IGetUserResponse } from '@mp/api/users/util';
import { GetUserCommand } from '@mp/api/users/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class UsersService {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    async getUser(request: IGetUserRequest): Promise<IGetUserResponse> {
        return await this.commandBus.execute<GetUserCommand, IGetUserResponse>(new GetUserCommand(request));
      }
}
