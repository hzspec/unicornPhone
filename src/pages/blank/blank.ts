import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BlankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blank',
  templateUrl: 'blank.html',
})
export class BlankPage {

  title:string = '';
  realurl:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    let t = this.navParams.get('title');
    let url = this.navParams.get('url');
    if(t){
      this.title = t;
      this.realurl = url;
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    
  }

}
