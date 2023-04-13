import {
  ICreateMemoryRequest,
  ICreateMemoryResponse,
  MemoryCreatedEvent,
  CreateMemoryCommand,
} from '@mp/api/memories/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class MemoriesService {
  constructor(private readonly commandBus: CommandBus) {}

  async createMemory(request: ICreateMemoryRequest): Promise<ICreateMemoryResponse> {
    return await this.commandBus.execute<CreateMemoryCommand, ICreateMemoryResponse>(new CreateMemoryCommand(request));
  }
}
