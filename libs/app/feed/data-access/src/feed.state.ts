import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { FeedApi } from "./feed.api";
import { AddMemoryToFeedPage, GetFeedMemories, SetFeed } from "@mp/app/feed/util";
import { IMemory } from "@mp/api/memories/util";
import { AuthState } from '@mp/app/auth/data-access';
import { IGetFeedMemoriesRequest } from "@mp/api/memories/util";

export interface FeedStateModel {
  memories: IMemory[];
}

@State<FeedStateModel>({
  name: 'feed',
  defaults: {
    memories: [],
  },
})
@Injectable()
export class FeedState {
  constructor(private readonly feedApi: FeedApi, private readonly store: Store) {}

    @Selector()
    static memories(state: FeedStateModel) {
        return state.memories;
    }

    @Action(GetFeedMemories)
    async getFeedMemories(ctx: StateContext<FeedStateModel>) {
        try {
            const authState = this.store.selectSnapshot(AuthState);

            if (!authState.user.uid)
                return ctx.dispatch(new SetError('User not set'));

            const request: IGetFeedMemoriesRequest = {
                user: {
                    userId: authState.user.uid
                }
            };

            const responseRef = await this.feedApi.getFeedMemories(request);
            const response = responseRef.data;
            return ctx.dispatch(new SetFeed(response.memories));
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    @Action(SetFeed)
    setFeed(ctx: StateContext<FeedStateModel>, { memories }: SetFeed) {
        return ctx.setState(
            produce((draft) => {
                draft.memories = memories;
            })
        );
    }

    @Action(AddMemoryToFeedPage) 
    addMemory(ctx: StateContext<FeedStateModel>, { memory } : AddMemoryToFeedPage) {
        try{
            const state = ctx.getState();

            const response :IMemory[] = [
                ...state.memories,
                memory
            ];

            return this.store.dispatch(new SetFeed(response));
        }
        catch (error) {
            return this.store.dispatch(new SetError('Unable to add memory to feed page.'));
        }
    }
}

