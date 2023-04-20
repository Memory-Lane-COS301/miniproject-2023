import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { FeedApi } from "./feed.api";
import { SetFeed } from "@mp/app/feed/util";
import { IGetUserRequest, IUser } from "@mp/api/users/util";
import { IMemory } from "@mp/api/memories/util";
import { state } from "@angular/animations";

export interface FeedStateModel {
    // users: IUser[];
    memories: IMemory[];
}

@State<FeedStateModel>({
    name: 'feed',
    defaults: {
        // users: []
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

    // @Action(GetMemoryRequest)
    // async getUserRequest(ctx: StateContext<FeedStateModel>) {
    //     try {
    //         const state = ctx.getState();
    //         // const _userId = state.users[0]?.userId;
    //         // const _username = state.users[0]?.username;
    //         const _memory = state.memories[0];

    //         const request: IGetMemoryRequest = {
    //             memory: {
    //                 userId,
    //                 username,
    //                 title,
    //                 description,
    //                 imgUrl,
    //                 profileImgUrl,
    //                 remainingTime,
    //                 commentsCount,
    //                 comments,
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

    @Action(SetFeed)
    setFeed(ctx: StateContext<FeedStateModel>, { memory }: SetFeed) {
        const state = ctx.getState();
        return ctx.setState(
        produce((draft) => {
            draft.memories = [...state.memories, memory];
        })
        );
    }
}
