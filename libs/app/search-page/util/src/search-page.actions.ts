import { IMemory } from "@mp/api/memories/util";

export class SearchMemories {
  static readonly type = '[SearchPage] SearchMemories';
  constructor(public readonly searchQuery: string) {}
}

export class GetSearchPageMemories {
  static readonly type = '[SearchPage] GetSearchPageMemories';
}

export class SetSearchPage {
  static readonly type = '[SearchPage] SetSearchPage';
  constructor(public readonly memories: IMemory[]) {}
}

export class AddNewSearchValue {
  static readonly type = '[SearchPage] AddNewSearchValue';
  constructor(public readonly searchValue: string) {}
}

export class GetSearchResults {
  static readonly type = '[SearchPage] GetSearchResults';
  constructor(public readonly searchValue: string) {}
}

export class GetFeedMemories {
  static readonly type = '[SearchPage] GetFeedMemories';
}
