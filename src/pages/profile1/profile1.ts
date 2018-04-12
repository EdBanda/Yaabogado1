import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../modules/profile';
import { User } from '../../modules/user';
/**
 * Generated class for the Profile1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile1',
  templateUrl: 'profile1.html',
})
export class Profile1Page {


		lawuser = {} as User;
		profile = {} as Profile;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile1Page');
  }

}
