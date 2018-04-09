import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { FormsModule } from '@angular/forms';
import { User } from '../../modules/user';
import { Profile } from '../../modules/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
//import { ClientDisplayPage } from '../client-display/client-display';
import { AboutPage }  from '../about/about';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
    CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
/**
 * Generated class for the LawyerSignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




@IonicPage()
@Component({
  selector: 'page-lawyer-sign-up',
  templateUrl: 'lawyer-sign-up.html',
   providers: [AngularFireAuth]
})
export class LawyerSignUpPage {

	lawuser = {} as User;
	profile = {} as Profile;

  constructor(private afAuth: AngularFireAuth,public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public geolocation: Geolocation, public platform:Platform) {}
  
  

CallThePhone() {
        this.callNumber.callNumber("18594025872", true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
           
}

	async register(lawuser: User, profile: Profile) {

 		

	
		const AddingLawyer = await this.afAuth.auth.createUserWithEmailAndPassword(lawuser.email,lawuser.password);
		console.log(AddingLawyer); 
        
		this.afAuth.authState.take(1).subscribe(auth => {
		this.afDatabase.object(`lawprofile/${auth.uid}`).set(this.profile)
		.then(() => this.navCtrl.setRoot(AboutPage));

		//this.navCtrl.push(AboutPage);


		

})
	



}


}
 


