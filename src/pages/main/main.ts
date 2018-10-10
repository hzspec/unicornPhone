import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MainProvider } from '../../providers/main/main';
import { Storage } from '@ionic/storage';
import { UserStore } from '../../pages/user.storage';
import { ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [MainProvider]
})
export class MainPage {

  registed:boolean = true;

  staticData:any = {
    alert: {
      pre: 0,
      cur: 0
    },
    equip: {
      dn: 0,
      sj: 0,
      qt: 0,
      sxt: 0,
      total: 0
    },
    llsj: {
      pre: [0, 'B'],
      cur: [0, 'B'],
      total: [0, 'B']
    }
  };

  rankData:any = [];

  @ViewChild('realchart')
  greetDiv: any;

  zhsh:string = "";
  qd:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public serv:MainProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public store: Storage, public cd: ChangeDetectorRef
  ) {
    this.serv.getLinkJson().then((res:any)=>{
      this.zhsh = res.zhsh;
      this.qd = res.qd;
    });
  }

  getllNumber(num){
    let dw = 'B';
    if(num / 1024 > 1){
        dw = 'KB';
        num = num / 1024;
        if(num / 1024 > 1){
            dw = 'MB';
            num = num / 1024;
            if(num / 1024 > 1){
                dw = 'GB';
                num = num / 1024;
            }
        }
    }
    num = num.toFixed(2);
    return [num, dw];
}

ionViewDidLeave(){
  
}
ionViewDidEnter(){
  /*this.store.get('user').then((us:UserStore)=>{
    this.registed = us.isBindRouter;
    this.dealMain();
  });*/
}

dealMain(){
  if(this.registed){
    this.serv.getStatic((datas:any)=>{
      let alert = datas[0];
      let equip = datas[1];
      let llsj = datas[2];

      this.staticData.alert.pre = alert[0].v;
      this.staticData.alert.cur = alert[1].v;

      for(let m of equip){
        if(m.type == 1){
            this.staticData.equip.dn = m.amount;
        }else if(m.type == 2){
            this.staticData.equip.sj = m.amount;
        }else if(m.type == 3){
            this.staticData.equip.qt = m.amount;
        }else if(m.type == 4){
            this.staticData.equip.sxt = m.amount;
        }
        this.staticData.equip.total += m.amount;
      }

      let d1 = llsj[0].value;
      let d7 = llsj[1].value;
      let d15 = llsj[1].value + llsj[0].value;
      this.staticData.llsj.cur = this.getllNumber(d1);
      this.staticData.llsj.pre = this.getllNumber(d7);
      this.staticData.llsj.total = this.getllNumber(d15);
      this.staticData.llsj.total[0] = parseInt(this.staticData.llsj.total[0]);
    });

    let loader = this.loadingCtrl.create({
      content: "正在获取数据...",
    });
    loader.present();
    this.serv.getTop20((datas:any)=>{
      let d1 = [];
      for(let d of datas){
        if(d.longitude && d.latitude){
          d1.push({name: d.key, value: [d.longitude, d.latitude, d.value]});
        }
      }
      
      this.rankData = d1;
      loader.dismiss();
    }, ()=>{
      loader.dismiss();
    });
  }
}

  ionViewDidLoad() {
    this.store.get('user').then((us:UserStore)=>{
      //us.isBindRouter = false;
      //this.store.set('user', us);
     // this.registed = us.isBindRouter;
      //this.dealMain();

      setTimeout(()=>{
        this.registed = us.isBindRouter;
        this.dealMain();
        this.cd.detectChanges();
      }, 1000);
    });
  }

}
