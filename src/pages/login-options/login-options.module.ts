import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOptionsPage } from './login-options';
import { ClientDisplayPage } from '../client-display/client-display';
import { LawyerSOptionsPage } from '../lawyer-s-options/lawyer-s-options';
import { LawyerSignUpPage } from '../lawyer-sign-up/lawyer-sign-up';

@NgModule({
  declarations: [
    LoginOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginOptionsPage),
  ],
})
export class LoginOptionsPageModule {}
