import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { IProfile, IGetProfileRequest } from "@mp/api/profiles/util"
import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { UserViewApi } from './user-view.api';
import { 
    GetUserProfileRequest,
    SetUserView
} from '@mp/app/user-view/util';
import produce from 'immer';
import { IMemory } from '@mp/api/memories/util';

export interface UserViewStateModel {
    userProfile: IProfile;
}

@State<UserViewStateModel>({
    name: 'userview',
    defaults: {
        userProfile: {
            user: null,
            memories: [],

            userId: '',
            accountDetails: null,
            personalDetails:null,
            contactDetails: null,
            addressDetails: null,
            occupationDetails: null,
            status: null,
            created: null,

        }
    },
})

@Injectable()
export class UserViewState {
    constructor(
        private readonly userViewApi: UserViewApi,
        private readonly store: Store
    ){}

    @Selector()
    static userView(state: UserViewStateModel) {
        return state.userProfile;
    }

    @Action(GetUserProfileRequest) //GetUserProfileRequest is the same as the GetProfileRequest
    async getUserProfileRequest(ctx: StateContext<UserViewStateModel>, { user }: GetUserProfileRequest) {
        try {
            const _userId = user.userId;
            const _username = user.username;

            const request: IGetProfileRequest = {
                user: {
                    userId: _userId,
                    username: _username
                }
            }
            const responseRef = await this.userViewApi.getUserProfile(request);
            const response = responseRef.data;
            return ctx.dispatch(new SetUserView(response.profile));
        }
        catch(error){
            return ctx.dispatch(new SetError((error as Error).message));
        }
    }

    // @Action(CreateFriendRequest)
    // async createFriendRequest(ctx: StateContext<UserViewStateModel>, ) // !!! How do we pass in the sender's ID?? 

    // @Action(UpdateFriendRequest)
    // async updateFriendRequest(ctx: StateContext<UserViewStateModel>, status: string)
    // {

    // }
}