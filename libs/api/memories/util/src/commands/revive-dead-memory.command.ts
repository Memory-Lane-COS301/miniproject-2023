import { IReviveDeadMemoryRequest } from '../requests';

export class ReviveDeadMemoryCommand {
  constructor(public readonly request: IReviveDeadMemoryRequest) {}
}
