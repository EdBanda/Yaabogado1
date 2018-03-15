import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

 public imagesSrc = ["assets/imgs/ExampleLawyer.jpeg"];
 public y= this.imagesSrc[0];
 public z = "\"{{y}}\"";
 
 ionItem:string = "<ion-item ><ion-thumbnail item-start><img src={{z}}></ion-thumbnail><h2>Examplllle</h2></ion-item>";




 





  
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  	

  }

public Login() {

		


	var name = '<ion-thumbnail item-start>'+
          '<img src="assets/imgs/ExampleLawyer.jpeg">'+
        '</ion-thumbnail>';

     
        return name;
	




}


	

 }
 


  







