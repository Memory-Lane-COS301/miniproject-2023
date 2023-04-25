import { IReviveDeadMemory } from '../interfaces';

export class DeductAccountTimeEvent {
  constructor(public readonly request: IReviveDeadMemory) {}
}
