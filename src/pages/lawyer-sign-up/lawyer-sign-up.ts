import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform ,AlertController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { FormsModule } from '@angular/forms';
import { User } from '../../modules/user';
import { Profile } from '../../modules/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

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



/* Sets up a class to hold all the elements from the database */
	lawuser = {} as User;
	profile = {} as Profile;


  constructor(private afAuth: AngularFireAuth,public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public geolocation: Geolocation, public platform:Platform ,public alertCtrl: AlertController) {









  }
  
  

/**
 * 
 *
 * Creates an Alert to show errors
 * 
 */	




  public TryAgainAlert(s: string, t: string) {
        let alert = this.alertCtrl.create({
            title: t,
            subTitle: s,
            buttons: ['OK'  ]
        });
        alert.present(alert);
    }
/**
 * 
 *
 * Checks that the Input has numbers ans returns error if not. 
 * 
 */	


 	HasNumberInput(myString) 
 	{
  		return /\d/.test(myString);
	}	
	


/**
 * 
 *
 * The Users information will be grabbed from the Mg models and pass down to the database.
 * 
 */

 /**
 * 
 *
 * Checks that the Input has numbers ans returns error if not. 
 * 
 */	


 	

	async register(lawuser: User, profile: Profile) {

 		var firstname = (<HTMLInputElement>document.getElementsByName("firstname")[1]).value;
        var lastname = (<HTMLInputElement>document.getElementsByName("lastname")[1]).value;
		var password = (<HTMLInputElement>document.getElementsByName("password")[1]).value;
		var Telephone = (<HTMLInputElement>document.getElementsByName("Telephone")[1]).value;
		
		var CheckingRightInput =0;


	
		 var checkfirstname = this.HasNumberInput(firstname);
		 var checklastname = this.HasNumberInput(lastname);
		 
		
		if ((checkfirstname || checklastname  )==true)
		{
			this.TryAgainAlert("Invalid characters", "Try again");
			CheckingRightInput = 0;

		} else if (Telephone.length != 10)
       
        {
            this.TryAgainAlert("Please insert 10 digit number", "Try again");
        
        } else if (password.length < 8)
       
        {
            this.TryAgainAlert("Please try a stronger password", "Try again");
        }else {

		const AddingLawyer = await this.afAuth.auth.createUserWithEmailAndPassword(lawuser.email,lawuser.password);
		console.log(AddingLawyer); 
        
		
		this.afAuth.authState.take(1).subscribe(auth => {
		this.afDatabase.object(`lawprofileAvailable/${auth.uid}`).set(this.profile);})

		this.afAuth.authState.take(1).subscribe(auth => {
		this.afDatabase.object(`lawprofile/${auth.uid}`).set(this.profile)
		.then(() => this.navCtrl.setRoot(AboutPage, {Profiles: this.profile})); })
		
		
		


		

}}}
 


