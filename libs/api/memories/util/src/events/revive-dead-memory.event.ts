import { IReviveDeadMemory } from '../interfaces';

export class ReviveDeadMemoryEvent {
  constructor(public readonly reviveMemory: IReviveDeadMemory) {}
}
