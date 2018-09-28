import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASEURL } from '../common';

import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { UserStore } from '../../pages/user.storage';

/*
  Generated class for the SafeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SafeProvider {

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

  getList(pagenum, pagesize, stime, etime, success){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}alert/v1/alerts?apMacAddr=${us.apmac}&pageNum=${pagenum}&pageSize=${pagesize}&beginningDatetime=${stime}&endingDatetime=${etime}`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch(()=>{
        this.goLogin();
      });
    });
  }

}
