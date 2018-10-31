import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
declare var screen :any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private storage: Storage) {

    this.storage.get('isShow').then((val:any)=>{
      if(val === true){
        this.rootPage = 'LoginPage';
      }else{
        this.rootPage = 'SliderinfoPage';
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      screen.orientation.lock('portrait-primary');

    });
  }
}
