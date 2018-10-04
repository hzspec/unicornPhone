import { Component, Input } from '@angular/core';
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

  @Input()
  zhsh:string = "";
  @Input()
  qd:string = "";

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
    let url = "";
    if(title == '智慧生活'){
      url = this.zhsh;
    }else{
      url = this.qd;
    }
    const modal = this.modalCtrl.create('BlankPage', {title: title, url: url});
    modal.present();
  }

}
