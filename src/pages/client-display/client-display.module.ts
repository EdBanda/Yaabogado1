import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientDisplayPage } from './client-display';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
@NgModule({
  declarations: [
    ClientDisplayPage,

  ],
  imports: [
    IonicPageModule.forChild(ClientDisplayPage),
  ],
})
export class ClientDisplayPageModule {}
