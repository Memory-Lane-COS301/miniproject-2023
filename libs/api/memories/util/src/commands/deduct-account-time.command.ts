import { IReviveDeadMemory } from '../interfaces';

export class DeductAccountTimeCommand {
  constructor(public readonly request: IReviveDeadMemory) {}
}
