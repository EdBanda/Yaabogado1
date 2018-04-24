
/* 
Title: login-options.ts


Purpose: Have the App user press their desired use of the app and the buttons will take thaem to that page. 




Input:
    Button indicating how they are using the app: USER or LAWYER 

Output:
    Success:
        USER: Takes them to ClientDisplayPage
        LAwyer: Takes them to LawyerSOptionsPage

Output:
    Location will be saved to the databse if the USER option was choosen 
   
*/




import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientDisplayPage } from '../client-display/client-display';
import { LawyerSOptionsPage } from '../lawyer-s-options/lawyer-s-options';
/**
 * Above are the the pluggins needed to make the app work.
 * Once the name has been read it will be easy to know what the plugin is needed for.
 * 
 * 
 */

@IonicPage()
@Component({
  selector: 'page-login-options',
  templateUrl: 'login-options.html',
})
export class LoginOptionsPage {


/**
 * 
 *This two buttons will each take them to a different page after they been clicked. 
 * ClientDisplayPage and LawyerSOptionPage
 * 
 */





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
