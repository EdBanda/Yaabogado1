import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../modules/profile';


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

  constructor(private afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
  

  //this.getDataFromFireBase();
  }
  
  //getDataFromFireBase(){
//this.afDatabase.list('lawprofile/').valueChanges().subscribe(
//data => {console.lo(data)
//this.items = data

//})



  }
 
 
 
  //ionViewWillLoad(){

  
  //this.afAuth.authState.take(1).subscribe(data => {
  

   //this.profileData = this.afDatabase.object(`lawyerprofile`)
  //console.log(this.profileData);


    let user_data= [];

    this.afDatabase.list().ref().on('value', (snapshot) => {
    let result = snapshot.value();
    for(let k in result){ //"k" provides key Id of each object
     user_data.push({
       id : k,
       name : result[k].name,
       phone : result[k].phone,
     });
    }
});


 

  //}


//  }










 

	

 
 


  







