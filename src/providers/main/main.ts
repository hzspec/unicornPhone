import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASEURL } from '../common';

import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { UserStore } from '../../pages/user.storage';

/*
  Generated class for the MainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainProvider {

  constructor(public http: HttpClient, private store:Storage, private ctrl:NavController) {
    
  }

  checkStorage(callback){
    this.store.get('user').then((val:UserStore)=>{
        callback(val);
    }).catch((err)=>{
        this.goLogin();
    });
  }

  goLogin(){
    this.ctrl.setRoot('LoginPage');
  }

  getStatic(success){
    this.store.get('user').then((us:UserStore)=>{

      let purl = `${BASEURL}alert/v1/alerts/device/2week/total?apMacAddr=${us.apmac}`;
      let pro = this.http.post(purl, null, {headers: {Authorization: us.token}}).toPromise();

      let purl2 = `${BASEURL}squirrel/v1/devices/overview?apMacAddress=${us.apmac}`;
      let pro2 = this.http.get(purl2, {headers: {Authorization: us.token}}).toPromise();

      let purl3 = `${BASEURL}dolphin/v1/packet_summarys/total1?macAddr=${us.apmac}`;
      let pro3 = this.http.get(purl3, {headers: {Authorization: us.token}}).toPromise();
      
      Promise.all([pro, pro2, pro3]).then((datas:any)=>{
        success(datas);
      }).catch(()=>{
        this.goLogin();
      });

    });
  }

  getTop20(success){
    this.store.get('user').then((us:UserStore)=>{
      let purl = `${BASEURL}dolphin/v1/packet_summarys/admin/ip/top?excludeRegexpList=192.168.*`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();

      pro.then((val:any)=>{
        success(val);
      }).catch(()=>{
        this.goLogin();
      });

    });
  }

}
