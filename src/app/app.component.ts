import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {FormsModule} from '@angular/forms'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { UserpagePage } from '../pages/userpage/userpage'; NO longer needed
import { CallNumber } from '@ionic-native/call-number';
import { HomePage } from '../pages/home/home';
import { ClientDisplayPage } from '../pages//client-display/client-display';
// NO longer needed import { LawyerNavigation1Page } from '../pages/lawyer-navigation1/lawyer-navigation1';
import { LawyerSignUpPage } from '../pages/lawyer-sign-up/lawyer-sign-up';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { LawyerSOptionsPage } from '../pages/lawyer-s-options/lawyer-s-options';
import { AboutPage } from '../pages/about/about';
import { Profile1Page } from '../pages/profile1/profile1';
@Component({
  templateUrl: 'app.html'

})

//What Page will open First

export class MyApp {
  rootPage:any = LoginOptionsPage;

  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

