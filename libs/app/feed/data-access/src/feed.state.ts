import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { FeedApi } from "./feed.api";
import { IProfile } from '@mp/api/profiles/util';

export interface FeedStateModel {
    user: IProfile;
}


@Injectable()
export class FeedState {
    constructor(
        private readonly feedApi: FeedApi,
        private readonly store: Store
    ){}
}