import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { OptionsPage } from '../pages/options/options';
import { AuthPage } from '../pages/auth/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  tabsPage: any = TabsPage;
  optionsPage: any = OptionsPage;
  authPage: any = AuthPage;
  @ViewChild('content') content: NavController;

  isAuth: boolean;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
              platform.ready().then(() => {

        var config = {
          apiKey: "AIzaSyCrSH1x3INykjqlTd5ZkbzjujygFwAP01I",
          authDomain: "projet-potcom.firebaseapp.com",
          databaseURL: "https://projet-potcom.firebaseio.com",
          projectId: "projet-potcom",
          storageBucket: "projet-potcom.appspot.com",
          messagingSenderId: "476184892726"
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              this.isAuth = true;
              this.content.setRoot(TabsPage);
            } else {
              this.isAuth = false;
              this.content.setRoot(AuthPage, {mode: 'new'});
            }
          }
        );

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onNavigate(page:any, data?: {}){
    this.content.setRoot(page, data?data: null);
    this.menuCtrl.close();
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}
