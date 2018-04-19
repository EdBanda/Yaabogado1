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
  map: any;
  markers:any;
  arrayData = []
  DataGrabing;
  profile = {} as Profile;
  DistanceHolders = {} as Profile; //holds the distance so function dont need parameters
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


      

      
      //console.log(this.filterDistance(lat,lng,29.46786,-98.53506) ); 
      }


        
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
        this.callNumber.callNumber(PhoneNumber, true).then(() => console.log('Calling Now')).catch(() => console.log('Error launching dialer'));
        console.log(PhoneNumber);



           
    }


/*Formula founded to find the distance needed to from longitude and lattidue*/

    Distancebylocation(lat2,lng2) {
    console.log("Line 197");
    //this.geolocation.getCurrentPosition().then(result => {
    //this.loadMap(result.coords.latitude, result.coords.longitude);});
    var lng=this.profile.lng1;
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
FiltertheLawyers(Distance)//grabs the paramater of the return value of Distancebylocation to basicly call the function
{
    


    var LawyerInDistance=true;  //If the lawer is within the desire location
    console.log(this.DistanceHolders.DistanceWanted); //Debug if correct option is shown
   
    console.log(this.profile.DistanceAway);
  

    if (this.DistanceHolders.DistanceWanted > this.profile.DistanceAway)
    {
      
      console.log(this.profile.DistanceAway);
      LawyerInDistance= true;
      console.log(LawyerInDistance);
      return LawyerInDistance;

    }else if(this.DistanceHolders.DistanceWanted < this.profile.DistanceAway)
    {
      LawyerInDistance= false;
      console.log(LawyerInDistance);
      return LawyerInDistance;
    }else{

    return true;
    }
  
  
  

  
  }
















  }
 
 
 



    


 










 

	

 
 


  







