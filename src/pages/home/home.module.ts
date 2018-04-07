import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ClientDisplayPage } from '../client-display/client-display';
@NgModule({
  declarations: [
    HomePage,
    ClientDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}