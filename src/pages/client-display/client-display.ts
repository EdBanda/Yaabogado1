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


 





  
 

  constructor(private afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {}

 
 
  ionViewWillLoad(){
  this.afAuth.authState.take(1).subscribe(data => {
    if (data && data.email && data.uid){

    this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    }


  })





  }}


	

 
 


  







