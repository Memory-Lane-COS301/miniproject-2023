import { IMemory } from '@mp/api/memories/util';
import { IUser } from '@mp/api/users/util';

export class GetFeedMemories {
    static readonly type = '[Feed] GetFeedMemories';
}

export class SetFeed {
  static readonly type = '[Feed] SetFeed';
  constructor(public readonly memories: IMemory[]) {}
}

export class AddMemoryToFeedPage {
  static readonly type = '[Feed] AddMemoryToFeedPage';
  constructor(public readonly memory: IMemory) {}
}
