import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BindrouterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bindrouter',
  templateUrl: 'bindrouter.html',
})
export class BindrouterPage {

  step:number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BindrouterPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  connectWIFI(){
    this.step = 2;
  }

  manInput(){
    this.step = 3;
  }

  confirmForm(){
    this.step = 4;
  }

  fininsh(){
    this.step = 1;
    this.viewCtrl.dismiss();
  }

}
