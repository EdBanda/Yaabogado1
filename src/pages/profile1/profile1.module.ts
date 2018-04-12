import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profile1Page } from './profile1';
import { AboutPage }  from '../about/about';
import { LawyerSignUpPage } from '../lawyer-sign-up/lawyer-sign-up';

@NgModule({
  declarations: [
    Profile1Page,
  ],
  imports: [
    IonicPageModule.forChild(Profile1Page),
  ],
})
export class Profile1PageModule {}
