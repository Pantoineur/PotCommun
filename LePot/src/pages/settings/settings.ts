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
      title: 'Êtes-vous certain de vouloir supprimer un pote ?',
      subTitle: 'Cette action supprimera votre pote et tous les pots en cours avec lui',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confirmer',
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
