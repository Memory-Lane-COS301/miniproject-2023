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
  DeleteFriendCommand,
  IGetFriendsRequest,
  IGetFriendsResponse,
  GetFriendsQuery,
  IGetPendingFriendRequest,
  IGetPendingFriendResponse,
  GetPendingFriendsQuery,
  GetPendingFriendRequestsForQuery
} from '@mp/api/friend/util';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class FriendsService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

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

  async deleteFriend(request: IDeleteFriendRequest): Promise<IDeleteFriendResponse> {
    return await this.commandBus.execute<DeleteFriendCommand, IDeleteFriendResponse>(new DeleteFriendCommand(request));
  }

  async getFriends(request: IGetFriendsRequest): Promise<IGetFriendsResponse> {
    return await this.queryBus.execute<GetFriendsQuery, IGetFriendsResponse>(new GetFriendsQuery(request));
  }

  async getPendingFriends(request: IGetPendingFriendRequest): Promise<IGetPendingFriendResponse> {
    return await this.queryBus.execute<GetPendingFriendsQuery, IGetPendingFriendResponse>(
      new GetPendingFriendsQuery(request),
    );
  }

  async getPendingFriendRequestsFor(request: IGetPendingFriendRequest): Promise<IGetPendingFriendResponse> {
    return await this.queryBus.execute<GetPendingFriendRequestsForQuery, IGetPendingFriendResponse>(
      new GetPendingFriendRequestsForQuery(request),
    );
  }
}
