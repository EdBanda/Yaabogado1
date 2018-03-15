import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserpagePage } from '../pages/userpage/userpage';
import { LawyerViewPage } from '../pages/lawyer-view/lawyer-view';
import { HomePage } from '../pages/home/home';
import { ClientDisplayPage } from '../pages/client-display/client-display';
import { LawyerNavigation1Page } from '../pages/lawyer-navigation1/lawyer-navigation1';

@Component({
  templateUrl: 'app.html'
})

//What Page will open First

export class MyApp {
  rootPage:any =HomePage;


  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

