import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';

import { MainProvider } from '../../providers/main/main';
import { AlertController } from 'ionic-angular';
import { UserStore } from '../user.storage';
import { Storage } from '@ionic/storage';

import * as _ from 'lodash';

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
  isfresh:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController,
    private serv:MainProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    private app: App
  ) {
    let fre = this.navParams.get('fresh');
    if(fre && fre == 'no'){
      this.isfresh = false;
    }
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.viewCtrl.dismiss(null);
  }

  bindAP(){
    let apmac:string = '';
    for(let i=0;i<this.macstring.length;i+=2){
      let a = this.macstring[i];
      let b = this.macstring[i + 1];
      if(a != '' && b != ''){
        apmac += a + b + ':';
      }
    }
    apmac = apmac.substr(0, apmac.length - 1);
    
    if(apmac.length == 17){
      this.viewCtrl.dismiss({data: apmac, success: true});
    }else{
      this.viewCtrl.dismiss({error: 'mac地址输入不完整', success: false});
    }
    
    
    /*this.serv.bindAP(apmac, ()=>{
      
      this.storage.get('user').then((us:UserStore)=>{
        us.arrEquips.push({apmac: apmac, ip: '--', alias: apmac});
        us.isBindRouter = true;

        us.apmac = apmac;
        us.ip = '--';

        let inx = _.findIndex(us.arrEquips, d=>{return d.apmac == apmac});
        

        this.storage.set('user', us);

        const alert = this.alertCtrl.create({
          title: '绑定成功!',
          subTitle: '',
          buttons: [{
            text: '确定',
            handler: ()=>{
              this.viewCtrl.dismiss();
              //this.app.getRootNav().setRoot('TabPage');
              if(this.isfresh){
                window.location.reload();
              }
              
            }
          }]
        });
        alert.present();

        

      });

    }, ()=>{
      const alert = this.alertCtrl.create({
        title: '绑定失败!',
        subTitle: '请检查输入的MAC地址是否正确!',
        buttons: ['确定']
      });
      alert.present();
    });*/
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
