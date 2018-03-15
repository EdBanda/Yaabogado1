import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5'; 
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';

import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HTTP]

})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HTTP) {

  }

	
  

  



}
