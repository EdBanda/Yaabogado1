import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the LawyerNavigation1Page tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lawyer-navigation1',
  templateUrl: 'lawyer-navigation1.html'
})
export class LawyerNavigation1Page {

  profile1Root = 'Profile1Page'
  settings1Root = 'Settings1Page'
  clients1Root = 'Clients1Page'


  constructor(public navCtrl: NavController) {}

}
