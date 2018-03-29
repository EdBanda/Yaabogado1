import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5'; 
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { User } from '../../modules/user';
import { Profile } from '../../modules/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:  [AngularFireAuth]

})
export class HomePage {


	lawuser = {} as User;
	profile = {} as Profile;


  constructor(private afAuth: AngularFireAuth,public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

  }

		async register(lawuser: User, profile: Profile) {
	
		const AddingLawyer = await this.afAuth.auth.createUserWithEmailAndPassword(lawuser.email,lawuser.password);
		console.log(AddingLawyer); 
        
		this.afAuth.authState.take(1).subscribe(auth => {
		this.afDatabase.object(`profile/${auth.uid}`).set(this.profile).then(() => this.navCtrl.setRoot('ClientDisplayPage'));


		})
	



}

  

  



}
