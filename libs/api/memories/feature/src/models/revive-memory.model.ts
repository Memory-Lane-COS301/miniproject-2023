import {
  IReviveDeadMemory,
  ReviveDeadMemoryEvent,
  DeductAccountTimeEvent,
  OnlyIncreseMemoryTimeEvent,
} from '@mp/api/memories/util';
import { IncreseMemoryTimeEvent } from '@mp/api/memories/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class ReviveDeadMemory extends AggregateRoot implements IReviveDeadMemory {
  constructor(public userId: string, public memoryId: string, public secondsToAdd: number) {
    super();
  }

  static fromData(reviveMemory: IReviveDeadMemory): ReviveDeadMemory {
    const instance = new ReviveDeadMemory(reviveMemory.userId, reviveMemory.memoryId, reviveMemory.secondsToAdd);

    return instance;
  }

  deduct() {
    this.apply(new ReviveDeadMemoryEvent(this.toJSON()));
  }

  deductAccountTime() {
    this.apply(new DeductAccountTimeEvent(this.toJSON()));
  }

  OnlyIncreseMemoryTime() {
    this.apply(new OnlyIncreseMemoryTimeEvent(this.toJSON()));
  }

  IncreseMemoryTime() {
    this.apply(new IncreseMemoryTimeEvent(this.toJSON()));
  }

  toJSON(): IReviveDeadMemory {
    return {
      userId: this.userId,
      memoryId: this.memoryId,
      secondsToAdd: this.secondsToAdd,
    };
  }
}
