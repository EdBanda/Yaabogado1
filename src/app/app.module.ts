import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireAuth } from 'angularfire2/auth';
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LawyerSignUpPage } from '../pages/lawyer-sign-up/lawyer-sign-up';
import { ClientDisplayPage } from '../pages/client-display/client-display';

import { FirebaseProvider } from '../providers/firebase/firebase';
import {FormsModule} from '@angular/forms'
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { LawyerSOptionsPage } from '../pages/lawyer-s-options/lawyer-s-options';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { AboutPage } from '../pages/about/about';
import { Profile1Page } from '../pages/profile1/profile1';
//Conection to the Firebase Database


  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyD7yx4wQj80cHLb_XNWXPNl9gioKwCKeuI",
    authDomain: "abogadoya-96fb3.firebaseapp.com",
    databaseURL: "https://abogadoya-96fb3.firebaseio.com",
    projectId: "abogadoya-96fb3",
    storageBucket: "",
    messagingSenderId: "462067038190"
  };




  


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    
    AboutPage,
    LawyerSignUpPage,
   ClientDisplayPage,
   LoginOptionsPage,
   LawyerSOptionsPage,
   Profile1Page
   

    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    
    LawyerSignUpPage,
   ClientDisplayPage,
   LoginOptionsPage,
   LawyerSOptionsPage,
   Profile1Page 
    
    
  ],
  providers: [
    StatusBar,
    CallNumber,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    FirebaseProvider,
    AngularFireAuthModule,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}