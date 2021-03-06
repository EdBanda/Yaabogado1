import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { LawyerSignUpPage } from '../lawyer-sign-up/lawyer-sign-up';
import { Profile1Page } from '../profile1/profile1';

/**
 * Generated class for the LawyerSOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lawyer-s-options',
  templateUrl: 'lawyer-s-options.html',
})
export class LawyerSOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

/* Buttons redirecting the user to the option that best identifies them */


  ionViewDidLoad() {
    console.log('ionViewDidLoad LawyerSOptionsPage');
  }


  SignUp(){

  	this.navCtrl.push(LawyerSignUpPage);

  }

  login(){

    this.navCtrl.push(Profile1Page);

  }


}
