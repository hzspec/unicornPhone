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

  mapDatas:any = [];
  l1count:number = 0;
  l2count:number = 0;
  l3count:number = 0;

  l1s = [];
  l2s = [];
  l3s = [];

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
    yes.add(-7, 'month');

    this.stime = yes.format('YYYY-MM-DDTHH:mm:ss') + '.0Z';
    this.etime = now.format('YYYY-MM-DDTHH:mm:ss') + '.0Z';

    this.serv.getList(this.pagenum, this.pagesize, this.stime, this.etime, (val:any)=>{
      this.alertLists = val.result;
      this.totalpage = val.totalPageCount;

      let datas = [];
      for(let r of val.result){
        if(r.srcLongitude && r.srcLatitude){
          if(r.priority == 1){
            datas.push({"name":r.sigName,"value":[r.srcLongitude,r.srcLatitude,null], type: 'l1'});
            this.l1count++;
            this.l1s.push({"name":r.sigName, "time": moment(r.timestamp).format('YYYY-MM-DD HH:mm:ss')});
          }else if(r.priority == 2){
            datas.push({"name":r.sigName,"value":[r.srcLongitude,r.srcLatitude,null], type: 'l2'});
            this.l2s.push({"name":r.sigName, "time": moment(r.timestamp).format('YYYY-MM-DD HH:mm:ss')});
            this.l2count++;
          }else{
            datas.push({"name":r.sigName,"value":[r.srcLongitude,r.srcLatitude,null], type: 'l3'});
            this.l3s.push({"name":r.sigName, "time": moment(r.timestamp).format('YYYY-MM-DD HH:mm:ss')});
            this.l3count++;
          }
        }
      }
      this.mapDatas = datas;
    });

    this.initMap();
  }

  initMap(){
    /*this.mapDatas = [
      {"name":"齐齐哈尔","value":[123.97,47.33,null], type: 'l1'},
      {"name":"盐城","value":[120.13,33.38,null], type: 'l1'},
      {"name":"青岛","value":[120.33,36.07,null], type: 'l2'},
      {"name":"金昌","value":[102.188043,38.520089,null], type: 'l2'},
      {"name":"泉州","value":[118.58,24.93,null], type: 'l3'},
      {"name":"拉萨","value":[91.11,29.97,null], type: 'l3'},
      {"name":"上海浦东","value":[121.48,31.22,null], type: 'l3'},
      {"name":"攀枝花","value":[101.718637,26.582347,null], type: 'l3'}
    ];*/
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
