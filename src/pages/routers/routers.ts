import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserStore } from '../user.storage';

/**
 * Generated class for the RoutersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-routers',
  templateUrl: 'routers.html',
})
export class RoutersPage {

  routes:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController,
    private storage: Storage, private viewCtrl:ViewController, public loadingCtrl: LoadingController,) {
      this.storage.get('user').then((us:UserStore)=>{
        //console.log(us);
        for(let it of us.arrEquips){
          if(it.apmac == us.apmac){
            it.checked = true;
          }else{
            it.checked = false;
          }
          this.routes.push(it);
        }
      });
  }

  ionViewDidLoad() {
  }

  selected(mac){
    
    let item = null;

    this.storage.get('user').then((us:UserStore)=>{
      
      for(let it of us.arrEquips){
        if(it.apmac == mac){
          item = it;
        }
      }

      us.apmac = item.apmac;
      us.ip = item.ip;

      this.storage.set('user', us);

    });
  }

  addRouter(){
    const modal = this.modalCtrl.create('BindMacPage');
    modal.present();
  }

  closeModal(){
    this.navCtrl.pop().then(()=>{

      let loader = this.loadingCtrl.create({
        content: "切换路由中...",
      });
      loader.present();

      setTimeout(()=>{
        
        window.location.reload();
      }, 1000);
    });
    
  }

}