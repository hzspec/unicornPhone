import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BindMacPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bind-mac',
  templateUrl: 'bind-mac.html',
})
export class BindMacPage {

  macstring:any = ['', '', '', '', '', '', '', '', '', '', '', ''];
  curindex:number = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  clk(txt){
    ++this.curindex;
    if(this.curindex >= this.macstring.length){
      this.curindex = this.macstring.length - 1;
    }
    this.macstring[this.curindex] = txt;

  }
  clkret(){
    this.macstring[this.curindex--] = '';
    if(this.curindex <= -1){
      this.curindex = -1;
    }
  }
  clkok(){

  }

}
