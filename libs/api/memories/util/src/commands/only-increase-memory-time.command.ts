import { IReviveDeadMemory } from '../interfaces';

export class OnlyIncreseMemoryTimeCommand {
  constructor(public readonly reviveMemory: IReviveDeadMemory) {}
}
