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
import { MembreFormPage } from '../pages/membre-form/membre-form';
import { AuthService } from '../services/auth.service';
import { AuthPage } from '../pages/auth/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ActivityFormPage } from '../pages/activite-form/activite-form';
import { ActivitesService } from '../services/activite.service';

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
    ActivityFormPage,
    MembreFormPage,
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
    ActivityFormPage,
    MembreFormPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PotsService,
    ActivitesService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule {}
