import { IMemory, IComment } from '@mp/api/memories/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Memory extends AggregateRoot implements IMemory {
  constructor(
    public userId: string,
    public username: string | null | undefined,
    public profileUrl: string | null | undefined,
    public imgUrl: string,
    public title: string,
    public description: string,
    public comments: IComment[] | null | undefined,
    public timePosted: string,
    public alive: boolean,
    public time: number,
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
      memory.username,
      memory.profileUrl,
      memory.imgUrl,
      memory.title,
      memory.description,
      memory.comments,
      memory.timePosted,
      memory.alive,
      memory.time,
    );

    return instance;
  }

  toJSON(): IMemory {
    return {
      userId: this.userId,
      username: this.username,
      imgUrl: this.imgUrl,
      title: this.title,
      description: this.description,
      comments: this.comments,
      timePosted: this.timePosted,
      alive: this.alive,
      time: this.time,
    };
  }
}
