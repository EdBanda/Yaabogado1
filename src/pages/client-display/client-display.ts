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

  profileData: FirebaseObjectObservable<Profile>
  profileSaved: FirebaseListObservable<any[]>;
  AllMyInfo: any;
  




  


  constructor(private afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber,private firedatab: AngularFireDatabase) {
  
        this.AllMyInfo = firedatab.list(`/lawprofileAvailable`);
        this.AllMyInfo.subscribe(profileSaved => {this.AllMyInfo=profileSaved; })


      
        /**
 * 
 *
 * 
 *       Code to see what we can grab from the profiles and verify that each element needed is on the table.


        console.log("BREAK YOU ARE HERE");
          var GrabInfo = firebase.database().ref(`/lawprofile`).orderByKey();
          GrabInfo.once("value")
          .then(function(snapshot) {

          var ArrayofInformation =[];

          snapshot.forEach(function(childSnapshot) {

            
            var key = childSnapshot.key;
            
            var childData = childSnapshot.val();
            ArrayofInformation.push(childData.Firstname);
           
           
          });
          
         
         // console.log(ArrayofInformation);


          });
          
          
 */
          


  }
  
/*
 *
 * 
 *
 * Call Function to call Phone numbers when they push on an available lawyers name.
 * 
 */ 

  CallThePhone(PhoneNumber: string)

   {
        this.callNumber.callNumber(PhoneNumber, true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
        console.log(PhoneNumber);
           
    }




  }
 
 
 



    


 










 

	

 
 


  







