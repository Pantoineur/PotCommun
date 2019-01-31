import { Pot } from "../models/Pot";
import { Subject } from "rxjs/Subject";

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Activite } from "../models/Activite";

export class PotsService{

  pots$ = new Subject<Pot[]>();

  potsList: Pot[] = [{
    membres: [
        'orencohen2652@gmail.com',
        'danco2652@gmail.com',
        'antoineyvan@gmail.com'
      ],
      name: 'Barcelone',
      description: [
        'pot commun pour vacances a Barcelone'
      ],
      activities: [
        new Activite('Hotel', 20),
        new Activite('Avion', 50),
      ],
      value: 0,
      isOpen: true
    }];

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
