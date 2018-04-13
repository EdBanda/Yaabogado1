import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientDisplayPage } from './client-display';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
//import { AboutPage } from '../about/about';

@NgModule({
  declarations: [
   // AboutPage,
    ClientDisplayPage,

  ],
  imports: [
    IonicPageModule.forChild(ClientDisplayPage),
  ],
})
export class ClientDisplayPageModule {}
