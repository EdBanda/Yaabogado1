import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the LawyerSignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-lawyer-sign-up',
  templateUrl: 'lawyer-sign-up.html',
})
export class LawyerSignUpPage {

  constructor(private callNumber: CallNumber) {}
  
  

CallThePhone() {
        this.callNumber.callNumber("18594025872", true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
           
}

 

}
