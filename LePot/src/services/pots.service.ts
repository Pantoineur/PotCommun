import { Pot } from "../models/Pot";
import { Subject } from "rxjs/Subject";

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

export class PotsService{

  pots$ = new Subject<Pot[]>();

  potsList: Pot[] = [
    {
      name: 'Machine à laver',
      description: [
        'Volume: 6L',
        'Temps de lavage: 2 heures',
        'Consommation: 173kWh/an'
      ],
      isOpen: true,
      startTime: '',
      endTime: '',
    },
    {
      name: 'Télévision',
      description: [
        'Dimensions : 40 pouces',
        'Consommation : 22kWh/an'
      ],
      isOpen: true,
      startTime: '',
      endTime: '',
    },
    {
      name: 'Ordinateur',
      description: [
        'Marque: fait maison',
        'Consommation: 500kWh/an'
      ],
      isOpen: false,
      startTime: '',
      endTime: '',
    }
  ];

  addPot(pot: Pot){
    this.potsList.push(pot);
    this.emitPots();
  }

  emitPots(){
    this.pots$.next(this.potsList.slice());
  }

  saveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('pots').set(this.potsList).then(
        (data: DataSnapshot) => {
          resolve(data);
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveData(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('pots').once('value').then(
        (data: DataSnapshot) => {
          this.potsList = data.val();
          this.emitPots();
          resolve('Données récupérées avec succès ! ');
        }
      ).catch(
        (error) =>  {
          reject(error);
        }
      );
    });
  }
}
