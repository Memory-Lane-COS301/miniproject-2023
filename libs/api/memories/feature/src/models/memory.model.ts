import { 
  IMemory, 
  MemoryCreatedEvent, 
  IComment } from '@mp/api/memories/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class Memory extends AggregateRoot implements IMemory {
  constructor(
    public userId?: string | null | undefined,
    public username?: string | null | undefined,
    public title?: string | null | undefined,
    public description?: string | null | undefined,
    public imgUrl?: string | null | undefined,
    public profileImgUrl?: string | null | undefined,
    public created?: Timestamp | null | undefined,
    public commentsCount?: number | null | undefined,
    public remainingTime?: number | null | undefined,
    public alive?: boolean | null | undefined,
    public comments?: IComment[] | null | undefined,
  ) {
    super();
  }
  
  create() {
    this.apply(new MemoryCreatedEvent(this.toJSON()));
  }
  static fromData(memory: IMemory): Memory {
    const instance = new Memory(
      memory.userId,
      memory.username,
      memory.title,
      memory.description,
      memory.imgUrl,
      memory.profileImgUrl,
      memory.created,
      memory.commentsCount,
      memory.remainingTime,
      memory.alive,
      memory.comments,
    );

    return instance;
  }

  toJSON(): IMemory {
    return {
      userId: this.userId,
      username: this.username,
      title: this.title,
      description: this.description,
      imgUrl: this.imgUrl,
      profileImgUrl: this.profileImgUrl,
      created: this.created,
      commentsCount: this.commentsCount,
      remainingTime: this.remainingTime,
      alive: this.alive,
      comments: this.comments,
    };
  }
}