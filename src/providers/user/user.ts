import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASEURL } from '../common';

import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { UserStore } from '../../pages/user.storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider{

  private url = BASEURL + 'usercenter/v1/'

  constructor(public http: HttpClient, private store:Storage, private ctrl:NavController) {
  }

  checkStorage(callback, errorback){
    this.store.get('user').then((val:UserStore)=>{
        callback(val);
    }).catch((err)=>{
        this.ctrl.setRoot('LoginPage');
    });
  }

  login(email, pass){
    let param = {userId: email, password: pass};
    let purl = `${this.url}users/login?userId=${param.userId}&password=${param.password}`;
    return this.http.post(purl, null).toPromise();
  }

  getUserinfo(email, token){
    let purl = `${BASEURL}squirrel/v1/users/fetch_user_by_id?userId=${email}`;
    return this.http.get(purl, {headers: {Authorization: token}}).toPromise();
  }

}
