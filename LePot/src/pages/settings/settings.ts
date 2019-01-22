import { Component } from '@angular/core';
import { AlertController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl:'settings.html'
})
export class SettingsPage {

  constructor(private alertCtrl: AlertController,
              private menuCtrl: MenuController){

  }

  onToggleLights(){
    let alert = this.alertCtrl.create({
      title: 'Êtes-vous certain de vouloir continuer?',
      subTitle: 'Cette action ouvrira ou fermera tous vos pots !',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confimer',
          handler: () => console.log('Confirmé !')
        }
      ]
    });
    alert.present();

  }
  onToggleMenu(){
    this.menuCtrl.open();
  }

}
