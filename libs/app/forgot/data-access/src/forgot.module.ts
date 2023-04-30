import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ForgotPasswordState } from './forgot.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ForgotPasswordState])],
})
export class ForgotPasswordModule {}
