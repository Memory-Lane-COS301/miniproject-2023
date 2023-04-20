import { IMemory } from "@mp/api/memories/util";

export class SetViewedComments {
    static readonly type = '[ViewedComments] SetViewedComments';
    constructor(public readonly memory: IMemory) {}
}