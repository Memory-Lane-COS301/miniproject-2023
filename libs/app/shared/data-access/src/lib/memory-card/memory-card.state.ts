// import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
// import { Injectable } from '@angular/core';
// import { AuthState } from '@mp/app/auth/data-access';
// import { SetError } from '@mp/app/errors/util';
// import produce from 'immer';
// import { ICreateCommentRequest, IGetCommentsRequest, IMemory } from '@mp/api/memories/util';
// import { IComment } from '@mp/api/memories/util';
// import { Timestamp } from 'firebase-admin/firestore';
// import { CreateCommentRequest, GetCommentsRequest, SetMemoryCard } from '@mp/app/shared/util';
// import { MemoryCardApi } from './memory-card.api';

// export interface MemoryCardStateModel {
//     memoryCard: IMemory;
// }

// @State<MemoryCardStateModel>({
//     name: 'memoryCard',
//     defaults: {
//         memory: {

//         }
//     },
// })

// @Injectable()
// export class MemoryCardState {
//     constructor(
//         private readonly memoryCardApi: MemoryCardApi,
//         private readonly store: Store
//     ){}

//     @Selector()
//     static memoryCard(state: MemoryCardStateModel) {
//         return state.memoryCard;
//     }

//     @Action(SetMemoryCard)
//     setProfile(ctx: StateContext<MemoryCardStateModel>, { memory }: SetMemoryCard) {
//         return ctx.setState(
//         produce((draft) => {
//             draft.memory = memory;
//         })
//         );
//     }

//     @Action(GetCommentsRequest)
//     getCommentsRequest(ctx: StateContext<MemoryCardStateModel>) {
//         try {
//             const state = ctx.getState();
//             const _userId = state.memoryCard.userId;

//             const _memoryId = state.memoryCard.memoryId;

//             const request: IGetCommentsRequest = {
//                 memory: {
//                     userId: _userId,
//                     memoryId: _memoryId
//                 }
//             }
//             const responseRef = await this.memoryCardApi.getComments(request);
//             const response = responseRef.data;
//             return ctx.dispatch(new SetMemoryCard(response.comments));
//         }
//         catch(error){
//             return ctx.dispatch(new SetError((error as Error).message));
//         }
//     }

//     @Action(CreateCommentRequest) 
//     async createCommentRequest(ctx: StateContext<MemoryCardStateModel>, action: CreateCommentRequest) {
//         try{
//             const state = ctx.getState();
//             const _userId = state.memoryCard.userId;
//             const _memoryId = state.memoryCard.memoryId;
//             const _text = action.comment.text;

//             const request : ICreateCommentRequest = { //data needs to be added
//                 comment: {
//                     userId: _userId,
//                     // memoryId: _memoryId,
//                     text: _text
//                 }
//             }

//             const responseRef = await this.memoryCardApi.createComment(request);
//             const response = responseRef.data;
            
//             state.memoryCard.comments?.push(response.comment);

//             const new_comments : IComment[] | null | undefined = state.memoryCard.comments;
//             return ctx.dispatch(new SetMemoryCard(new_comments));
//         }
//         catch (error) {
//             return ctx.dispatch(new SetError((error as Error).message));
//         }
//     }

//     // @Action(UpdateCommentRequest) 
//     // async updateCommentRequest(ctx: StateContext<MemoryCardStateModel>, action: UpdateCommentRequest) {
//     //     try{
//     //         const state = ctx.getState();

//     //         const request : IComment = { //data needs to be added
//     //             userId: '',
//     //             commentId: '',
//     //             username: '',
//     //             profileImgUrl: '',
//     //             text: '',
//     //             created: new Timestamp(0,0)
//     //         }

//     //         const responseRef = this.profileViewApi.updateComment(request);
//     //         const response = response.data;
//     //         return ctx.dispatch(new SetMemoryCard(response.profile));
//     //     }
//     //     catch (error) {
//     //         return ctx.dispatch(new SetError((error as Error).message));
//     //     }
//     // }