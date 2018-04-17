import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../modules/profile';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
    CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';
import firebase from 'firebase';

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
  profile = {} as Profile;
  profileData: FirebaseObjectObservable<Profile>
  profileSaved: FirebaseListObservable<any[]>;
  AllMyInfo: any;
  


  


  constructor(private afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber,private firedatab: AngularFireDatabase,public geolocation: Geolocation,public platform:Platform) {
  
        this.AllMyInfo = firedatab.list(`/lawprofileAvailable`);
        this.AllMyInfo.subscribe(profileSaved => {this.AllMyInfo=profileSaved; })
        
         

       


           console.log("BREAK YOU ARE HERE");
           var GrabInfo = firebase.database().ref(`/lawprofile`).orderByKey();
           GrabInfo.once("value")
           .then(function(snapshot) {

         

           snapshot.forEach(function(childSnapshot) {
            
            
        
            var key = childSnapshot.key;
            
            var childData = childSnapshot.val();

             console.log("THIS LINE");
             console.log(childData.lat1);
            
            
       

          });});





}
  

  ionViewWillEnter(){
  
    this.platform.ready().then(() => {
      this.initPage();
    });


    }
  /*This function will get the user's latitude and longitude*/
  initPage() {
    this.geolocation.getCurrentPosition().then(result => {
      this.loadMap(result.coords.latitude, result.coords.longitude);

      var lng1=result.coords.longitude;
      var lat1=result.coords.latitude;
 

    });
    }

      private loadMap(lat, lng) {
    
      this.profile.lng1=lng;
      this.profile.lat1=lat;

      this.firedatab.object(`UserOn/`).update(this.profile);
      console.log(this.filterDistance(lat,lng,29.46786,-98.53506) ); }


        
        /**
 * 
 *
 * 
 *       Code to see what we can grab from the profiles and verify that each element needed is on the table.

*/
        
          
          
 
          


  
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


/*Formula founded to find the distance needed to from longitude and lattidue*/

    filterDistance(lat,lng,lat2,lng2)

    {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat);  // deg2rad below
    var dLng = this.deg2rad(lng2-lng); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = Math.ceil((R * c)/1.609344); // Distance in miles
    console.log(d);

    return d;
   


   }

    deg2rad(deg) 
    {   //Changes degrees to radians
    return deg * (Math.PI/180)
    }



/*
   ByDistance(FilterDistance)
   {


   console.log((FilterDistance) + 4);



    var GrabInfo = firebase.database().ref(`/lawprofile`).orderByKey();
    GrabInfo.once("value").then(function(snapshot) {snapshot.forEach(function(childSnapshot) {

            
            var key = childSnapshot.key;
            
            var childData = childSnapshot.val();
            consolo.log(childData.lat1);
            this.ArrayOfInfo.push(childData.lat1);
            console.log(this.ArrayOfInfo);
           
          });
          
         
        


          });
   





  }

*/


  }
 
 
 



    


 










 

	

 
 


  







