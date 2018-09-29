import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { AlertController, ViewController } from 'ionic-angular';
import { SafeProvider } from '../../providers/safe/safe';

import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * Generated class for the SafePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safe',
  templateUrl: 'safe.html',
  providers: [SafeProvider]
})
export class SafePage {

  safeType:string = 'alert';

  stime:string = '';
  etime:string = '';
  pagenum:number = 1;
  pagesize:number = 10;
  totalpage:number = 0;

  alertLists:any = [];

  showback:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl:ViewController,
    public serv:SafeProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      let ptp = this.navParams.get('type');
      if(ptp && ptp == 'green'){
        this.safeType = 'green';
        this.showback = true;
      }else{
        this.safeType = 'alert';
      }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    let d = new Date();
    let now:moment.Moment = moment(d);
    let yes:moment.Moment = moment(d);
    yes.add(-1, 'month');

    this.stime = yes.format('YYYY-MM-DDTHH:mm:ss') + '.0Z';
    this.etime = now.format('YYYY-MM-DDTHH:mm:ss') + '.0Z';

    this.serv.getList(this.pagenum, this.pagesize, this.stime, this.etime, (val:any)=>{
      this.alertLists = val.result;
      this.totalpage = val.totalPageCount;
    });
  }

  getMore(){
    this.pagenum++;
    let newarr = this.alertLists
    this.serv.getList(this.pagenum, this.pagesize, this.stime, this.etime, (val:any)=>{
      for(let d of val.result){
        newarr.push(d);
      }
      this.alertLists = newarr;
      this.totalpage = val.totalPageCount;
    });
  }

}
