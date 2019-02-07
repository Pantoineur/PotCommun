import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Pot } from '../../../models/Pot';
import { PotsService } from '../../../services/pots.service';
import { NgForm } from '@angular/forms';
import { ActivityFormPage } from '../../activite-form/activite-form';
import { ActivitesService } from '../../../services/activite.service';
import { Activite } from '../../../models/Activite';
import { Subscription } from 'rxjs';
import { InnerActivite } from '../../../models/InnerActivite';
import { MembreFormPage } from '../../membre-form/membre-form';

/**
 * Generated class for the SinglePotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-pot',
  templateUrl: 'single-pot.html',
})
export class SinglePotPage implements OnInit {
  index: number;
  pot: Pot;
  activiteSubscription: Subscription;


  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private potsService: PotsService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private activitesService: ActivitesService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {}

  ngOnInit(){
    this.index = this.navParams.get('index');
    this.pot = this.potsService.potsList[this.index];
    console.log(this.activitesService.activiteList);
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  onTogglePot(){
    var textError;
    if (this.pot.isOpen){
      textError = "Cette action va fermer votre pot";
    }
    else{
      textError = "Cette action va (ré)ouvrir votre pot";
    }
    let alert = this.alertCtrl.create({
      title: 'Êtes-vous certain de vouloir continuer?',
      subTitle: textError,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confirmer',
          handler: () => {this.pot.isOpen = !this.pot.isOpen;}
        }
      ]
    });
    alert.present();
}

  onNewActivity(){
    this.navCtrl.push(ActivityFormPage, {'id': this.index});
  }

  onNewMembre(){
    this.navCtrl.push(MembreFormPage, {'id': this.index});
  }

  onSubmitForm(form: NgForm){
    console.log(form.value);
    this.dismissModal();
  }

}
