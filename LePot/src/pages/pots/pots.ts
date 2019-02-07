import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, MenuController, NavController, ToastController, LoadingController } from 'ionic-angular';
import { SinglePotPage } from './single-pot/single-pot';
import { PotsService } from '../../services/pots.service';
import { Pot } from '../../models/Pot';
import { PotFormPage } from '../pot-form/pot-form';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivitesService } from '../../services/activite.service';

@Component({
  selector: 'page-pots',
  templateUrl: 'pots.html'
})
export class PotsPage implements OnInit, OnDestroy{

  potsList: Pot[];
  potsSubscription: Subscription;
  mail: string;


  constructor(private modalCtrl: ModalController,
              private potsService: PotsService,
              private menuCtrl: MenuController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private activitesService: ActivitesService) {
              }

  ngOnInit(){
    this.retrieveCurrentUser();
    this.potsSubscription = this.potsService.pots$.subscribe(
      (pots: Pot[]) => {
        this.potsList = pots.slice();
          for (let i=0; i<this.potsList.length; i++){
            console.log(this.mail);
            this.potsList[i].isUserInPot = false;
            if (this.potsList[i].membres === undefined)
              this.potsList[i].membres = [];
            for (let j=0; j<this.potsList[i].membres.length; j++){
              if (this.mail === this.potsList[i].membres[j]){
                this.potsList[i].isUserInPot = true;
              }
            }
          }
        this.potsService.calculValue();
        }
    );
    this.potsService.emitPots();
    this.onFetchPotList();
    //this.retrieveCurrentUser();
  }

  onLoadPot(index: number) {
    let modal = this.modalCtrl.create(SinglePotPage, {index: index});
    modal.present();
  }


  retrieveCurrentUser(){
    let user = firebase.auth().currentUser;
    this.mail = user.email;
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  onNewPot(){
    this.navCtrl.push(PotFormPage);
  }

  onSavePotList(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.potsService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message:'Données sauvegardées !',
          duration: 1000,
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

  onFetchPotList(){
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours...'
    });
    loader.present();
    this.potsService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message:'Données récupérées !',
          duration: 1000,
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

  /*onFetchActivitesList(){
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours...'
    });
    loader.present();
    this.activitesService.retrieveData(this.potsService.potsList).then(
      () => {
        loader.dismiss();
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
  }*/


  ngOnDestroy() {
    if (this.potsSubscription != undefined)
      this.potsSubscription.unsubscribe();
  }

}
