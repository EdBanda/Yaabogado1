import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserpagePage } from '../pages/userpage/userpage';
import { LawyerSignUpPage } from '../pages/lawyer-sign-up/lawyer-sign-up';
import { ClientDisplayPage } from '../pages/client-display/client-display';
import { LawyerNavigation1Page } from '../pages/lawyer-navigation1/lawyer-navigation1';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserpagePage,
    LawyerSignUpPage,
    ClientDisplayPage,
    LawyerNavigation1Page
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserpagePage,
    LawyerSignUpPage,
    ClientDisplayPage,
    LawyerNavigation1Page
    
  ],
  providers: [
    StatusBar,
   
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}