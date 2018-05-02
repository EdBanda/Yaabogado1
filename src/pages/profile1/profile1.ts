import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { Profile } from '../../modules/profile';
import { User } from '../../modules/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AboutPage }  from '../about/about';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import firebase from 'firebase';
/**
 * 
 *  
 * 
 * 
 * 
 */

@IonicPage()
@Component({
  selector: 'page-profile1',
  templateUrl: 'profile1.html',
})
export class Profile1Page {
/* Sets up a class to hold all the elements from the database */

		lawuser = {} as User;
		profile = {} as Profile;
    profileSaved: FirebaseListObservable<any[]>;
    AllMyInfo: any;
   
  constructor(private firedatab: AngularFireDatabase,private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public afDatabase: AngularFireDatabase) {
  






  }



/* Creates a function to trow an alert error*/
	public TryAgainAlert(s: string, t: string) {
        let alert = this.alertCtrl.create({
            title: t,
            subTitle: s,
            buttons: ['OK']
        });
        alert.present(alert);
    		}
  

/* Grabs the users input and checks that the information is on the database */
  async login(lawuser: User)
  {
    
  	
  var IfMatch = true;
  
  	
  	
  	
  	const Loginin = await this.afAuth.auth.signInWithEmailAndPassword(lawuser.email,lawuser.password).catch(ERROR => {
  		this.TryAgainAlert("Password and Email did not match try again", "Error");IfMatch = false; console.log(IfMatch);
  		});
  	
  	/* If data match then go to AboutPage*/

  	if (Loginin){
		// Debug pourpose

		this.afAuth.authState.take(1).subscribe(auth => {
		this.afDatabase.object(`lawprofile/${auth.uid}`)
    this.profile = {} as Profile;
     /**  Calls the database to bring the data back to us. and saves it to proviledSaved data array for easier calling of data. */
     this.AllMyInfo = this.firedatab.object(`lawprofile/${auth.uid}`);
     
     



      /**  debug porpose Goes over all the data to make sure the data is actually being sent to the database*/
           var GrabInfo = firebase.database().ref(`/lawprofile`).orderByKey();
           GrabInfo.once("value")
           .then(function(snapshot) {


         
          /**  Goes over all  user id and reads each child node. and can be called from the same classes we saved them as.. Here we will try to call the chil nodes so they can be saved in the this.profile.Firstname or any variables from the classes   */
           snapshot.forEach(function(childSnapshot) {

           


           /* We try to check we only get the uid information we need. This way we can send all the information to the about page when they login. without it, once the toggle availity in the next page, the only information that will appear in the user screen is the update bio because we could not grabe the information again.*/
            var key = childSnapshot.key;
            if (key == auth.uid)
           {
            console.log(key);
            var childData = childSnapshot.val();
            //childData.Firstname will give you name of the uid and also work for other class variable provided from the Profile class page.
            


            } 
          
             });});

            

		




















    this.navCtrl.setRoot(AboutPage, {Profiles: this.profile}); })


    

		this.navCtrl.setRoot(AboutPage,{Profiles: this.profile});
		
  	}
  	
  	
    
  	 

  	
  		
  		

  


}
}
