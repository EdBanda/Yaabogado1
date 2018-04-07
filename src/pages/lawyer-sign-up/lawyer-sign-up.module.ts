import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LawyerSignUpPage } from './lawyer-sign-up';
import { CallNumber } from '@ionic-native/call-number';
import { User } from '../../modules/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ClientDisplayPage } from '../client-display/client-display';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AboutPage } from '../about/about';
@NgModule({
  declarations: [
    LawyerSignUpPage,
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(LawyerSignUpPage),
    
  ],
})
export class LawyerSignUpPageModule {}
