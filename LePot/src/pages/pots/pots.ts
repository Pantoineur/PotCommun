import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, MenuController, NavController, ToastController, LoadingController } from 'ionic-angular';
import { SinglePotPage } from './single-pot/single-pot';
import { PotsService } from '../../services/pots.service';
import { Pot } from '../../models/Pot';
import { PotFormPage } from '../pot-form/pot-form';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-pots',
  templateUrl: 'pots.html'
})
export class PotsPage implements OnInit, OnDestroy{
  [x: string]: any;

  potsList: Pot[];
  potsSubscription: Subscription;

  constructor(private modalCtrl: ModalController,
              private potsService: PotsService,
              private menuCtrl: MenuController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {}

  ngOnInit(){
    this.potsSubscription = this.potsService.pots$.subscribe(
      (pots: Pot[]) => {
        this.potsList = pots.slice();
      }
    );
    this.potsService.emitPots();
  }

  onLoadPot(index: number) {
    let modal = this.modalCtrl.create(SinglePotPage, {index: index});
    modal.present();
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  onNewPot(){
    this.navCtrl.push(PotFormPage);
  }

  onSaveList(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.potsService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message:'Données sauvegardées !',
          duration: 3000,
          position: 'top'
        }).present();
      }
    ).catch(
      (error)=>{
        loader.dismiss();
        this.toastCtrl.create({
          message:error,
          duration:3000,
          position: 'top'
        }).present();
      }
    );
  }

  onFetchList(){
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours...'
    });
    loader.present();
    this.potsService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message:'Données récupérées !',
          duration: 3000,
          position: 'top'
        }).present();
      }
    ).catch(
      (error)=>{
        loader.dismiss();
        this.toastCtrl.create({
          message:error,
          duration:3000,
          position: 'top'
        }).present();
      }
    );
  }

  ngOnDestroy() {
    this.potsSubscription.unsubscribe();
  }

}
