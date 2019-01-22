import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PotsPage } from '../pages/pots/pots'
import { SinglePotPage } from '../pages/pots/single-pot/single-pot';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { PotsService } from '../services/pots.service';
import { OptionsPage } from '../pages/options/options';
import { PotFormPage } from '../pages/pot-form/pot-form';
import { AuthService } from '../services/auth.service';
import { AuthPage } from '../pages/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PotsPage,
    SinglePotPage,
    SettingsPage,
    TabsPage,
    OptionsPage,
    PotFormPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PotsPage,
    SinglePotPage,
    SettingsPage,
    TabsPage,
    OptionsPage,
    PotFormPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PotsService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule {}
