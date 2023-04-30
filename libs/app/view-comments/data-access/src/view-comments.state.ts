import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { IComment, ICreateCommentRequest, IMemory, IUpdateCommentRequest } from '@mp/api/memories/util';
import { 
  SetViewedComments,
  CreateCommentRequest,
  UpdateCommentRequest,
  SubscribeToMemoryComments,
} from '@mp/app/view-comments/util';
import { ViewedCommentsApi } from './view-comments.api';
import { SetMemoryCard } from '@mp/app/shared/util';
import { tap } from 'rxjs';
import { AuthState } from '@mp/app/auth/data-access';
import { GetFeedMemories } from '@mp/app/feed/util';

export interface ViewedCommentsStateModel {
  viewedComments: IComment[];
  memory: IMemory | null | undefined;
  memoryId: string;
}

@State<ViewedCommentsStateModel>({
  name: 'viewedComments',
  defaults: {
    viewedComments: [],
    memory: null,
    memoryId: '',
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
        draft.viewedComments = memory.comments || [];
      }),
    );
  }

  @Action(CreateCommentRequest) 
  async createCommentRequest(ctx: StateContext<ViewedCommentsStateModel>, { text }: CreateCommentRequest) {
      try{
          const state = ctx.getState();
          const authState = this.store.selectSnapshot(AuthState);
          const userId = authState.user.uid;
          const memoryId = state.memoryId;

          if (!text)
            return this.store.dispatch(new SetError('No comment to send'));

          if (!userId || !memoryId)
            return this.store.dispatch(new SetError('Oops, something went wrong'));

          const request : ICreateCommentRequest = {
              comment: {
                  userId: userId,
                  memoryId: memoryId,
                  text: text
              }
          }

          const responseRef = await this.viewedCommentsApi.createComment(request);
          // return ctx.patchState({ viewedComments: [...state.viewedComments, responseRef.data.comment] })

          ctx.dispatch(new GetFeedMemories())
          return;
          // state.memory?.comments?.push(responseRef.data.comment);

          // const response : IMemory = {
          //     ...state.memory,
          //     comments: state.memory?.comments
          // };
          
          // return ctx.dispatch([new SetViewedComments(response) ,new SetMemoryCard(response)]);
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

  @Action(SubscribeToMemoryComments) 
  async subscribeToMemoryComments(ctx: StateContext<ViewedCommentsStateModel>, { memoryId }: SubscribeToMemoryComments) {
      try{
        const authState = this.store.selectSnapshot(AuthState);
        ctx.patchState({ memoryId: memoryId });
        return this.viewedCommentsApi.comments$(memoryId, authState.user.userId)
        .pipe(tap((comments: IComment[]) =>  { 
          ctx.patchState(
          {viewedComments: comments.sort((a, b) => {
            if (!a.created?.seconds || !b.created?.seconds)
              return 0;
            
            return a.created.seconds - b.created.seconds;
          })})}));
      } catch (error) {
          return ctx.dispatch(new SetError("Could not retrieve comments"));
      }
  }
}
