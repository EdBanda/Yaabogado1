import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../modules/profile';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ClientDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-display',
  templateUrl: 'client-display.html',
})
export class ClientDisplayPage {

  DataGrabing;

  profileData: FirebaseObjectObservable<Profile>;


 

  



  
 items;

  constructor(private afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber) {
  

  //this.getDataFromFireBase();
  }
  
  CallThePhone() {
        this.callNumber.callNumber("18595525154", true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
           
}




  }
 
 
 



    


 










 

	

 
 


  







