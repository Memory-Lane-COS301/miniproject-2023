import { IMemory } from "@mp/api/memories/util"

// export class GetUserRequest {
//     static readonly type = '[SearchPage] GetUserRequest';
// }

export class SetSearchPage {
    static readonly type = '[SearchPage] SetFeed';
    constructor(public readonly memories: IMemory) {}
}