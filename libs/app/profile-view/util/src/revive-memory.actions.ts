import { IMemory } from "@mp/api/memories/util";
import { IProfile } from "@mp/api/profiles/util";

export class ReviveMemory {
    static readonly type = '[ReviveMemory] Revive Memory';
    constructor(public memory: IMemory) {}
}