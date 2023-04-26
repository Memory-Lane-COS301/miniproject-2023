import {
  ICreateMemoryRequest,
  ICreateMemoryResponse,
  ICreateCommentRequest,
  ICreateCommentResponse,
  CreateMemoryCommand,
  CreateCommentCommand,
  GetCommentsQuery,
  GetFeedMemoriesQuery,
  IGetCommentsRequest,
  IGetCommentsResponse,
  IGetFeedMemoriesRequest,
  IGetFeedMemoriesResponse,
  IReviveDeadMemoryRequest,
  IReviveDeadMemoryResponse,
  ReviveDeadMemoryCommand,
  IUpdateMemoryTimeRequest,
  IUpdateMemoryTimeResponse,
  UpdateMemoryTimeCommand,
} from '@mp/api/memories/util';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class MemoriesService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async createMemory(request: ICreateMemoryRequest) {
    return await this.commandBus.execute<CreateMemoryCommand, ICreateMemoryResponse>(new CreateMemoryCommand(request));
  }

  async getComments(request: IGetCommentsRequest): Promise<IGetCommentsResponse> {
    return await this.queryBus.execute<GetCommentsQuery, IGetCommentsResponse>(new GetCommentsQuery(request));
  }

  async getFeedMemories(request: IGetFeedMemoriesRequest): Promise<IGetFeedMemoriesResponse> {
    return await this.queryBus.execute<GetFeedMemoriesQuery, IGetFeedMemoriesResponse>(
      new GetFeedMemoriesQuery(request),
    );
  }

  async createComment(request: ICreateCommentRequest): Promise<ICreateCommentResponse> {
    return await this.commandBus.execute<CreateCommentCommand, ICreateCommentResponse>(
      new CreateCommentCommand(request),
    );
  }

  async reviveDeadMemory(request: IReviveDeadMemoryRequest): Promise<IReviveDeadMemoryResponse> {
    return await this.commandBus.execute<ReviveDeadMemoryCommand, IReviveDeadMemoryResponse>(
      new ReviveDeadMemoryCommand(request),
    );
  }

  async addMemoryTime(request: IUpdateMemoryTimeRequest): Promise<IUpdateMemoryTimeResponse> {
    return await this.commandBus.execute<UpdateMemoryTimeCommand, IUpdateMemoryTimeResponse>(
      new UpdateMemoryTimeCommand(request),
    );
  }
}
