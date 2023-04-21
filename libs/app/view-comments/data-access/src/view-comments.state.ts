import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { IComment } from '@mp/api/memories/util';
import { SetViewedComments } from '@mp/app/view-comments/util';

export interface ViewedCommentsStateModel {
    viewedComments: IComment[] | null | undefined;
}

@State<ViewedCommentsStateModel>({
    name: 'viewedComments',
    defaults: {
        viewedComments: []
    }
})

@Injectable()
export class ViewedCommentsState {
    constructor(
        // private readonly viewedCommentsApi: ViewCommentsApi,
        private readonly store: Store
    ) {}

    @Selector()
    static viewedComments(state: ViewedCommentsStateModel) {
        return state.viewedComments;
    }

    @Action(SetViewedComments)
    setViewedComments(ctx : StateContext<ViewedCommentsStateModel>, { memory } : SetViewedComments) {
        return ctx.setState(
            produce((draft) => {
                draft.viewedComments = memory.comments;
            })
        );
    }
}