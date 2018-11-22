import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Err500Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-err500',
  templateUrl: 'err500.html',
})
export class Err500Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Err500Page');
  }

  goMain(){
    this.viewCtrl.dismiss().then(()=>{
      this.navCtrl.setRoot('TabPage');
    });
  }

}
