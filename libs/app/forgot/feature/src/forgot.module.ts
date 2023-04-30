import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CopyrightModule } from '@mp/app/copyright/ui';
import { ForgotPasswordModule as ForgotPasswordDataAccessModule } from '@mp/app/forgot/data-access';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ForgotPasswordPage } from './forgot.page';
import { ForgotPasswordRouting } from './forgot.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ForgotPasswordDataAccessModule,
    NgxsFormPluginModule,
    ForgotPasswordRouting,
    CopyrightModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ForgotPasswordPage],
})
export class ForgotPasswordModule {}
