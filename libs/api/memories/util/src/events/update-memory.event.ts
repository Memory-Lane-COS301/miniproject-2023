import { IUser } from "@mp/api/users/util";

export class MemoryUpdatedEvent{ 
    constructor(public readonly user:IUser){}
}