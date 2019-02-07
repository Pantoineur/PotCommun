import { Pot } from "../models/Pot";
import { Subject } from "rxjs/Subject";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Activite } from "../models/Activite";
import { InnerActivite } from "../models/InnerActivite";
import { AngularFireAuth } from 'angularfire2/auth';

export class PotsService{

  pots$ = new Subject<Pot[]>();

  potsList: Pot[] = [];

  addPot(pot: Pot){
    this.potsList.push(pot);
    this.emitPots();
  }

  emitPots(){
    this.pots$.next(this.potsList.slice());
  }


  calculValue(){
    if (this.potsList === undefined){
      this.potsList = [];
    }
    for(let i = 0; i < this.potsList.length; i++)
    {
      this.potsList[i].value = 0;
      if (this.potsList[i].inActivities === undefined){
        this.potsList[i].inActivities = [];
      }
      for (let j = 0; j < this.potsList[i].inActivities.length; j++)
      {
        this.potsList[i].value += +this.potsList[i].inActivities[j].value;
      }
    }
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
