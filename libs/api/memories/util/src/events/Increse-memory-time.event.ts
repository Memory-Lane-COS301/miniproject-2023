import { IReviveDeadMemory } from '../interfaces';

export class IncreseMemoryTimeEvent {
  constructor(public readonly reviveMemory: IReviveDeadMemory) {}
}
