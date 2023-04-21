import { IMemory } from "@mp/api/memories/util";
import { IProfile } from "@mp/api/profiles/util";
import { IUser } from "@mp/api/users/util";

export class ReviveMemory {
    static readonly type = '[ReviveMemory] Revive Memory';
    constructor(public readonly memory: IMemory) {}
}

export class SetReviveMemoryUserId {
    static readonly type = '[ReviveMemory] SetReviveMemoryUserId';
    constructor(public readonly id: string | null) {}
}

export class SetReviveMemoryState {
    static readonly type = '[ReviveMemory] SetReviveMemoryState';
    constructor(public readonly memories: IMemory[] | null , public readonly userId: string | null | undefined) {}
}

export class SetDeadMemories {
    static readonly type = '[ReviveMemory] SetDeadMemories';
    constructor(public readonly memory: IMemory | null | undefined) {}
}