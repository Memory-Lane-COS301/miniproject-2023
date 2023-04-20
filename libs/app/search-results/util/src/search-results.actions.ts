import { IMemory } from "@mp/api/memories/util";

export class SetSearchResults {
  static readonly type = '[SearchResults] SetSearchResults';
  constructor(public readonly searchResults: IMemory[]) {}
}

export class ClearSearchResults {
  static readonly type = '[SearchResults] ClearSearchResults';
}
