import { IMemory } from '@mp/api/memories/util';
import { IComment } from '@mp/api/comments/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class Memory extends AggregateRoot implements IMemory {
  constructor(
    public userId: string | null | undefined,
    public displayName: string | null | undefined,
    public title: string | null | undefined,
    public description: string | null | undefined,
    public created: Timestamp | null | undefined,
    public imgUrl: string | null | undefined,
    public alive: boolean | null | undefined,
    public time: number | null | undefined,
    public comments: IComment[] | null | undefined,
  ) {
    super();
  }

  //TODO implement
  create() {
    return null;
  }
  static fromData(memory: IMemory): Memory {
    const instance = new Memory(
      memory.userId,
      memory.displayName,
      memory.title,
      memory.description,
      memory.created,
      memory.imgUrl,
      memory.alive,
      memory.time,
      memory.comments,
    );

    return instance;
  }

  toJSON(): IMemory {
    return {
      userId: this.userId,
      displayName: this.displayName,
      title: this.title,
      description: this.description,
      created: this.created,
      imgUrl: this.imgUrl,
      alive: this.alive,
      time: this.time,
      comments: this.comments,
    };
  }
}
