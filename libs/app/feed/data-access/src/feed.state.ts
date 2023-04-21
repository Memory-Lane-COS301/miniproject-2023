import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { FeedApi } from "./feed.api";
import { SetFeed } from "@mp/app/feed/util";
import { IGetUserRequest, IUser } from "@mp/api/users/util";
import { IMemory } from "@mp/api/memories/util";

export interface FeedStateModel {
    memories: IMemory[];
}

@State<FeedStateModel>({
    name: 'feed',
    defaults: {
        memories: []
    },
})

@Injectable()
export class FeedState {
    constructor(
        private readonly feedApi: FeedApi,
        private readonly store: Store
    ){}

    @Selector()
    static feed(state: FeedStateModel) {
        return state.memories;
    }

    // @Action(GetFeedMemories)
    // async getFeedMemories(ctx: StateContext<FeedStateModel>) {
    //     try {
    //         const state = ctx.getState();
    //         // const _userId = state.users[0]?.userId;
    //         // const _username = state.users[0]?.username;
    //         const _memory = state.memories;

    //         const request: IGetFeedMemoriesRequest = {
    //             user: {
    //                 userId: ''
    //             }
    //         }
    //         const responseRef = await this.feedApi.getFriendsMemories(request);
    //         const response = responseRef.data;
    //         return ctx.dispatch(new SetFeed(response.memories));
    //     }
    //     catch(error){
    //         return ctx.dispatch(new SetError((error as Error).message));
    //     }
    // }

    // @Action(SetFeed)
    // setFeed(ctx: StateContext<FeedStateModel>, { memories }: SetFeed) {
    //     return ctx.setState(
    //     produce((draft) => {
    //         draft.memories = memories;
    //     })
    //     );
    // }
}
