import {
  ICreateFriendRequest,
  ICreateFriendResponse,
  CreateFriendRequestCommand,
  IUpdateFriendRequest,
  IUpdateFriendResponse,
  UpdateFriendRequestCommand,
  IDeleteFriendResponse,
  IDeleteFriendRequest,
  DeleteFriendRequestCommand,
} from '@mp/api/friend/util';
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

  async updateFriendRequest(request: IUpdateFriendRequest): Promise<IUpdateFriendResponse> {
    return await this.commandBus.execute<UpdateFriendRequestCommand, IUpdateFriendResponse>(
      new UpdateFriendRequestCommand(request),
    );
  }

  async deleteFriendRequest(request: IDeleteFriendRequest): Promise<IDeleteFriendResponse> {
    return await this.commandBus.execute<DeleteFriendRequestCommand, IDeleteFriendResponse>(
      new DeleteFriendRequestCommand(request),
    );
  }
}
