import { IComment, IMemory } from "@mp/api/memories/util";

export class SetViewedComments {
    static readonly type = '[ViewedComments] SetViewedComments';
    constructor(public readonly memory: IMemory) {}
}

export class CreateCommentRequest {
    static readonly type = '[ViewComments] CreateCommentsRequest';
    constructor(public readonly text: string) {}
}

export class UpdateCommentRequest {
    static readonly type = '[ViewComments] UpdateCommentRequest';
    constructor(public readonly comment: IComment) {}
}