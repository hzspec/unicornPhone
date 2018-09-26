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

}
