import { Injectable } from '@angular/core';
import { ForgotPassword as AuthForgotPassword } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { ForgotPassword } from '@mp/app/forgot/util';
import { Action, State, StateContext } from '@ngxs/store';

export interface ForgotPasswordStateModel {
  forgotPasswordForm: {
    model: {
      email: string | null;
      password: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<ForgotPasswordStateModel>({
  name: 'forgotPassword',
  defaults: {
    forgotPasswordForm: {
      model: {
        email: null,
        password: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class ForgotPasswordState {
  @Action(ForgotPassword)
  async forgotPassword(ctx: StateContext<ForgotPasswordStateModel>) {
    try {
      const state = ctx.getState();
      const email = state.forgotPasswordForm.model.email;
      const password = state.forgotPasswordForm.model.password;

      if (email && password) {
        return ctx.dispatch(new AuthForgotPassword(email, password));
      }
      return ctx.dispatch(new SetError('Email and password not set'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
