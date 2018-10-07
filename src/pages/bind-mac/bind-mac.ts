import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { MainProvider } from '../../providers/main/main';
import { AlertController } from 'ionic-angular';
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
  providers: [MainProvider]
})
export class BindMacPage {

  macstring:any = ['', '', '', '', '', '', '', '', '', '', '', ''];
  curindex:number = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController,
    private serv:MainProvider,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  bindAP(){
    let apmac:string = '';
    for(let i=0;i<this.macstring.length;i+=2){
      let a = this.macstring[i];
      let b = this.macstring[i + 1];
      apmac += a + b + ':';
    }
    apmac = apmac.substr(0, apmac.length - 1);
    this.serv.bindAP(apmac, ()=>{
      const alert = this.alertCtrl.create({
        title: '绑定成功!',
        buttons: ['确定']
      });
      alert.present();
    }, ()=>{
      const alert = this.alertCtrl.create({
        title: '绑定失败!',
        subTitle: '请检查输入的MAC地址是否正确!',
        buttons: ['确定']
      });
      alert.present();
    });
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
