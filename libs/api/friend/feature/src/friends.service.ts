import { ICreateFriendRequest, ICreateFriendResponse, CreateFriendRequestCommand } from '@mp/api/friend/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class FriendsService {
  constructor(private readonly commandBus: CommandBus) {}

  async createFriendRequest(request: ICreateFriendRequest): Promise<ICreateFriendResponse> {
    return await this.commandBus.execute<CreateFriendRequestCommand, ICreateFriendResponse>(
      new CreateFriendRequestCommand(request),
    );
  }
}
