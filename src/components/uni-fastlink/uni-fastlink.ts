import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the UniFastlinkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-fastlink',
  templateUrl: 'uni-fastlink.html'
})
export class UniFastlinkComponent {

  constructor(private ctrl:NavController) {
  }

  goSpeed(){
    this.ctrl.push('SpeedPage');
  }

}
