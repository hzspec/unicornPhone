import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MainProvider } from '../../providers/main/main';

/**
 * Generated class for the UniFastlinkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-fastlink',
  templateUrl: 'uni-fastlink.html',
  providers: [MainProvider]
})
export class UniFastlinkComponent {

  @Input()
  zhsh:string = "";
  @Input()
  qd:string = "";
  @Input()
  registed:boolean = false;

  constructor(private modalCtrl:ModalController, private serv:MainProvider) {
  }

  goBind(){
    const modal = this.modalCtrl.create('BindMacPage');
    modal.present();
  }

  goSpeed(){
    const modal = this.modalCtrl.create('SpeedPage', {type: 'green'});
    modal.present();
  }

  goGreen(){
    if(this.registed){
      const modal = this.modalCtrl.create('SafePage', {type: 'green'});
      modal.present();
    }else{
      this.goBind();
    }
  }

  goWeb(title){
    let url = "";
    if(title == '智慧生活'){
      url = this.zhsh;
    }else{
      url = this.qd;
      this.serv.signUp();
    }
    const modal = this.modalCtrl.create('BlankPage', {title: title, url: url});
    modal.present();
  }

}
