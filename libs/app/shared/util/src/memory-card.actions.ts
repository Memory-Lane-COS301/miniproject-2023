import { IComment, IMemory } from "@mp/api/memories/util";

export class GetCommentsRequest {
    static readonly type = '[MemoryCard] GetCommentsRequest';
    constructor(public readonly memory: IMemory) {}
}

export class CreateCommentRequest {
    static readonly type = '[MemoryCard] CreateCommentRequest';
    constructor(public readonly text: string) {}
}

export class UpdateCommentRequest {
    static readonly type = '[MemoryCard] UpdateCommentRequest';
    constructor(public readonly text: string) {}
}

export class SetMemoryCard {
    static readonly type = '[MemoryCard] SetMemoryCard';
    constructor(public memory: IMemory) {}
}