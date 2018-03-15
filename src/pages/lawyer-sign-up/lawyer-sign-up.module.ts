import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LawyerSignUpPage } from './lawyer-sign-up';

@NgModule({
  declarations: [
    LawyerSignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(LawyerSignUpPage),
  ],
})
export class LawyerSignUpPageModule {}
