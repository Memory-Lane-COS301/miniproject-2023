import { Injectable } from '@nestjs/common';
import { 
    IGetUserResponse, 
    IGetUserRequest,
    GetUserQuery} from '@mp/api/users/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class UsersService {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

async getUser(request: IGetUserRequest): Promise<IGetUserResponse> {
    return await this.queryBus.execute<GetUserQuery, IGetUserResponse>(new GetUserQuery(request));
  }
}
