import {
  ICreateMemoryRequest,
  ICreateMemoryResponse,
  MemoryCreatedEvent,
  CreateMemoryCommand,
  GetCommentsQuery,
  IGetCommentsRequest,
  IGetCommentsResponse,
} from '@mp/api/memories/util';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class MemoriesService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async createMemory(request: ICreateMemoryRequest): Promise<ICreateMemoryResponse> {
    return await this.commandBus.execute<CreateMemoryCommand, ICreateMemoryResponse>(new CreateMemoryCommand(request));
  }

  async getComments(request: IGetCommentsRequest): Promise<IGetCommentsResponse> {
    return await this.queryBus.execute<GetCommentsQuery, IGetCommentsResponse>(new GetCommentsQuery(request));
  }
}
