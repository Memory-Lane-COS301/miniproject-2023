import { IMemory } from '../interfaces';

export class MemoryCreatedEvent {
  constructor(public readonly memory: IMemory) {}
}
