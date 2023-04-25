import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthState } from '@mp/app/auth/data-access';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { ICreateCommentRequest, IGetCommentsRequest, IMemory, IUpdateCommentRequest } from '@mp/api/memories/util';
import { IComment } from '@mp/api/memories/util';
import { Timestamp } from 'firebase-admin/firestore';
import { CreateCommentRequest, GetCommentsRequest, SetMemoryCard, UpdateCommentRequest } from '@mp/app/shared/util';
import { MemoryCardApi } from './memory-card.api';
import { SetViewedComments } from '@mp/app/view-comments/util';

export interface MemoryCardStateModel {
  memoryCard: IMemory;
}

@State<MemoryCardStateModel>({
  name: 'memoryCard',
  defaults: {
    memoryCard: {
      userId: '',
      memoryId: '',
      username: '',
      title: '',
      description: '',
      imgUrl: '',
      profileImgUrl: '',
      created: null,
      commentsCount: null,
      remainingTime: null,
      alive: null,
      comments: null,
    },
  },
})
@Injectable()
export class MemoryCardState {
  constructor(private readonly memoryCardApi: MemoryCardApi, private readonly store: Store) {}

  @Selector()
  static memoryCard(state: MemoryCardStateModel) {
    return state.memoryCard;
  }

  @Action(SetMemoryCard)
  setProfile(ctx: StateContext<MemoryCardStateModel>, { memory }: SetMemoryCard) {
    return ctx.setState(
      produce((draft) => {
        draft.memoryCard = memory;
      }),
    );
  }

  @Action(GetCommentsRequest)
  async getCommentsRequest(ctx: StateContext<MemoryCardStateModel>) {
    try {
      const state = ctx.getState();
      const _userId = state.memoryCard.userId;

      const _memoryId = state.memoryCard.memoryId;

      const request: IGetCommentsRequest = {
        memory: {
          userId: _userId,
          memoryId: _memoryId,
        },
      };
      const responseRef = await this.memoryCardApi.getComments(request);
      const response: IMemory = {
        ...state.memoryCard,
        comments: responseRef.data.comments,
      };

      return ctx.dispatch([new SetMemoryCard(response), new SetViewedComments(response)]);
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(CreateCommentRequest)
  async createCommentRequest(ctx: StateContext<MemoryCardStateModel>, action: CreateCommentRequest) {
    try {
      const state = ctx.getState();
      const _userId = state.memoryCard.userId;
      const _memoryId = state.memoryCard.memoryId;
      const _text = action.comment.text;

      const request: ICreateCommentRequest = {
        comment: {
          userId: _userId,
          memoryId: _memoryId,
          text: _text,
        },
      };

      const responseRef = await this.memoryCardApi.createComment(request);
      state.memoryCard.comments?.push(responseRef.data.comment);

      const response: IMemory = {
        ...state.memoryCard,
        comments: state.memoryCard.comments,
      };

      return ctx.dispatch(new SetMemoryCard(response));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateCommentRequest)
  async updateCommentRequest(ctx: StateContext<MemoryCardStateModel>, action: UpdateCommentRequest) {
    try {
      const state = ctx.getState();
      const _userId = state.memoryCard.userId;
      const _memoryId = state.memoryCard.memoryId;
      const _text = action.comment.text;

      const request: IUpdateCommentRequest = {
        comment: {
          userId: _userId,
          memoryId: _memoryId,
          text: _text,
        },
      };

      const responseRef = await this.memoryCardApi.updateComment(request);
      state.memoryCard.comments?.push(responseRef.data.comment);

      const response: IMemory = {
        ...state.memoryCard,
        comments: state.memoryCard.comments,
      };

      return ctx.dispatch(new SetMemoryCard(response));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
