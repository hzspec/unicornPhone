import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserStore } from '../user.storage';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  userinfo:UserStore = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('user').then((us:UserStore)=>{
      this.userinfo = us;
    });
  }

  logout(){
    this.storage.remove('user');
    this.navCtrl.setRoot('LoginPage');
  }

}
