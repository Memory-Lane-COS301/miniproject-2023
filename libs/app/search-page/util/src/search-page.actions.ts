import { IProfile } from "@mp/api/profiles/util";

export class SearchMemories {
    static readonly type = '[SearchPage] SearchMemories';
    constructor(public readonly searchQuery: string) {}
}

export class GetFeedMemories {
  static readonly type = '[SearchPage] GetFeedMemories';
}

export class SetSearchPage {
  static readonly type = '[SearchPage] SetSearchResults';
  constructor(public readonly profile: IProfile) {}
}