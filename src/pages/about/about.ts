/*This page is about to display the user geolocation as soon as they 
 login on the application.
 Later it will save on the data the user's current position, (latitude, longitude) */

import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { registerLocaleData } from '@angular/common';
import { Profile } from '../../modules/profile';
declare var google: any;
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
    CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})


export class AboutPage {
  map: any;
  markers:any;
  arrayData = []
  profile = {} as Profile;

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public geolocation: Geolocation, public platform:Platform, private firedatab: AngularFireDatabase, 
    private angularFireauth: AngularFireAuth) {

      //this.firedatab.list("/lawprofile/").subscribe(_data => {
        //this.arrayData = _data;
  
     // });
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

       //this.firedatab.object("/lawprofile/").set(this.profile);
      //this.firedatab.object("/lawprofile/").push(lng)
     

     

   //   this.afAuth.authState.take(1).subscribe(auth => {
   // this.firedatab.list(`lawprofile/${auth.uid}`).push(this.profile);
   // })



  this.afAuth.authState.take(1).subscribe(data => {
    if (data && data.email && data.uid){
    this.afAuth.authState.take(1).subscribe(auth => {
    this.firedatab.object(`lawprofile/${auth.uid}`).update(this.profile);
    })
    }


  })
    


}

}
//Page 89 MAxwell Book: Thomas Edison
//Thomas Jefferson words: Genious!!!!
//Genious is 1%, 99% is Persperation

//Nero plusticity, the brain can be shape
//We borned with a certains patterns in our life
//Habits, Thoughts Experiences, Music, Enviroments, reshape our brain

/*DNA triggers

DNA controls the biology of our body

We are not captive to Chemestry

Victor Frunckol Pg 91 Maxwell book
There is one thing cannt be taken away


CHAPTER2 */