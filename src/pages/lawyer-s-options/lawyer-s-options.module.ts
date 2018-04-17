import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LawyerSOptionsPage } from './lawyer-s-options';
//import { LawyerSignUpPage } from '../lawyer-sign-up/lawyer-sign-up';
import { Profile1Page } from '../profile1/profile1';
@NgModule({
  declarations: [
    LawyerSOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(LawyerSOptionsPage),
  ],
})
export class LawyerSOptionsPageModule {}
