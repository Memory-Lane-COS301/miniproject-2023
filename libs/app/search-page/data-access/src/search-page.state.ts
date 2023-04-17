import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { SetFeed } from "@mp/app/feed/util";
import { IGetUserRequest, IUser } from "@mp/api/users/util";
import { IMemory } from "@mp/api/memories/util";
import { SearchPageApi } from "./search-page.api";

// export interface FeedStateModel {
//     // users: IUser[];
//     memories: IMemory[];
// }

// @State<FeedStateModel>({
//     name: 'feed',
//     defaults: {
//         // users: []
//         memories: []
//     },
// })

@Injectable()
export class SearchPageState {
    constructor(
        private readonly feedApi: SearchPageApi,
        private readonly store: Store
    ){}
}