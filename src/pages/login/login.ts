import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserStore } from '../user.storage';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserProvider]
})
export class LoginPage {

  username:string = '';
  password:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public serv:UserProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
  }

  goLoginForPhone(){
    //let reg = this.modalCtrl.create('LoginphonePage');
    let reg = this.modalCtrl.create('LoginphonePage');
    reg.present();
  }

  goRegist(){
    let reg = this.modalCtrl.create('RegistPage');
    reg.present();
  }

  checkLogin(){
    let loader = this.loadingCtrl.create({
      content: "登录中...",
    });
    loader.present();
    let login = this.serv.login(this.username, this.password);
    login.then((val:any)=>{
      
      this.saveInfor(val.token, loader);

    }).catch((err)=>{

      loader.dismiss();
      const alert = this.alertCtrl.create({
        title: '登录失败!',
        subTitle: '请检查用户名和密码是否正确!',
        buttons: ['确定']
      });
      alert.present();

      this.username = '';
      this.password = '';

    });
  }

  saveInfor(token, loader){
    this.serv.getUserinfo(this.username, token).then((val:any)=>{
      let us = new UserStore();
      us.email = val.emailAddr;
      us.phoneNumber = val.phoneNumber;
      us.token = token;
      us.userId = val.userId;
      us.username = val.userId.split('@')[0];
      us.id = val.id;
      us.password = val.password;
      us.birth = '';
      us.verifynum = '';
      us.wxcode = '';
      us.kdcode = '';

      this.serv.getAps(token, (res:any)=>{
        let caches = [];
        for(let r of res){
          caches.push({apmac: r.apMacAddr, ip: r.innerIpShow});
        }
        us.arrEquips = caches;

        if(us.arrEquips.length > 0){
          us.apmac = us.arrEquips[0].apmac;
          us.ip = us.arrEquips[0].ip;
          us.isBindRouter = false;
        }else{
          us.isBindRouter = false;
        }
        
        loader.dismiss();

        this.storage.set('user', us);
        
        this.navCtrl.setRoot('TabPage');
      });

      

    });
  }

}
