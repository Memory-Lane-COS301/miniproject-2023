import { IReviveDeadMemory } from '../interfaces';

export class OnlyIncreseMemoryTimeEvent {
  constructor(public readonly reviveMemory: IReviveDeadMemory) {}
}
