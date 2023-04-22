import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { IProfile, IGetProfileRequest } from '@mp/api/profiles/util';
import { SetDeadMemories, SetReviveMemoryState, SetReviveMemoryUserId } from '@mp/app/profile-view/util';
import { Injectable } from '@angular/core';
import { AuthState } from '@mp/app/auth/data-access';
import { SetError } from '@mp/app/errors/util';
import { ProfileViewApi } from './profile-view.api';
import produce from 'immer';
import { IMemory } from '@mp/api/memories/util';
import { IComment } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';
import { ReviveMemoryApi } from './revive-memory.api';

export interface ReviveMemoryStateModel {
  memories: IMemory[] | null;
  userId: string | null | undefined;
}

@State<ReviveMemoryStateModel>({
  name: 'reviveMemory',
  defaults: {
    memories: [],
    userId: null,
  },
})
@Injectable()
export class ReviveMemoryState {
  constructor(private readonly reviveMemoryApi: ReviveMemoryApi, private readonly store: Store) {}

  @Selector()
  static deadMemories(state: ReviveMemoryStateModel) {
    return state.memories;
  }

  // @Action(ReviveMemory)
  // async reviveMemory(ctx: StateContext<ReviveMemoryStateModel>, { memory } : ReviveMemory) {
  //     try {
  //         const _userId = memory.userId;

  //         const request: IReviveMemoryRequest = {
  //             memory: {
  //                 userId: _userId,
  //                 memoryId: memory.memoryId
  //             }
  //         }
  //         const responseRef = await this.reviveMemoryApi.reviveMemory(request);
  //         const response = responseRef.data;

  //         memory = {
  //             ...memory,
  //             alive: true
  //         }
  //         return ctx.dispatch([
  //             new AddNewMemory(memory),
  //             new SetReviveMemoryState(memory, _userId)
  //         ]);
  //     }
  //     catch(error){
  //         return ctx.dispatch(new SetError((error as Error).message));
  //     }
  // }

  @Action(SetReviveMemoryUserId)
  setUserId(ctx: StateContext<ReviveMemoryStateModel>, { id }: SetReviveMemoryUserId) {
    try {
      const state = ctx.getState();
      const memories = state.memories;
      const userId = id;

      return this.store.dispatch(new SetReviveMemoryState(memories, userId));
    } catch (error) {
      return this.store.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(SetReviveMemoryState)
  setRevivedMemoryState(ctx: StateContext<ReviveMemoryStateModel>, { memories, userId }: SetReviveMemoryState) {
    return ctx.setState(
      produce((draft) => {
        draft.memories = memories;
        draft.userId = userId;
      }),
    );
  }

  @Action(SetDeadMemories)
  setDeadMemories(ctx: StateContext<ReviveMemoryStateModel>, { memory }: SetDeadMemories) {
    try {
      const state = ctx.getState();
      const memories: IMemory[] = [];

      state.memories?.map((mem) => {
        if (mem.memoryId != memory?.memoryId) {
          memories.push(mem);
        }
      });

      return this.store.dispatch(new SetReviveMemoryState(memories, state.userId));
    } catch (error) {
      return this.store.dispatch(new SetError((error as Error).message));
    }
  }
}
