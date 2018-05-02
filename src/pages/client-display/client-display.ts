

/* 
Title: client-display.ts


Purpose: Code creates the functions for what the citizen side of the app will hold.
The users will see all available lawyers that are ready to help.
They will be able to call them by pressing the call button.


Additions that still need to be made: A way to add a button where they can start a video call with cross platforms.
Windows
Apple
Android

Input:
    Location: Will automaticly be saved once they press and ready to use the app.
    Filter: ability to show lawyers n miles away. 

Output:
    Lawyers :
        All lawyers available to help will display.
        Lawyers information including first and last name and an image of them.
        A map of their current location.
*/


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../modules/profile';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
declare var google: any;
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
    CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';
import { Events } from 'ionic-angular';
import firebase from 'firebase';


/**
 * Above are the the pluggins needed to make the app work.
 * Once the name has been read it will be easy to know what the plugin is needed for.
 * 
 * 
 */

@IonicPage()
@Component({
  selector: 'page-client-display',
  templateUrl: 'client-display.html',
})
export class ClientDisplayPage {
/**
 * map: Holds the map that will be shown in the HTML side of this page.
 * markers:any; Holds the image of where the user is currently located at. 
 * arrayData = [] Holds an array of Data
 * profile = {} as Profile; Holds the information for the user in a class so it can later be access by this.profile.info for quick access.
 *
 *DistanceHolders = {} as Profile; //holds the distance in class so function dont need parameters
 *profileData: FirebaseObjectObservable<Profile> : Holds the information in a class but called from the firebase directly.
 */

  map: any;
  markers:any;
  arrayData = []
  DataGrabing;
  
  DistanceHolders = {} as Profile; //holds the distance so function dont need parameters
  profileData: FirebaseObjectObservable<Profile>
  profileSaved: FirebaseListObservable<any[]>;
  AllMyInfo: any;
  profile = {} as Profile;
  


  


  constructor(public events: Events,private afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber,private firedatab: AngularFireDatabase,public geolocation: Geolocation,public platform:Platform) {
  


        /**  Calls the database to bring the data back to us. and saves it to proviledSaved data array for easier calling of data. */
        this.AllMyInfo = firedatab.list(`/lawprofileAvailable`);
        this.AllMyInfo.subscribe(profileSaved => {this.AllMyInfo=profileSaved; })
        
         

       


           /**  debug porpose Goes over all the data to make sure the data is actually being sent to the database*/
           var GrabInfo = firebase.database().ref(`/lawprofile`).orderByKey();
           GrabInfo.once("value")
           .then(function(snapshot) {

         
          /**  Goes over all each user id and reads each child node. and can be called from the same classes we saved them as*/
           snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log("THIS LINE");
            console.log(childData.lat1); });});





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
    
       let latLng = new google.maps.LatLng(lat, lng);

      /* This method is to add the marker to show the user exacly 
      location on the map.
      Also we will choose the type of Map and the zoom size */
      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      };

      let element = document.getElementById('map');

      this.map = new google.maps.Map(element, mapOptions);
      
      /* This method will display a green marker icon, also if user clicks on the 
      green icon marker, it will display a message*/
      let marker = new google.maps.Marker({
        position: latLng,
        title: 'HERE I AM!!!',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      })


      let content = `
      <div id="myid"  class="item item-thumbnail-left item-text-wrap">
        <ion-item>
          <ion-row>
            <h6>`+marker.title+`</h6>
          </ion-row>
        </ion-item>
      </div>
      `
      ;
      marker.setMap(this.map);
      
      /*In this two statements, we will send the latitude and longetude
      to the database on Firebase.
      The idea is to record the data so the Lawyer will have the client's
      location anywhere in the US*/


      this.profile.lng1=lng;
      this.profile.lat1=lat;


      

      /**  Debug to make sure function is working and returning proper functions.*/
      //console.log(this.filterDistance(lat,lng,29.46786,-98.53506) ); 
      }


        
      
          
          
 
          


  
/*
 *
 * 
 *
 * Call Function to call Phone numbers when they slide to call  on an available lawyers name.
 * 
 */ 

  CallThePhone(PhoneNumber: string)

   {



        /**  If the call does not go throught then an error will be shown in the console*/
        this.callNumber.callNumber(PhoneNumber, true).then(() => console.log('Calling Now')).catch(() => console.log('Error launching dialer'));
        console.log(PhoneNumber);



           
    }


/*Formula founded to find the distance needed to from longitude and latitude*/

    Distancebylocation(lat2,lng2) {
    //console.log("Line 197"); Debug to make sure we can run the function
    //this.geolocation.getCurrentPosition().then(result => {
    //this.loadMap(result.coords.latitude, result.coords.longitude);});
    var lng=this.profile.lng1; //initialize new variables calling them from the class of saved info
    var lat=this.profile.lat1;
    console.log("Line 197", lng);

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
    this.profile.DistanceAway=d;
    console.log(this.profile.DistanceAway);
    return d;
   


   }

    deg2rad(deg) 
    {   //Changes degrees to radians
    return deg * (Math.PI/180)
    }



//returns true or false depending on the far away distance
FiltertheLawyers(Distance)//grabs the paramater of the return value of Distancebylocation to basicly call the function.
{
    


    var LawyerInDistance=true;  //If the lawer is within the desire location
    console.log(this.DistanceHolders.DistanceWanted); //Debug if correct option is shown
   
    console.log(this.profile.DistanceAway);
  
    /**  this.DistanceHolders.DistanceWanted grabs the value from the filter value on the html page and this.profile.DistanceAway calcualtes how far is the lawyers location from the users location.*/
    if (this.DistanceHolders.DistanceWanted > this.profile.DistanceAway)
    {
      
      console.log(this.profile.DistanceAway);
      LawyerInDistance= true;
      console.log(LawyerInDistance);
      return LawyerInDistance;


      /**  this.DistanceHolders.DistanceWanted grabs the value from the filter value on the html page and this.profile.DistanceAway calcualtes how far is the lawyers location from the users location. if the value desired is less than the actual location of user and lawyer then the lawyer will not be displayed in the users page of available lawyers.*/
    }else if(this.DistanceHolders.DistanceWanted < this.profile.DistanceAway)
    {
      LawyerInDistance= false;
      console.log(LawyerInDistance); // Shows how far they are from user
      return LawyerInDistance; // bool showing if they are going to show in the users side
    }else{

    return true;
    }
  
  
  

  
  }
















  }
 
 
 



    


 










 

	

 
 


  







