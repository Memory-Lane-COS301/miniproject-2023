import { IMemory } from "@mp/api/memories/util";
import { IProfile } from "@mp/api/profiles/util";

export class CreateMemory {
    static readonly type = '[AddMemory] Add Memory';
    constructor(public memory: IMemory) {}
}

// export class SetFeed {
//     static readonly type = '[AddMemory] SetFeed';
//     constructor(public readonly memories: IMemory) {}
// }

// export class SetProfileView {
//     static readonly type = '[SetProfileView] SetProfileView';
//     constructor(
//         public readonly id: string,
//         public readonly profile?: IProfile,
//         public readonly memory?: IMemory
//     ) {}
// }
