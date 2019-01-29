import { Pot } from "../models/Pot";
import { Subject } from "rxjs/Subject";

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Activite } from "../models/Activite";

export class PotsService{

  pots$ = new Subject<Pot[]>();

  potsList: Pot[] = [
    {
      name: 'Machine à laver',
      activite: [
        new Activite('Courses',50),
        new Activite('SautParachute',300)
      ],
      membres: [
        'yvan.antoine84@gmail.com',
        'orenco@gmail.com',
        'loicguerin@gmail.com'
      ],
      description: [
        'Volume: 6L',
        'Temps de lavage: 2 heures',
        'Consommation: 173kWh/an'
      ],
      isOpen: true,
      value: 10
    },
    {
      name: 'Télévision',

      activite: [
        new Activite('Courses',50),
        new Activite('SautParachute',300)
      ],
      membres: [
        'yvan.antoine84@gmail.com',
        'orenco@gmail.com',
        'loicguerin@gmail.com'
      ],
      description: [
        'Dimensions : 40 pouces',
        'Consommation : 22kWh/an'
      ],
      isOpen: true,
      value: 10
    },
    {
      name: 'Ordinateur',
      activite: [
        new Activite('Courses',50),
        new Activite('SautParachute',300)
      ],
      membres: [
        'yvan.antoine84@gmail.com',
        'orenco@gmail.com',
        'loicguerin@gmail.com'
      ],
      description: [
        'Marque: fait maison',
        'Consommation: 500kWh/an'
      ],
      isOpen: false,
      value: 10
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
