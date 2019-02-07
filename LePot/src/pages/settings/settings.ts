import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, MenuController } from 'ionic-angular';
import { PotsService } from '../../services/pots.service';
import { InnerActivite } from '../../models/InnerActivite';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Pot } from '../../models/Pot';

@Component({
  selector: 'page-settings',
  templateUrl:'settings.html'
})
export class SettingsPage implements OnInit, OnDestroy{
  inputMoney: number[];
  outputMoney: number[];
  totalMoney: number[];
  averageMoney: number[];
  totalUsers: number[];
  jeRembourse: number[];
  onMeRembourse: number[];
  mail: string;
  potsSubscription: Subscription;
  potsList: Pot[];


  constructor(private alertCtrl: AlertController,
              private menuCtrl: MenuController,
              private potsService: PotsService){
  }

  ngOnInit(){
    this.potsList = this.potsService.potsList;

    this.inputMoney = [];
    this.outputMoney = [];
    this.totalMoney = [];
    this.totalUsers = [];
    this.averageMoney = [];
    this.jeRembourse = [];
    this.onMeRembourse = [];
    for(let i =0; i<this.potsList.length; i++)
    {
      this.inputMoney[i] = 0;
      this.outputMoney[i] = 0;
      this.totalMoney[i] = 0;
      this.totalUsers[i] = 0;
      this.averageMoney[i] = 0;
      this.jeRembourse[i] = 0;
      this.onMeRembourse[i] = 0;
    }
    this.retrieveCurrentUser();
    this.getNumberUsers();
    this.calculMoney();
    this.calculMoyenne()
    this.calculeRemboursement();
  }

  calculMoney(){
    for (let i = 0; i < this.potsList.length; i++)
    {
      for (let j = 0; j < this.potsList[i].inActivities.length; j++)
      {
        if (this.potsList[i].isUserInPot)
        {
          if (this.potsList[i].inActivities[j].creator === this.mail)
          {
            this.inputMoney[i] += +this.potsList[i].inActivities[j].value;
          }
          else
          {
            this.outputMoney[i] += +this.potsList[i].inActivities[j].value;
          }
        }
      }
    }
  }

  calculMoyenne(){
    for (let i=0; i<this.potsList.length; i++)
    {
      this.totalMoney[i] = 0;
      this.totalMoney[i] += this.inputMoney[i];
      this.totalMoney[i] += this.outputMoney[i];
      this.averageMoney[i] = this.totalMoney[i] / this.totalUsers[i];
    }
  }

  getNumberUsers(){
    for(let i = 0; i<this.potsList.length; i++){
      this.totalUsers[i] = this.potsList[i].membres.length;
    }
    console.log("USERS "+this.totalUsers);
  }

  retrieveCurrentUser(){
    let user = firebase.auth().currentUser;
    this.mail = user.email;
  }

  ngOnDestroy(){
    if (this.potsSubscription != undefined)
      this.potsSubscription.unsubscribe();
  }

  calculeRemboursement(){
    for (let i=0; i<this.potsList.length; i++)
    {
      if (this.inputMoney[i] < this.averageMoney[i])
      {
        this.jeRembourse[i] = this.averageMoney[i] - this.inputMoney[i];
      }
      else
      {
        this.onMeRembourse[i] = this.inputMoney[i] - this.averageMoney[i];
      }
    }
  }

  doRefresh(){
    for (let i=0; i<this.potsList.length; i++)
    {
      if (this.inputMoney[i] < this.averageMoney[i])
      {
        this.jeRembourse[i] = this.averageMoney[i] - this.inputMoney[i];
      }
      else
      {
        this.onMeRembourse[i] = this.inputMoney[i] - this.averageMoney[i];
      }
    }
  }
}
