import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASEURL } from '../common';

import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { UserStore } from '../../pages/user.storage';

/*
  Generated class for the EquipProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EquipProvider {

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

  routerInfor(success){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}squirrel/v1/devices/ap/overview?apMacAddr=${us.apmac}`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch(()=>{
        this.goLogin();
      });
    });
  }

  getEquips(pagenum, pagesize, success){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}ext/v1/devices?apMacAddress=${us.apmac}&pageNum=${pagenum}&pageSize=${pagesize}`;
      let pro = this.http.get(purl, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch(()=>{
        this.goLogin();
      });
    });
  }

  setEquipAuth(id, auth, success){
    this.checkStorage((us:UserStore)=>{
      let purl = `${BASEURL}squirrel/v1/devices/add_device_authority`;
      let pro = this.http.post(purl, {id: id, status: auth}, {headers: {Authorization: us.token}}).toPromise();
      pro.then((res:any)=>{
        success(res);
      }).catch(()=>{
        this.goLogin();
      });
    });
  }

}
