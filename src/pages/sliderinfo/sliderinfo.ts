import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/sliders/2.JPG",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/sliders/3.JPG",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage: Storage,) {
  }

  ionViewDidLoad() {
    
  }

  goLogin(){
    this.storage.set('isShow', true);
    this.navCtrl.setRoot('LoginPage');
  }

}
