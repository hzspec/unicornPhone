import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, ModalController, ToastController  } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EquipProvider } from '../../providers/equip/equip';

import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * Generated class for the EquipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equip',
  templateUrl: 'equip.html',
  providers: [EquipProvider]
})
export class EquipPage {

  equipTp:string = 'all';

  routerData:any = null;

  pagenum:number = 1;
  pagesize:number = 50;
  totalpage:number = 0;

  equiplist:any = {
    all: [],
    ok: [],
    no: [],
    black: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public serv:EquipProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidEnter(){
    
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "正在获取数据...",
    });
    loader.present();

    this.serv.routerInfor((val:any)=>{
      this.routerData = val;
    });

    this.serv.getEquips(this.pagenum, this.pagesize, (val:any)=>{
      loader.dismiss();

      this.totalpage = val.totalPageCount;
      for(let d of val.result){
        d.createTime = moment(d.createTime).format('YYYY-MM-DD HH:mm:ss');
      }
      this.equiplist.all = val.result;
      this.equiplist.ok = _.filter(val.result, d=>{return d.status != '10';});
      this.equiplist.no = _.filter(val.result, d=>{return d.status == '10';});
      this.equiplist.black = _.filter(val.result, d=>{return d.status == '30';});
    }, ()=>{
      loader.dismiss();
    });
  }

  segmentChanged(ev){
    this.equiplist.ok = _.filter(this.equiplist.all, d=>{return d.status != '10';});
    this.equiplist.no = _.filter(this.equiplist.all, d=>{return d.status == '10';});
    this.equiplist.black = _.filter(this.equiplist.all, d=>{return d.status == '30';});
  }

  changeAuth(mod, auth){
    let loader = this.loadingCtrl.create({
      content: "处理中...",
    });
    this.serv.setEquipAuth(mod.id, auth, ()=>{
      loader.dismiss();
      mod.status = auth;

      let tipstr = '';
      if(auth == '40'){
        tipstr = '设备已设置为限时1小时使用';
      }else if(auth == '9-17'){
        tipstr = '设备已设置为早9点到晚5点使用';
      }else if(auth == '30'){
        tipstr = '设备已设置黑名单';
      }else if(auth == '20'){
        tipstr = '设备已设置白名单';
      }

      const toast = this.toastCtrl.create({
        message: tipstr,
        duration: 3000
      });
      toast.present();
    });
  }

  seeRouterLL(){
    const modal = this.modalCtrl.create('RealchartPage');
    modal.present();
  }

}
