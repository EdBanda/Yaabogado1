import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientDisplayPage } from '../client-display/client-display';
import { LawyerSOptionsPage } from '../lawyer-s-options/lawyer-s-options';
/**
 * Generated class for the LoginOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-options',
  templateUrl: 'login-options.html',
})
export class LoginOptionsPage {



  constructor( public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginOptionsPage');
  }

	 UserChoice(){

	 this.navCtrl.push(ClientDisplayPage);

 }


     LawyerChoice(){
	 this.navCtrl.push(LawyerSOptionsPage);



    }



}
