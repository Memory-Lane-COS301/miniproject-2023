import { Action, Selector, State, StateContext, StateOperator, Store } from '@ngxs/store';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { ICreateMemoryRequest, ICreateMemoryResponse } from "@mp/api/memories/util";
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { AddMemoryApi } from './add-memory.api';
import { IMemory } from '@mp/api/memories/util';
import { IProfile } from '@mp/api/profiles/util';
import { SetProfileView } from '@mp/app/profile-view/util';
import { CreateMemory } from "@mp/app/shared/util";
import { SetFeed } from '@mp/app/feed/util';
import { state } from '@angular/animations';

export interface AddMemoryStateModel {
    memory: IMemory;
}

@State<AddMemoryStateModel>({
    name: 'addMemory',
    defaults: {
        memory: {
            userId: null,
            memoryId: null,
            username: null,
            title: null,
            description: null,
            imgUrl: null,
            profileImgUrl: null,
            created: null,
            commentsCount: null,
            remainingTime: null,
            alive: false,
            comments: []
        }
    },
})

@Injectable()
export class AddMemoryState {
    constructor(
        private readonly addMemoryApi: AddMemoryApi,
        private readonly store: Store
    ){}

    @Selector()
    static createMemory(state: AddMemoryStateModel) {
        return state.memory;
    }

    // @Action(SetProfileView)
    // setProfile(ctx: StateContext<AddMemoryStateModel>, { profile }: SetProfileView) {
    //     ctx.patchState(
    //         profile.memories
    //     )
    // }
    @Action(CreateMemory)
    async createMemory(ctx: StateContext<AddMemoryStateModel>, { memory }: CreateMemory) {
        try {
            const _userId = memory.userId;
            const _title = memory.title;
            const _description = memory.description;
            const _imgUrl = memory.imgUrl;

            const request: ICreateMemoryRequest = {
                memory: {
                    userId: _userId,
                    title: _title,
                    description: _description,
                    imgUrl: _imgUrl,
                }
            }
            const responseRef = await this.addMemoryApi.createMemory(request);
            const response = responseRef.data;
            return ctx.dispatch([
                new SetFeed(response.memory),
                new SetProfileView(response.memory?.userId ?? '', undefined, response.memory, undefined)
            ]);
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }
}
