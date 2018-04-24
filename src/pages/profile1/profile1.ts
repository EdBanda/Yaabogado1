import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { Profile } from '../../modules/profile';
import { User } from '../../modules/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AboutPage }  from '../about/about';
import { AngularFireDatabase} from 'angularfire2/database';
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
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public afDatabase: AngularFireDatabase) {
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
		this.navCtrl.setRoot(AboutPage, {Profiles: this.profile}); })


    

		this.navCtrl.setRoot(AboutPage,{Profiles: this.profile});
		
  	}
  	
  	
    
  	 

  	
  		
  		

  


}
}
