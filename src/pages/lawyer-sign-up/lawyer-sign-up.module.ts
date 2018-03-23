import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LawyerSignUpPage } from './lawyer-sign-up';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    LawyerSignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(LawyerSignUpPage),
    
  ],
})
export class LawyerSignUpPageModule {}
