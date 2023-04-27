import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { IComment, ICreateCommentRequest, IMemory, IUpdateCommentRequest } from '@mp/api/memories/util';
import { SetViewedComments, CreateCommentRequest, UpdateCommentRequest } from '@mp/app/view-comments/util';
import { ViewedCommentsApi } from './view-comments.api';
import { SetMemoryCard } from '@mp/app/shared/util';

export interface ViewedCommentsStateModel {
  viewedComments: IComment[] | null | undefined;
  memory: IMemory | null | undefined;
}

@State<ViewedCommentsStateModel>({
  name: 'viewedComments',
  defaults: {
    viewedComments: [],
    memory: null,
  },
})
@Injectable()
export class ViewedCommentsState {
  constructor(private readonly viewedCommentsApi: ViewedCommentsApi, private readonly store: Store) {}

  @Selector()
  static viewedComments(state: ViewedCommentsStateModel) {
    return state.viewedComments;
  }

  @Action(SetViewedComments)
  setViewedComments(ctx: StateContext<ViewedCommentsStateModel>, { memory }: SetViewedComments) {
    return ctx.setState(
      produce((draft) => {
        draft.viewedComments = memory.comments;
      }),
    );
  }

  @Action(CreateCommentRequest) 
  async createCommentRequest(ctx: StateContext<ViewedCommentsStateModel>, { text }: CreateCommentRequest) {
      try{
          const state = ctx.getState();
          const _userId = state.memory?.userId;
          const _memoryId = state.memory?.memoryId;
          const _text = text;

          const request : ICreateCommentRequest = {
              comment: {
                  userId: _userId,
                  memoryId: _memoryId,
                  text: _text
              }
          }

          const responseRef = await this.viewedCommentsApi.createComment(request);
          state.memory?.comments?.push(responseRef.data.comment);

          const response : IMemory = {
              ...state.memory,
              comments: state.memory?.comments
          };
          
          return ctx.dispatch([new SetViewedComments(response) ,new SetMemoryCard(response)]);
      }
      catch (error) {
          return ctx.dispatch(new SetError((error as Error).message));
      }
  }

  @Action(UpdateCommentRequest) 
  async updateCommentRequest(ctx: StateContext<ViewedCommentsStateModel>, { text }: UpdateCommentRequest) {
      try{
          const state = ctx.getState();
          const _userId = state.memory?.userId;
          const _memoryId = state.memory?.memoryId;
          const _text = text;

          const request : IUpdateCommentRequest = {
              comment: {
                  userId: _userId,
                  memoryId: _memoryId,
                  text: _text
              }
          }

          const responseRef = await this.viewedCommentsApi.updateComment(request);
          state.memory?.comments?.push(responseRef.data.comment);

          const response : IMemory = {
              ...state.memory,
              comments: state.memory?.comments
          };
          
          return ctx.dispatch([new SetViewedComments(response) ,new SetMemoryCard(response)]);
      }
      catch (error) {
          return ctx.dispatch(new SetError((error as Error).message));
      }
  }
}
