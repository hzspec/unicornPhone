import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

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

  constructor(private modalCtrl:ModalController) {
  }

  goSpeed(){
    const modal = this.modalCtrl.create('SpeedPage', {type: 'green'});
    modal.present();
  }

  goGreen(){
    const modal = this.modalCtrl.create('SafePage', {type: 'green'});
    modal.present();
  }

  goWeb(title){
    const modal = this.modalCtrl.create('BlankPage', {title: title, url: 'http://www.baidu.com/'});
    modal.present();
  }

}
