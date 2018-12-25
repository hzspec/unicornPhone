import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
declare var screen :any;

import { JpushsProvider } from '../providers/jpushs/jpushs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'SliderinfoPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private jpush: JpushsProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      screen.orientation.lock('portrait-primary');

      this.jpush.initJPUSH();

    });
  }
}
