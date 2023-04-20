import { IMemory } from "@mp/api/memories/util"

export class GetUserRequest {
    static readonly type = '[Feed] GetUserRequest';
}

export class SetFeed {
    static readonly type = '[Feed] SetFeed';
    constructor(public readonly memory: IMemory) {}
}