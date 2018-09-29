import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

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

  editMod:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private app: App
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('user').then((us:UserStore)=>{
      this.userinfo = us;
    });
  }

  logout(){
    this.storage.remove('user');
    this.navCtrl.popToRoot();
    //window.location.href = '/#login';
    //this.navCtrl.setRoot('LoginPage');
    this.app.getRootNav().setRoot("LoginPage");
  }

  editInfor(){
    this.editMod = true;
  }

  saveInfo(){
    this.storage.set('user', this.userinfo);
    this.editMod = false;
  }

}
