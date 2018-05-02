/* 
Title: about.ts


Purpose: Code creates the functions of the Lawyer updating their information, Their IMG and the fuction of togglinh if they are available to help. 


Additions that still need to be made: A way for the user to upload the img of their choice to be seen by the user side. 
Also a way to have their debit card information so they can later get sometime of payment for helping the citizes.
We also need to work on a better view of the profile so it looks more professional. 
Also grab the location of the user calling and be shown in the lawyers map
Input:
    Bio: Have acces of inputing quick info to show be user side: "Hi I can Help"
    IMG: ability change profile picture. 

Output:
    Lawyers :
        Easy acces to their location and in the future the map will also show the users location who is currently calling.
*/



import { Component } from '@angular/core';
import { NavController, Platform , NavParams} from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { AngularFireAuth } from 'angularfire2/auth';
import { registerLocaleData } from '@angular/common';
import { Profile } from '../../modules/profile';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
declare var google: any;
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
    CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';
import { Events } from 'ionic-angular';


/**
 * Above are the the pluggins needed to make the app work.
 * Once the name has been read it will be easy to know what the plugin is needed for.
 * 
 * 
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})


export class AboutPage {
/**
 * map: Holds the map that will be shown in the HTML side of this page.
 * markers:any; Holds the image of where the user is currently located at. 
 * arrayData = [] Holds an array of Data
 * profile = {} as Profile; Holds the information for the user in a class so it can later be access by this.profile.info for quick access.
 *
 *AreTheyAvailable = true; : Boolean that will have lawyers show up on the user side if true
 *profileData: FirebaseObjectObservable<Profile> : Holds the information in a class but called from the firebase directly.
 */
  map: any;
  markers:any;
  arrayData = []
  profile = {} as Profile;
  profileData: FirebaseObjectObservable<Profile>
  AreTheyAvailable = true;
  
  
  constructor(public events: Events,private afAuth: AngularFireAuth,public navCtrl: NavController, public geolocation: Geolocation, public platform:Platform, private firedatab: AngularFireDatabase, private angularFireauth: AngularFireAuth,public navParams: NavParams) {
     

     /** From the lawyer sign up page, we push the information that was input it and we grab it to use it on this page by the following code */
      this.profile = this.navParams.get('Profiles'); 
        
      
      
 
      
  
     
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
    });
  }

  /* Adding this method to create a map */
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

       
     

     

   
/*The following code will send the longitude and the latitude to the database by updating the previous information and adding new elements*/

  this.afAuth.authState.take(1).subscribe(data => {
    
    if (data && data.email && data.uid){
    /** Updates the previous information by adding the newly acquire longitude and longiture*/
    this.afAuth.authState.take(1).subscribe(auth => {
    this.firedatab.object(`lawprofile/${auth.uid}`).update(this.profile);})
/** Does the same thing for the database where we read if lawyers are avaible */
     this.afAuth.authState.take(1).subscribe(auth => {
        this.firedatab.object(`lawprofileAvailable/${auth.uid}`).update(this.profile);})


    }


    /* Holds the data to later be called  in .html : The Data is calling all children nodes from the lawyers uid that was register on sign up page. we will call the same way from profile.ts class */
    this.profileData = this.firedatab.object(`lawprofile/${data.uid}`);
    
  

  })
    


}


//They will be able to update what they want the custumers to know about them.

    update()
    {
      /* Take each uid from firebase and updates the new entries. */

        this.afAuth.authState.take(1).subscribe(data => {
        
        if (data && data.email && data.uid)
        {
        /** Updates the quick bio info the lawyer has added */ 
        this.afAuth.authState.take(1).subscribe(auth => {
        this.firedatab.object(`lawprofile/${auth.uid}`).update(this.profile);})

        this.afAuth.authState.take(1).subscribe(auth => {
        this.firedatab.object(`lawprofileAvailable/${auth.uid}`).update(this.profile);})




        }
        // Grabs the update table to be able to call each element on .html 
        this.profileData = this.firedatab.object(`lawprofile/${data.uid}`);
        
        

      

      })
    }


 
    /*Toggles to show if they are free to help users. */
     Available()
    {
     


/** If they are not available to help their information is deleted from the database that is currently reading from the avaialble lawyers */
     if(this.AreTheyAvailable == false)
     {
      this.afAuth.authState.take(1).subscribe(auth => {
      this.firedatab.object(`lawprofileAvailable/${auth.uid}`).remove();})
      console.log("false1");
     }else 
     
     {
/** If they are available then the information is re read from main database and makes a new node with the information grab into the lawyers that are available databse */
     this.afAuth.authState.take(1).subscribe(auth => {
     this.firedatab.object(`lawprofileAvailable/${auth.uid}`).set(this.profile);})
     console.log("true1");
     }


    }
         







}



 
  
