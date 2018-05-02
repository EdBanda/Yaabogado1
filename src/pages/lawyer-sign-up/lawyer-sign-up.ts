
/* 
Title: lawyer-sign-up.ts


Purpose: Code creates a lawyer profile so user can call incase an emergency. 


Additions that still need to be made: A way to verify lawyers so random people are not signing up.
Also a way that they can enter their banck acount so lawyers get paid for helping.


Input:
    Name:
    Email:
    Password:
    Telephone:
    Location--It automaticly calculate your location when signing up:

Output:
    Lawyer Profile:
        Shows them a map of where they are currently located and hopefully will show other users when they call that lawyer.
*/





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
 * Above are all the plugins that are used in this page and initilazed in the constructor.
 *
 * 
 * 
 */




@IonicPage()
@Component({
  selector: 'page-lawyer-sign-up',
  templateUrl: 'lawyer-sign-up.html',
   providers: [AngularFireAuth]
})
export class LawyerSignUpPage {



/* Sets up a class to hold all the elements from the database-- To see what the classes can contain: modules page contains profile.ts and user.ts showing what the classes hold for that information.*/
	lawuser = {} as User;
	profile = {} as Profile;


  constructor(private afAuth: AngularFireAuth,public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public geolocation: Geolocation, public platform:Platform ,public alertCtrl: AlertController) 
  {}
  
  



   /* This creates an aleart function, so we can later call it and display an alert*/

  	public TryAgainAlert(s: string, t: string) {
        let alert = this.alertCtrl.create({
            title: t,
            subTitle: s,
            buttons: ['OK'  ]
        });
        alert.present(alert);
   				 }

   /*This will read the string and makes sure that it does not countain an integer */
 	HasNumberInput(myString) 
 	{
  		return /\d/.test(myString);
	}	
	




 	/* The ngModel variables from lawyer-sign-up.html will be sent to this function  and the branches to make sure they meet the correct input. 
 	If the correct input has been inputed then the info is sent to the database*/

	async register(lawuser: User, profile: Profile) {
		/* from the html inputs the variable will be grabed and put into variables to be used on .ts*/
 		var firstname = (<HTMLInputElement>document.getElementsByName("firstname")[1]).value;
        var lastname = (<HTMLInputElement>document.getElementsByName("lastname")[1]).value;
		var password = (<HTMLInputElement>document.getElementsByName("password")[1]).value;
		var Verifypassword = (<HTMLInputElement>document.getElementsByName("Verifypassword")[1]).value;
		var Telephone = (<HTMLInputElement>document.getElementsByName("Telephone")[1]).value;
		
		var CheckingRightInput =0;

		
		/* The branches make sure that the input is correct input desired*/
	
		 var checkfirstname = this.HasNumberInput(firstname);
		 var checklastname = this.HasNumberInput(lastname);
		 
		
		if ((checkfirstname || checklastname  )==true)
		{
			this.TryAgainAlert("Invalid characters", "Try again");
			CheckingRightInput = 0;

		} else if (Telephone.length != 10)
       
        {
            this.TryAgainAlert("Please insert 10 digit number", "Try again");
        
        } else if (password.length < 8 )
       
        {
            this.TryAgainAlert("Please try a stronger password", "Try again");
        } else if (password != Verifypassword )
       
        {
            this.TryAgainAlert("Please make sure passwords match", "Try again");
        }



        /*Once the information has been checked for correct input then it will sent to database and create a new user with input Child nodes */
        else {
			/*  Waits for a user to be added and sends the data to database*/
			const AddingLawyer = await this.afAuth.auth.createUserWithEmailAndPassword(lawuser.email,lawuser.password);
			
	        /* The following code grabs all information inputed and saves it into a class and sents it to the AboutPage to be used there*/
			
			
			/* .set starts the same uid in a new branch so we can then read this branch as lawyers available, if lawyers are not available the information will be deleted from this node. If they lawyer then becomes available, it will read their information and re upload to this node from the same data sent to the node below.*/
			
			this.afAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.object(`lawprofileAvailable/${auth.uid}`).set(this.profile);})
			

			/* .set will start a new uid with the new information proviced*/
	
			this.afAuth.authState.take(1).subscribe(auth => {
			this.afDatabase.object(`lawprofile/${auth.uid}`).set(this.profile)
			.then(() => this.navCtrl.setRoot(AboutPage, {Profiles: this.profile})); })
			
		
		


		

}}}
 


