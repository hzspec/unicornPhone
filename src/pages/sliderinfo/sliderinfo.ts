import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Network } from '@ionic-native/network';
/**
 * Generated class for the SliderinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sliderinfo',
  templateUrl: 'sliderinfo.html',
})
export class SliderinfoPage {

  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/sliders/1.JPG",
      bg: 'c1'
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/sliders/2.JPG",
      bg: 'c2'
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/sliders/3.JPG",
      bg: 'c3'
    }
  ];

  isConnect:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage: Storage, private network: Network) {

      if(this.isConnect){
        this.storage.get('isShow').then((val:any)=>{
          if(val === true){
            //this.navCtrl.setRoot('LoginPage');
          }
        });

      }
      

      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        alert('network was disconnected :-(');
      });

      let connectSubscription = this.network.onConnect().subscribe(() => {
        alert('network connected!');
        // We just got a connection but we need to wait briefly
         // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          alert(this.network);
          if (this.network.type === 'wifi') {
            alert('we got a wifi connection, woohoo!');
          }
        }, 3000);
      });
      

  }

  ionViewDidLoad() {
    
  }

  goLogin(){
    this.storage.set('isShow', true);
    this.navCtrl.setRoot('LoginPage');
  }

}
